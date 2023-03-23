import {
  Body,
  Controller,
  HttpException,
  Post,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { HttpExceptionFilter } from './filter';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signup(authCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string; accessToken: string; refreshToken: string }> {
    return this.authService.signin(authCredentialsDto);
  }

  @Post('/refresh')
  @UseGuards(AuthGuard())
  refresh(@GetUser() user: User): Promise<{
    username: string;
    accessToken: string;
    refreshToken: string;
  }> {
    return this.authService.refreshToken(user);
  }
}
