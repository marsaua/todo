// invitation.service.ts
import {
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeepPartial } from 'typeorm';
import { Invitation } from '../invitation.entity';
import { MailService } from 'src/mail/providers/mail.service';
import { ActiveUserType } from 'src/auth/enums/active-user-type';
import { InvitationDto } from '../dtos/invitation.dto';
import { randomBytes } from 'crypto';
import Company from 'src/companies/company.entity';
import { Subscription } from '../subscription.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private readonly repo: Repository<Invitation>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,

    private readonly ds: DataSource,
    private readonly mail: MailService,
  ) {}

  private generateOpaqueToken(bytes = 32) {
    return randomBytes(bytes).toString('base64url');
  }

  private addDays(base: Date, days: number) {
    return new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
  }

  async createInvitation(dto: InvitationDto, user: ActiveUserType) {
    console.log(user);
    console.log(dto);
    if (user.role !== 'COMPANY') {
      throw new ForbiddenException('Only company can invite');
    }
    const existInvitation = await this.repo.findOne({
      where: { email: dto.email, company: { id: user.sub } },
    });
    const inviteNotExpired =
      existInvitation && existInvitation.expiresAt > new Date();
    if (existInvitation && inviteNotExpired) {
      throw new BadRequestException(
        'Invitation for this email already exists and not expired',
      );
    }

    const raw = this.generateOpaqueToken();
    const expiresAt = this.addDays(new Date(), dto.ttlDays ?? 7);

    const invitation = this.repo.create({
      company: { id: user.sub } as DeepPartial<Company>,
      invitedByUserId: user.sub,
      email: dto.email,
      token: raw,
      expiresAt,
    });
    await this.repo.save(invitation);

    await this.mail.sendInvitationEmail(dto.email, user, invitation);

    return { ok: true };
  }

  async redeem(token: string, currentUserId: number) {
    return this.ds.transaction(async (trx) => {
      const repo = trx.getRepository(Invitation);
      const subRepo = trx.getRepository(Subscription);

      const inv = await repo.findOne({
        where: { token },
        relations: ['company'],
      });
      if (!inv) throw new BadRequestException('Invalid invite');
      if (inv.usedAt) return { ok: true };
      if (inv.expiresAt < new Date())
        throw new BadRequestException('Invite expired');
      await subRepo.upsert(
        {
          companyId: inv.companyId,
          userId: currentUserId,
          usedAt: new Date(),
          usedByUserId: currentUserId,
        },
        ['companyId', 'userId'],
      );

      await repo.update(inv.id, {
        usedAt: new Date(),
        usedByUserId: currentUserId,
      });
      return { ok: true };
    });
  }
}
