import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Menu } from './menu.schema';
import { User } from './user.schema';

enum OrderState {
  CREATED = 'CREATED',
  PREPARING = 'PREPARING',
  TOOK = 'TOOK',
  DELIVERED = 'DELIVERED',
  NOT_DELIVERED = 'NOT_DELIVERED',
}

export type MenuDocument = mongoose.HydratedDocument<Menu>;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' })
  menuId: Menu;

  @Prop({ type: String, enum: OrderState, default: OrderState.CREATED })
  orderState: OrderState;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
