import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async getFeedbacks() {
    return this.feedbackRepository.find();
  }

  async createFeedback(createFeedbackDto: CreateFeedbackDto, user: User) {
    const { email, title, description } = createFeedbackDto;

    const feedback = this.feedbackRepository.create({
      email,
      title,
      description,
      user,
    });

    try {
      await this.feedbackRepository.save(feedback);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '피드백 제출 도중 에러가 발생했습니다.',
      );
    }
  }
}
