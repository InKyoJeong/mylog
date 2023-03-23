import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 아이디입니다.');
      }

      throw new InternalServerErrorException();
    }
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string; accessToken: string; refreshToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.refreshToken(user);
    } else {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );
    }
  }

  async refreshToken(user: User): Promise<{
    username: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const { username } = user;
    const { accessToken, refreshToken } = await this.getTokens({ username });
    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { username, accessToken, refreshToken };
  }

  private async updateHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    await this.userRepository.update(id, { hashedRefreshToken });
  }

  private async getTokens(payload: { username: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_ACCRESS_TOKEN_EXPIRATION',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION',
        ),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
