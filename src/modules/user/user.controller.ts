import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { UserService } from './user.service';
import { isValidObjectId } from 'mongoose';

@Controller('users')
@ApiTags('users')
export class UserController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly userService: UserService) { }

  @Post()
  // eslint-disable-next-line prettier/prettier
  async create(@Body() user: User): Promise<{ _id: string; }> {
    const cretedUser = await this.userService.create(user);
    return { _id: cretedUser._id };
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param('id') id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }

    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 404, description: 'Not found.' })
  async update(@Param('id') id: string, @Body() user: User): Promise<string> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    await this.findOne(id);
    await this.userService.update(id, user);
    return '';
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Not found.' })
  async remove(@Param('id') id: string): Promise<Record<string, never>> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    await this.findOne(id);
    await this.userService.delete(id);
    return {};
  }
}
