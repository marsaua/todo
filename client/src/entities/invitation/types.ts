export interface Invitation {
  id: number;
  invitedByUserId: number;
  email: string;
  token: string;
  expiresAt: Date;
  usedAt?: Date;
  usedByUserId?: number;
  createdAt: Date;
}

export interface InvitationDto {
  email: string;
  ttlDays?: number;
}
