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
    podcastCategory: string
    episodeTitle: string
    episodeDescription: string
  }
}

export enum Category {
  Tarih = 'Tarih',
  Teknoloji = 'Teknoloji',
}
