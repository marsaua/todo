import { Controller, Post, Body } from '@nestjs/common';
import { InvitationService } from './providers/invitation.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserType } from 'src/auth/enums/active-user-type';
import { InvitationDto } from './dtos/invitation.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  async createInvitation(
    @ActiveUser() user: ActiveUserType,
    @Body() invitationDto: InvitationDto,
  ) {
    await this.invitationService.createInvitation(invitationDto, user);
  }

  @Post('/redeem')
  async redeemInvitation(
    @Body() { token }: { token: string },
    @ActiveUser() user: ActiveUserType,
  ) {
    // service кидає 401/403/409/410/400 – Nest сам віддасть JSON з цими статусами
    await this.invitationService.redeem(token, user);
    return { ok: true }; // 200
  }
}
