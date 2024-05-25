export interface IPodcast {
  _id?: any
  title: string
  description: string
  category: any
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
    podcastCategory: Array<Category>
    podcastDescription: string
  }

  export interface ICreatePodcastWithFirstEpisode {
    podcastTitle: string
    podcastDescription: string
    podcastCategory: Array<Category>
    episodeTitle: string
    episodeDescription: string
  }
}

export enum Category {
  AileveSaglık = 'Aile ve Sağlık',
  Teknoloji = 'Teknoloji',
}
