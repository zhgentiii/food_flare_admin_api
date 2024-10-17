import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Menu } from './menu.schema';

export type MealDocument = mongoose.HydratedDocument<Meal>;

@Schema()
export class Meal {
  @Prop({ type: String, required: true })
  name: string;

  @Prop()
  mealImageUrl: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true,
  })
  menu: Menu;

  @Prop([String])
  ingredients: string[];

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  caloriePer100Gram: number;

  @Prop({ weight: Number })
  weight: number;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
