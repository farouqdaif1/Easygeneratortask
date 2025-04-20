import { ApiProperty } from '@nestjs/swagger';

export class SigninResponse {
  @ApiProperty({ description: 'The token of the user' })
  token: string;

  @ApiProperty({ description: 'The refresh token of the user' })
  refreshToken: string;
}
