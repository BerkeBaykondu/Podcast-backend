import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schema/user.schema'
import { IUser } from './dto/user.interface'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<Document>) {}
  async create(createUserDto: IUser.ICreateUser) {
    return await this.userModel.create(createUserDto)
  }

  async findOneAndUpdate(condition, update, options?) {
    return this.userModel.findOneAndUpdate(condition, update, options).lean()
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
