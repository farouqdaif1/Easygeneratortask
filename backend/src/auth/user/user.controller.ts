import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface UserPayload {
  id: string;
  email: string;
  name: string;
}

@Controller()
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: Request & { user: UserPayload }) {
    return req.user;
  }
}
