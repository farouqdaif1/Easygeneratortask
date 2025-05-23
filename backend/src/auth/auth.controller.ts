import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { SigninResponse } from './dto/signin-response.dto';
import { RefreshTokenResponse } from './dto/refresh-token-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body.email, body.name, body.password);
  }

  @ApiOperation({ summary: 'User signin' })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT tokens',
    type: SigninResponse,
  })
  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body.email, body.password);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Returns new JWT tokens',
    type: RefreshTokenResponse,
  })
  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }) {
    try {
      const payload = this.jwtService.verify<{
        id: string;
        email: string;
        name: string;
      }>(body.refreshToken);
      const token = this.jwtService.sign(
        {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          type: 'access',
        },
        { expiresIn: '1h' },
      );
      return { token };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
