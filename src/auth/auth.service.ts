import { UserService } from './../user/user.service'
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'
import { env } from 'process'
import { Response } from 'express'

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 3
  REFRESH_TOKEN_NAME = 'refreshToken'
  constructor(
    private jwt: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto)
    const token = this.issueTokens(user.id)
    return {
      user,
      ...token
    }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email)

    if (oldUser) throw new BadRequestException('User already exist')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto)
    const token = this.issueTokens(user.id)

    return {
      user,
      ...token
    }
  }

  private issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '72h'
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new NotFoundException('Invalid password')

    return user
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const domain = env.DOMAIN
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain,
      expires: expiresIn,
      secure: true,
      // lax in production
      sameSite: 'none'
    })
  }

  removeRefreshTokenFromResponse(res: Response) {
    const domain = env.DOMAIN
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain,
      expires: new Date(0),
      secure: true,
      // lax in production
      sameSite: 'none'
    })
  }
}
