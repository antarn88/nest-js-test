import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongooseBcrypt from 'mongoose-bcrypt';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  [x: string]: string;

  @ApiProperty()
  @Prop({ required: true, immutable: true, unique: true })
  username: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @ApiHideProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    enum: ['user', 'admin'],
  })
  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongooseBcrypt);
