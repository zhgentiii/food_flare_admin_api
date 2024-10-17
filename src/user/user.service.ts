import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import path from 'path';
// import { User, UserDocument } from './user.schema';
import { AuthProviders } from 'src/db/schemas/user.schema';
import { User, UserDocument } from 'src/db/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserByProviderId(providerId: string) {
    const user = await this.userModel.findOne({
      providers: { $elemMatch: { providerId: providerId } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserById(_id: string) {
    const user = await this.userModel.findById(_id).populate({
      path: 'restaurants',
      populate: { path: 'menus', populate: { path: 'meals' } },
    });

    if (!user) {
      throw new NotFoundException('User with related id not found');
    }

    return user;
  }
}
