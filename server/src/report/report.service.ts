import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Report } from './report.entity';
import { User } from 'src/auth/user.entity';
import { Post } from 'src/post/post.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getReports() {
    return this.reportRepository.find();
  }

  async reportPostById(postId: number, user: User) {
    const foundPost = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :postId', { postId })
      .getOne();

    if (!foundPost) {
      throw new NotFoundException('존재하지 않는 피드입니다.');
    }

    const existingReport = await this.reportRepository
      .createQueryBuilder('report')
      .where('report.userId = :userId', { userId: user.id })
      .andWhere('report.postId = :postId', { postId })
      .getOne();

    if (existingReport) {
      throw new ConflictException('이미 신고한 게시글입니다.');
    }

    const report = this.reportRepository.create({
      postId,
      title: foundPost.title,
      user,
    });

    try {
      await this.reportRepository.save(report);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('신고 도중 에러가 발생했습니다.');
    }
  }
}
