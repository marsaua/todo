import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get<string>('appConfig.mailerHost'),
            secure: false,
            requireTLS: true,
            port: parseInt(
              config.get<string>('appConfig.mailerPort') ?? '587',
              10,
            ),
            auth: {
              user: config.get<string>('appConfig.smtpUsername'),
              pass: config.get<string>('appConfig.smtpPassword'),
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 20000,
            logger: true,
            debug: true,
          },
          defaults: {
            from: `"My Blog" <no-reply@abrakadabramarsa.space>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new EjsAdapter({
              inlineCssEnabled: true,
            }),
            options: {
              strict: false,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
