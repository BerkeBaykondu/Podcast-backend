import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
export type PortfolioDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true, index: true })
  user_id: string
  @Prop({ default: false })
  isPremium: Boolean
  @Prop({ maxlength: 150, default: '' })
  description: string

  // Podcast Etkileşimleri
  @Prop()
  listenedPodcastList: [{ type: Types.ObjectId; ref: 'Podcast' }]
  @Prop()
  archivedPodcastList: [{ type: Types.ObjectId; ref: 'Podcast' }]
  @Prop()
  pinnedPodcastList: [{ type: Types.ObjectId; ref: 'Podcast' }]
  @Prop()
  likedPodcastList: [{ type: Types.ObjectId; ref: 'Podcast' }] // bunu obje şeklinde düzelteceğim liked True ise like false ise Dislike olacak şekilde
  @Prop()
  createdPodcastList: [{ type: Types.ObjectId; ref: 'Podcast' }]

  // Takipçi Meselesi
  @Prop()
  userFollowers: [{ type: Types.ObjectId; ref: 'User' }]
  @Prop()
  podcastFollowing: [{ type: Types.ObjectId; ref: 'Podcast' }]
  @Prop()
  userFollowing: [{ type: Types.ObjectId; ref: 'User' }]
}
export const userSchema = SchemaFactory.createForClass(User)
