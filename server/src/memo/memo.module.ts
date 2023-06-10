import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { Memo } from './memo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Memo]), AuthModule],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
