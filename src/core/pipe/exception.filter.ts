import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Response, Request } from 'express'
import { CustomHttpExceptionResponse, HttpExceptionResponse } from '../model/http-exception-response.interface'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status: HttpStatus
    let errorMessage: string

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse()
      errorMessage = exception.message || (errorResponse as HttpExceptionResponse)?.error
    } else if (exception instanceof Error && (exception as any)['code'] === 11000) {
      status = HttpStatus.CONFLICT // Use CONFLICT for duplicate key error
      errorMessage = 'Duplicate key error'
    } else if (exception instanceof TypeError) {
      status = HttpStatus.NOT_FOUND
      errorMessage = 'Not found error'
      this.logger.error('Not found error', (exception as Error).stack)
    } else {
      this.logger.error('Critical internal server error occurred!', (exception as Error).stack)
      status = HttpStatus.INTERNAL_SERVER_ERROR
      errorMessage = 'Critical internal server error occurred!'
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request)
    response.status(status).json(errorResponse)
    this.logger.error(`Caught an exception with status ${status} and message: ${errorMessage}`)
  }

  private getErrorResponse = (status: HttpStatus, errorMessage: string, request: Request): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  })
}
