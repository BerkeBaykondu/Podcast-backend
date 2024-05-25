import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schema/user.schema'
import { IUser } from './dto/user.interface'
import { PodcastService } from 'src/podcast/podcast.service'
import { Podcast } from 'src/podcast/schema/podcast.schema'
import { ObjectId } from 'mongodb'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<Document>,
    @Inject(forwardRef(() => PodcastService))
    private readonly podcastService: PodcastService,
  ) {}
  async create(createUserDto: IUser.ICreateUser) {
    return await this.userModel.create(createUserDto)
  }

  async findOneAndUpdate(condition, update, options?) {
    return this.userModel.findOneAndUpdate(condition, update, options).lean()
  }

  async findPodcastByUser(id): Promise<any> {
    return await this.userModel
      .findOne({ user_id: id })
      .populate({
        path: 'createdPodcastList',
        model: 'Podcast',
      })
      .exec()
    //return await this.podcastService.findPodcastByUser(user)
  }

  // gereksiz

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
