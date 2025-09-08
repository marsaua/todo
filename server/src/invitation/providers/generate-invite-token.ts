import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class GenerateInviteToken {
  constructor() {}

  public generateToken() {
    const token = randomBytes(32).toString('base64url'); // in URL
    const tokenHash = createHash('sha256').update(token).digest('hex'); // in DB
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    return { token, tokenHash, expiresAt };
  }
}
