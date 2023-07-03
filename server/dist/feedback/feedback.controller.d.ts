import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';
import { User } from 'src/auth/user.entity';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getFeedbacks(page: number): Promise<import("./feedback.entity").Feedback[]>;
    createFeedback(createFeedbackDto: CreateFeedbackDto, user: User): Promise<void>;
}
