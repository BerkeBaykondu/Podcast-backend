export interface IEpisode {
  _id?: any
  name: string
  description: string
  imageUrl: string
  audioUrl: string
  totalLike: number
  createdAt?: any
  updatedAt?: any
}

export namespace IEpisode {
  export interface IAddEpisode {
    episodeName: string
    episodeDescription: string
  }
}
