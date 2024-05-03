import { Injectable } from '@nestjs/common'

@Injectable()
export class EpisodeService {
  create() {
    return 'This action adds a new episode'
  }

  findAll() {
    return `This action returns all episode`
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`
  }

  update(id: number) {
    return `This action updates a #${id} episode`
  }

  remove(id: number) {
    return `This action removes a #${id} episode`
  }
}
