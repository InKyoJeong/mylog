import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Version } from './version.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private versionRepository: Repository<Version>,
  ) {}

  async getVersion() {
    return this.versionRepository.find();
  }
}
