import { Injectable } from '@nestjs/common';
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

  async createFeedback(createFeedbackDto: CreateFeedbackDto, user: User) {
    const { email, title, description } = createFeedbackDto;

    const feedback = this.feedbackRepository.create({
      email,
      title,
      description,
      user,
    });

    await this.feedbackRepository.save(feedback);
  }
}
