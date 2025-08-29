import {
  Injectable,
  OnModuleInit,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { GoogleTokenDto } from 'src/auth/social/dtos/google-token.dto';
import { DefaultCategoriesService } from 'src/categories/providers/default-categories.service';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly defaultCategoriesService: DefaultCategoriesService,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify the Google Token Sent By User
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      // Extract the payload from Google Token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload()!;
      // Find the user in the database using the googleId
      const user = await this.usersService.findOneByGoogleId(googleId);

      // If user id found generate the tokens
      if (user) {
        await this.defaultCategoriesService.ensureForUser(user.id);
        return await this.generateTokensProvider.generateTokens(
          user.id,
          user.email,
        );
      } else {
        // If not create a new user and generate the tokens
        const newUser = await this.usersService.createGoogleUser({
          email: email,
          firstName: firstName,
          lastName: lastName,
          googleId: googleId,
        });
        await this.defaultCategoriesService.ensureForUser(newUser.id);

        return await this.generateTokensProvider.generateTokens(
          newUser.id,
          newUser.email,
        );
      }

      // throw Unauthorised exception if not Authorised
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
