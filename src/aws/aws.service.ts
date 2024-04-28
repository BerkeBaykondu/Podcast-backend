import { DeleteObjectCommand, DeleteObjectsCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AwsService {
  private s3: S3Client

  constructor() {
    this.s3 = new S3Client({
      region: process.env.BUCKETREGION!,
      credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      },
    })
  }
  async upload(fileName: string, file: Buffer): Promise<void> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `deneme4/${fileName}`,
        Body: file,
      }),
    )
  }

  async delete(fileName: string, folderName: string): Promise<void> {
    // list files in specific folder

    const filesInFolder = await this.s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.BUCKETNAME,
        Prefix: `deneme3/`,
      }),
    )
    // console.log(filesInFolder.Contents)

    // // create delete file promises ( files in that folder)
    // const deletePromises = filesInFolder.Contents!.map((object) => {
    //   return this.s3.send(
    //     new DeleteObjectCommand({
    //       Bucket: process.env.BUCKETNAME,
    //       Key: object.Key!,
    //     }),
    //   )
    // })
    // // deleting process
    // await Promise.all(deletePromises)

    // delete the folder
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKETNAME,
        Key: `deneme3/grokking-algorithms-illustrated-programmers-curious.pdf`,
      }),
    )
  }
}
