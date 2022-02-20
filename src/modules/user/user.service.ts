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
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(userId: string): Promise<User> {
    return await this.userModel.findById(userId);
  }

  async update(userId: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, user);
  }

  async delete(userId: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userId);
  }

}
