import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  type?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    // Check if this is a refresh token - reject it for normal authentication
    if (payload.type === 'refresh') {
      throw new UnauthorizedException(
        'Refresh tokens cannot be used for regular authentication',
      );
    }

    const user = await this.authService.findUserById(payload.id);
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }
}
