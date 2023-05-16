import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async getMyFavoritePosts(user: User) {
    const favorites = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .innerJoinAndSelect('favorite.post', 'post')
      .where('favorite.userId = :userId', { userId: user.id })
      .getMany();

    return favorites;
  }

  async createFavorite(createFavoriteDto: CreateFavoriteDto, user: User) {
    const { postId } = createFavoriteDto;

    if (!postId) {
      throw new BadRequestException('Invalid postId');
    }

    const favorite = this.favoriteRepository.create({
      postId,
      userId: user.id,
    });

    await this.favoriteRepository.save(favorite);
  }
}
