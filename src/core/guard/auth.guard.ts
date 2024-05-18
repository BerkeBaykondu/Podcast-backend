import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET', 'DEFAULT_SECRET_VALUE')
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      })
      console.log(payload)
      const subscription_plan = this.getUserSubscriptionPlan(payload.user_metadata)
      request['user'] = payload.sub
      console.log(payload.sub)
      request['subscription_plan'] = subscription_plan
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization
    if (!authorizationHeader) return undefined

    const [type, token] = authorizationHeader.split(' ')
    return type === 'Bearer' && token ? token : undefined
  }

  private getUserSubscriptionPlan(user_metadata): string {
    let now = new Date().getTime()
    let endDate = new Date(user_metadata.endDate).getTime()

    if (endDate < now || isNaN(endDate)) {
      return 'PRE'
    } else {
      if (user_metadata.subscription_plan) {
        return user_metadata.subscription_plan // BASIC or PRO
      } else {
        return 'PRE'
      }
    }
  }
}
