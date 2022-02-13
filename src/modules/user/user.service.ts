/* eslint-disable prettier/prettier */
import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  async update(userId: string, user: User): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: userId }, user);
  }

  async delete(userId: string): Promise<User> {
    return this.userModel.findOneAndDelete({ _id: userId });
  }

}
