import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { User } from 'src/auth/user.entity';
export declare class FeedbackService {
    private feedbackRepository;
    constructor(feedbackRepository: Repository<Feedback>);
    getFeedbacks(page: number): Promise<Feedback[]>;
    createFeedback(createFeedbackDto: CreateFeedbackDto, user: User): Promise<void>;
}
