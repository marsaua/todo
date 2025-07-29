import { UserNext } from '../../users/user.entity';

export interface AuthResponse {
  accessToken: string;
  user: UserNext;
}
