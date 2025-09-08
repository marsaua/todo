import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserNext } from 'src/users/user.entity';
import { Invitation } from 'src/invitation/invitation.entity';
import { ActiveUserType } from 'src/auth/enums/active-user-type';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(user: UserNext): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Support <support@nestjs-blog.com>`,
      subject: 'Welcome to our app!',
      template: './welcome',
      context: {
        name: user.name,
        email: user.email,
        loinUrl: `${process.env.FRONTEND_URL}/home`,
      },
    });
  }

  async sendInvitationEmail(
    email: string,
    activeUser: ActiveUserType,
    invitation: Invitation,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: activeUser.email,
      subject: 'Invitation to our app!',
      template: 'invitation',
      context: {
        name: email,
        email: email,
        loinUrl: `${process.env.FRONTEND_URL}/subscribe?token=${invitation.token}`,
      },
    });
  }
}
