import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

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
  @Prop({})
  audioUrl: string
  @Prop({ default: 0 })
  totalLike: number
}

export const podcastSchema = SchemaFactory.createForClass(Podcast)
