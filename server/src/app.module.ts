import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { PostModule } from './post/post.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FeedbackModule } from './feedback/feedback.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { VersionModule } from './version/version.module';
import { MemoModule } from './memo/memo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/',
    }),
    PostModule,
    AuthModule,
    ImageModule,
    FavoriteModule,
    FeedbackModule,
    VersionModule,
    MemoModule,
  ],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
