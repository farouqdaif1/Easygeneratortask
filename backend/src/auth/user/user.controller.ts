import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../schemas/user.schema';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns the user profile',
    type: User,
  })
  getProfile(@Req() req: Request & { user: User }) {
    return req.user;
  }
}
