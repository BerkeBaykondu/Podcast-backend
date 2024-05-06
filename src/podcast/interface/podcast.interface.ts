export interface IPodcast {
  _id?: any
  name: string
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
    podastName: string
    podcastCategory: string
    podcastDescription: string
  }

  export interface ICreatePodcastWithFirstEpisode {
    podcastName: string
    podcastDescription: string
    podcastCategory: Category
    episodeName: string
    episodeDescription: string
  }
}

export enum Category {
  C1 = 'c1',
  C2 = 'c2',
}
