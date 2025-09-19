import { Injectable } from '@nestjs/common';
import { MailtrapClient } from 'mailtrap';
import { UserNext } from 'src/users/user.entity';
import { Invitation } from 'src/invitation/invitation.entity';
import { ActiveUserType } from 'src/auth/enums/active-user-type';

@Injectable()
export class MailService {
  private mailtrapClient: MailtrapClient;

  constructor() {
    const token = process.env.MAILTRAP_API_TOKEN;

    // Для продакшну токен обов'язковий
    if (!token && process.env.NODE_ENV === 'production') {
      throw new Error('MAILTRAP_API_TOKEN is required in production');
    }

    // Для розробки використовуємо тестовий токен або пропускаємо ініціалізацію
    if (token) {
      this.mailtrapClient = new MailtrapClient({
        token: token,
      });
    } else {
      console.warn(
        'MAILTRAP_API_TOKEN not found, email functionality will be disabled',
      );
    }
  }

  async sendWelcomeEmail(user: UserNext): Promise<void> {
    if (!this.mailtrapClient) {
      console.log('Mailtrap client not initialized, skipping welcome email');
      return;
    }

    const sender = {
      email: 'support@abrakadabramarsa.space',
      name: 'Support Team',
    };

    const recipients = [{ email: user.email }];

    try {
      await this.mailtrapClient.send({
        from: sender,
        to: recipients,
        subject: 'Welcome to our app!',
        html: this.getWelcomeTemplate(user.email),
      });
      console.log('Welcome email sent successfully to:', user.email);
    } catch (error) {
      console.error('Welcome email sending failed:', error);
      throw error;
    }
  }

  async sendInvitationEmail(
    email: string,
    activeUser: ActiveUserType,
    invitation: Invitation,
  ): Promise<void> {
    if (!this.mailtrapClient) {
      console.log('Mailtrap client not initialized, skipping invitation email');
      return;
    }

    const sender = {
      email: 'support@abrakadabramarsa.space',
      name: 'Support Team',
    };

    const recipients = [{ email: email }];

    try {
      await this.mailtrapClient.send({
        from: sender,
        to: recipients,
        subject: 'Invitation to our app!',
        html: this.getInvitationTemplate(email, invitation.token),
      });
      console.log('Invitation email sent successfully to:', email);
    } catch (error) {
      console.error('Invitation email sending failed:', error);
      throw error;
    }
  }

  private getWelcomeTemplate(email: string): string {
    const loginUrl = `${process.env.FRONTEND_URL}/home`;

    return `
      <h1>Welcome to our app!</h1>
      <p style="color: red; font-size: 20px; font-weight: bold;">Hi ${email}</p>
      <p>Click <a href="${loginUrl}">here</a> to login</p>
      <p>Or use this link: ${loginUrl}</p>
      <p>Best regards, <br> Your App Team</p>
      <div style="color: red; font-size: 20px; font-weight: bold;">
          <p>Support &lt;support@abrakadabramarsa.space&gt;</p>
      </div>
    `;
  }

  private getInvitationTemplate(email: string, token: string): string {
    const loginUrl = `${process.env.FRONTEND_URL}/subscribe?token=${token}`;

    return `
      <h1>Invitation</h1>
      <p style="color: red; font-size: 20px; font-weight: bold;">Hi ${email}</p>
      <p>Click <a href="${loginUrl}">here</a> to accept invitation</p>
      <p>Or use this link: ${loginUrl}</p>
      <p>Best regards, <br> Your App Team</p>
      <div style="color: red; font-size: 20px; font-weight: bold;">
          <p>Support &lt;support@abrakadabramarsa.space&gt;</p>
      </div>
    `;
  }
}
