import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Restaurant } from './restaurant.schema';
import { Meal } from './meals.schema';

enum MenuOptions {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export type MenuDocument = mongoose.HydratedDocument<Menu>;

@Schema()
export class Menu {
  @Prop({ type: String, enum: MenuOptions })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
  restaurantId: Restaurant;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Meal' })
  meals: Meal[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
