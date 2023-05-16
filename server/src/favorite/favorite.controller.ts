import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorites')
@UseGuards(AuthGuard())
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Get('/my')
  async getMyFavoritePosts(@GetUser() user: User) {
    return this.favoriteService.getMyFavoritePosts(user);
  }

  @Post()
  createFavorite(@Body() dto: any, @GetUser() user: User) {
    return this.favoriteService.createFavorite(dto, user);
  }
}
