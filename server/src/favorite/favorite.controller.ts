import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto';

@Controller('favorites')
@UseGuards(AuthGuard())
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get('/my')
  async getMyFavoritePosts(@GetUser() user: User) {
    return this.favoriteService.getMyFavoritePosts(user);
  }

  @Post()
  toggleFavorite(
    @Body() toggleFavoriteDto: ToggleFavoriteDto,
    @GetUser() user: User,
  ): Promise<number> {
    return this.favoriteService.toggleFavorite(toggleFavoriteDto, user);
  }
}
