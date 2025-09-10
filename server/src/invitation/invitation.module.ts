import { Module } from '@nestjs/common';
import { InvitationService } from './providers/invitation.service';
import { GenerateInviteToken } from './providers/generate-invite-token';
import { InvitationController } from './invitation.controller';
import { Company } from 'src/companies/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { Subscription } from './subscription.entity';

@Module({
  providers: [InvitationService, GenerateInviteToken],
  imports: [TypeOrmModule.forFeature([Invitation, Company, Subscription])],
  controllers: [InvitationController],
})
export class InvitationModule {}
