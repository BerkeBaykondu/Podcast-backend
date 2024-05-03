import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Episode } from '../../episode/schema/episode.schema'

export type PodcastDocument = HydratedDocument<Podcast>
@Schema({ timestamps: true })
export class Podcast {
  @Prop({ unique: true })
  name: string
  @Prop({ maxlength: 150 })
  description: string
  @Prop({})
  category: string
  @Prop({})
  imageUrl: string
  @Prop({ default: 0 })
  totalLike: number
  @Prop({ type: [Episode], required: true })
  episodes: Episode[]
}

export const podcastSchema = SchemaFactory.createForClass(Podcast)
