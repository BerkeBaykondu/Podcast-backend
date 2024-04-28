export interface IPodcast {
  _id?: any
  name: string
  description: string
  category: string
  createdAt?: any
  updatedAt?: any
}

export namespace IPodcast {
  export interface IUploadPodcast {
    name: string
    category: string
    description: string
  }

  export interface IDeletePodcast {
    fileName: string
    folderName: string
  }
}

export enum Category {
  C1 = 'c1',
  C2 = 'c2',
}
