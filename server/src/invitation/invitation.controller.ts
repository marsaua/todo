import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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
    await this.invitationService.redeem(token, user.sub);
  }
}
