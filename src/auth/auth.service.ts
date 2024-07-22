import { UserService } from './../user/user.service'
import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
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
}
