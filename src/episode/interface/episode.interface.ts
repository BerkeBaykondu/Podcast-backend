export interface IEpisode {
  _id?: any
  title: string
  description: string
  audioUrl: string
  totalLike: number
  createdAt?: any
  updatedAt?: any
}

export namespace IEpisode {
  export interface IAddEpisode {
    episodeTitle: string
    episodeDescription: string
  }
  export interface IUpdateEpisode {
    episodeTitle?: string
    episodeDescription?: string
  }
  export interface ITrtEpisode {
    episodeTitle?: string
    episodeDescription?: string
    episodeAudioUrl: string
  }
}
