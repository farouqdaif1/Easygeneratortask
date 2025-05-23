import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninDto {
  @IsEmail()
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
