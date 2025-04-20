import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-zA-Z]/)
  @Matches(/\d/)
  @Matches(/[!@#$%^&*(),.?":{}|<>]/)
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
