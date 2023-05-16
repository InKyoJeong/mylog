import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { User } from 'src/auth/user.entity';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto';

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
      .leftJoinAndSelect('post.images', 'image')
      .where('favorite.userId = :userId', { userId: user.id })
      .getMany();

    return favorites.map((favorite) => favorite.post);
  }

  async toggleFavorite(
    toggleFavoriteDto: ToggleFavoriteDto,
    user: User,
  ): Promise<number> {
    const { postId } = toggleFavoriteDto;

    if (!postId) {
      throw new BadRequestException('Invalid postId');
    }

    const existingFavorite = await this.favoriteRepository.findOne({
      where: { postId, userId: user.id },
    });

    if (existingFavorite) {
      await this.favoriteRepository.delete(existingFavorite.id);

      return existingFavorite.postId;
    }

    const favorite = this.favoriteRepository.create({
      postId,
      userId: user.id,
    });

    await this.favoriteRepository.save(favorite);

    return favorite.postId;
  }
}
