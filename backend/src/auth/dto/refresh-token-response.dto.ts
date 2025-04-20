import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
    @ApiProperty({ description: 'The refresh token of the user' })
    token: string;
}
