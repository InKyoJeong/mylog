import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version } from './version.entity';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private versionRepository: Repository<Version>,
  ) {}

  async getVersion() {
    try {
      const version = await this.versionRepository.findOneBy({ id: 1 });
      const { id, ...versions } = version;

      return versions;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException(
        '버전을 가져오는 도중 에러가 발생했습니다.',
      );
    }
  }

  async createVersion(createVersionDto: UpdateVersionDto) {
    const { ios, android } = createVersionDto;

    const foundVersion = await this.versionRepository.find();
    if (foundVersion.length > 0) {
      return;
    }

    const versions = this.versionRepository.create({
      ios,
      android,
    });

    try {
      await this.versionRepository.save(versions);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '버전을 생성하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async updateVersion(updateVersionDto: UpdateVersionDto) {
    const { ios, android } = updateVersionDto;

    const versions = await this.versionRepository
      .createQueryBuilder('version')
      .where('version.id = :id', { id: 1 })
      .getOne();

    versions.ios = ios;
    versions.android = android;

    try {
      await this.versionRepository.save(versions);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '버전을 수정하는 도중 에러가 발생했습니다.',
      );
    }
  }
}
