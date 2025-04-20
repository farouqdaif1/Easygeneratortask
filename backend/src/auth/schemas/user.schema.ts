import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
