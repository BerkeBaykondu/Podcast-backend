import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { IUser } from './dto/user.interface'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: IUser.ICreateUser) {
    console.log(createUserDto)
    return this.userService.create(createUserDto)
  }

  @Get('podcast/:id')
  async findPodcastByUser(@Param('id') id: string) {
    return await this.userService.findPodcastByUser(id)
  }
}
