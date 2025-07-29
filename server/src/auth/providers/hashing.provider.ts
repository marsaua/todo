import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  // For hashing password
  abstract hashPassword(data: string | Buffer): Promise<string>;

  // For comparing password
  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
