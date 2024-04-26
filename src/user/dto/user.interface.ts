import { IPodcast } from 'src/podcast/interface/podcast.interface'

export interface IUser {
  _id: any
  user_id: string
  name: string
  description: string
  isPremium: boolean
  listenedPodcastList: Array<IPodcast>
  archivedPodcastList: Array<IPodcast>
  pinnedPodcastList: Array<IPodcast>
  likedPodcastList: Array<IPodcast>
  createdPodcastList: Array<IPodcast>
  podcastFollowing: Array<IPodcast>
  Userfollowers: Array<IUser>
  Userfollowing: Array<IUser>
  createdAt: any
  updatedAt: any
}

export namespace IUser {
  export interface ICreateUser {
    name: string
    user_id: string
    isPremium: boolean
    description: string
  }
}
