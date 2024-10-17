import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Restaurant } from './restaurant.schema';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  RESTAURANT_OWNER = 'RESTAURANT_OWNER',
}

export enum AuthProviders {
  YANDEX = 'YANDEX',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class ProviderDetails {
  @Prop({ required: true, enum: AuthProviders })
  provider: AuthProviders;

  @Prop({ unique: true })
  providerId: string;

  @Prop()
  displayName: string;

  @Prop()
  email: string;

  @Prop()
  avatarUrl: string;
}

@Schema()
export class User {
  @Prop({ unique: true })
  phone: string;

  @Prop({ type: [String], enum: Roles, default: [Roles.USER] })
  roles: Roles[];

  @Prop({ type: [ProviderDetails], default: [] })
  providers: ProviderDetails[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Restaurant' })
  restaurants: Restaurant[];
}

export const ProviderDetailsSchema =
  SchemaFactory.createForClass(ProviderDetails);
export const UserSchema = SchemaFactory.createForClass(User);
