import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type PodcastDocument = HydratedDocument<Episode>

@Schema({ timestamps: true })
export class Episode {
  @Prop({ unique: true })
  name: string
  @Prop({ maxlength: 150 })
  description: string
  @Prop({})
  imageUrl: string
  @Prop({})
  audioUrl: string
  @Prop({ default: 0 })
  totalLike: number
}

export const episodeSchema = SchemaFactory.createForClass(Episode)
