import { FeedbackService } from './feedback.service';
import { User } from 'src/auth/user.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    getFeedbacks(): Promise<import("./feedback.entity").Feedback[]>;
    createFeedback(createFeedbackDto: CreateFeedbackDto, user: User): Promise<void>;
}
