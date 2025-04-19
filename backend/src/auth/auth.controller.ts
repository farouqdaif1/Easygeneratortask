import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body.email, body.name, body.password);
  }

  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body.email, body.password);
  }
}
