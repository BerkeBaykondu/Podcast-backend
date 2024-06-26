// file-type.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { FileUpload } from 'src/core/model/http-upload-file-interface'

@Injectable()
export class FileTypePipe implements PipeTransform<any> {
  async transform(value: FileUpload[]): Promise<any> {
    if (!value || value.length !== 2) {
      throw new BadRequestException('Exactly two files are required')
    }

    const webpFile = value.find((file: any) => file.mimetype === 'image/webp')
    const audioFile = value.find((file: any) => file.mimetype.startsWith('audio/'))
    if (!webpFile || !audioFile) {
      throw new BadRequestException('One webp and one audio file are required')
    }

    return [webpFile, audioFile]
  }
}
