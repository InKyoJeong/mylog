import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { VersionService } from './version.service';
import { Version } from './version.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Version]), AuthModule],
  controllers: [VersionController],
  providers: [VersionService],
})
export class VersionModule {}
