import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import axios from 'axios';
import appleSignin from 'apple-signin-auth';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { MarkerColor } from 'src/post/marker-color.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      loginType: 'email',
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }

      throw new InternalServerErrorException(
        '회원가입 도중 에러가 발생했습니다.',
      );
    }
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const { accessToken, refreshToken } = await this.getTokens({ email });
    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { email } = user;
    const { accessToken, refreshToken } = await this.getTokens({ email });

    if (!user.hashedRefreshToken) {
      throw new ForbiddenException();
    }

    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  getProfile(user: User) {
    const { id, password, hashedRefreshToken, ...rest } = user;

    return { ...rest };
  }

  async editProfile(editProfileDto: EditProfileDto, user: User) {
    const profile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: user.id })
      .getOne();

    if (!profile) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const { nickname, imageUri } = editProfileDto;
    profile.nickname = nickname;
    profile.imageUri = imageUri;

    try {
      await this.userRepository.save(profile);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '프로필 수정 도중 에러가 발생했습니다.',
      );
    }

    const { id, password, hashedRefreshToken, ...rest } = profile;

    return { ...rest };
  }

  async deleteRefreshToken(id: number) {
    try {
      await this.userRepository.update(id, { hashedRefreshToken: null });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private async updateHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    try {
      await this.userRepository.update(id, { hashedRefreshToken });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private async getTokens(payload: { email: string }) {
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

  async deleteAccount(user: User): Promise<void> {
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .delete()
        .from(User)
        .where('id = :id', { id: user.id })
        .execute();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        '탈퇴할 수 없습니다. 남은 데이터가 존재하는지 확인해주세요.',
      );
    }
  }

  async updateCategory(
    categories: Record<keyof MarkerColor, string>,
    user: User,
  ) {
    const { RED, YELLOW, BLUE, GREEN, PURPLE } = MarkerColor;

    if (
      !Object.keys(categories).every((color: MarkerColor) =>
        [RED, YELLOW, BLUE, GREEN, PURPLE].includes(color),
      )
    ) {
      throw new BadRequestException('유효하지 않은 카테고리입니다.');
    }

    user[RED] = categories[RED];
    user[YELLOW] = categories[YELLOW];
    user[BLUE] = categories[BLUE];
    user[GREEN] = categories[GREEN];
    user[PURPLE] = categories[PURPLE];

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '카테고리 수정 도중 에러가 발생했습니다.',
      );
    }

    const { id, password, hashedRefreshToken, ...rest } = user;

    return { ...rest };
  }

  async kakaoLogin(kakaoToken: { token: string }) {
    const url = 'https://kapi.kakao.com/v2/user/me';
    const headers = {
      Authorization: `Bearer ${kakaoToken.token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };

    try {
      const response = await axios.get(url, { headers });
      const userData = response.data;
      const { id: kakaoId, kakao_account } = userData;
      const nickname = kakao_account.profile.nickname;
      const imageUri = kakao_account.profile.thumbnail_image_url.replace(
        /^http:/,
        'https:',
      );

      const existingUser = await this.userRepository.findOneBy({
        email: kakaoId,
      });

      if (existingUser) {
        const { accessToken, refreshToken } = await this.getTokens({
          email: existingUser.email,
        });

        await this.updateHashedRefreshToken(existingUser.id, refreshToken);
        return { accessToken, refreshToken };
      }

      const newUser = this.userRepository.create({
        email: kakaoId,
        password: nickname ?? '',
        nickname,
        kakaoImageUri: imageUri,
        loginType: 'kakao',
      });

      try {
        await this.userRepository.save(newUser);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }

      const { accessToken, refreshToken } = await this.getTokens({
        email: newUser.email,
      });

      await this.updateHashedRefreshToken(newUser.id, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Kakao 서버 에러가 발생했습니다.');
    }
  }

  async appleLogin(appleIdentity: {
    identityToken: string;
    appId: string;
    nickname: string | null;
  }) {
    const { identityToken, appId, nickname } = appleIdentity;

    try {
      const { sub: userAppleId } = await appleSignin.verifyIdToken(
        identityToken,
        {
          audience: appId,
          ignoreExpiration: true,
        },
      );

      const existingUser = await this.userRepository.findOneBy({
        email: userAppleId,
      });

      if (existingUser) {
        const { accessToken, refreshToken } = await this.getTokens({
          email: existingUser.email,
        });

        await this.updateHashedRefreshToken(existingUser.id, refreshToken);
        return { accessToken, refreshToken };
      }

      const newUser = this.userRepository.create({
        email: userAppleId,
        nickname: nickname === null ? '이름없음' : nickname,
        password: '',
        loginType: 'apple',
      });

      try {
        await this.userRepository.save(newUser);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }

      const { accessToken, refreshToken } = await this.getTokens({
        email: newUser.email,
      });

      await this.updateHashedRefreshToken(newUser.id, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException(
        'Apple 로그인 도중 문제가 발생했습니다.',
      );
    }
  }

  async getUsers(page: number) {
    const perPage = 30;
    const offset = (page - 1) * perPage;
    const users = await this.userRepository
      .createQueryBuilder('user')
      .take(perPage)
      .skip(offset)
      .getMany();

    return users.map((user) => {
      const { password, hashedRefreshToken, deletedAt, updatedAt, ...rest } =
        user;
      return rest;
    });
  }
}
