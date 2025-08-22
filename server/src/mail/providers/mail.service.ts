import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserNext } from 'src/users/user.entity';

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
}
