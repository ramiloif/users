import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

export const passwordFieldName = 'password';

@Schema()
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ unique: true, index: true, required: true })
  email: string;

  @Prop({ required: true })
  [passwordFieldName]: string;

  @Prop({ required: true })
  description: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified(passwordFieldName) || this.isNew) {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
    next()
  } else {
    return next()
  }
});