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
            port: parseInt(
              config.get<string>('appConfig.mailerPort') ?? '2525',
              10,
            ),
            auth: {
              user: config.get<string>('appConfig.smtpUsername'),
              pass: config.get<string>('appConfig.smtpPassword'),
            },
          },
          defaults: {
            from: `"My Blog" <no-repy@nestjs-blog.com>`,
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
