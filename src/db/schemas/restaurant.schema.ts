import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Menu } from './menu.schema'; // Import Menu schema

export type RestaurantDocument = mongoose.HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop({ unique: true })
  name: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  introImageUrl: string;

  @Prop()
  coverImageUrl: string;

  @Prop({
    type: {
      isDiscountActive: { type: Boolean, default: false },
      discountPercentage: { type: Number, default: 0 },
    },
    default: () => ({ isDiscountActive: false, discountPercentage: 0 }),
  })
  discount: { isDiscountActive: boolean; discountPercentage: number };

  @Prop({
    type: {
      city: { type: String, required: true },
      streetAddress: { type: String, required: true },
    },
  })
  address: { city: string; streetAddress: string };

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }] })
  menus: Menu[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
