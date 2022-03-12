import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument, passwordFieldName } from './schemas/user.schema';
import { UserDto } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<UserDto[]> {
    return this.userModel.find({}, `-${passwordFieldName}`).exec();
  }

  async findOne(id: string): Promise<UserDto> {
    return this.userModel.findOne({ _id: id }, `-${passwordFieldName}`).exec();
  }
}