export interface IPodcast {
  _id?: any
  title: string
  description: string
  category: string
  imageUrl: string
  episodes: any
  totalLike: number
  owner: string
  createdAt?: any
  updatedAt?: any
}

export namespace IPodcast {
  export interface IUploadPodcast {
    podastTitle: string
    podcastCategory: string
    podcastDescription: string
  }

  export interface ICreatePodcastWithFirstEpisode {
    podcastTitle: string
    podcastDescription: string
    podcastCategory: Category
    episodeTitle: string
    episodeDescription: string
  }
}

export enum Category {
  C1 = 'c1',
  C2 = 'c2',
}
