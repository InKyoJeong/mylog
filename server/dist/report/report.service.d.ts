import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from 'src/auth/user.entity';
import { Post } from 'src/post/post.entity';
export declare class ReportService {
    private reportRepository;
    private postRepository;
    constructor(reportRepository: Repository<Report>, postRepository: Repository<Post>);
    getReports(): Promise<Report[]>;
    reportPostById(postId: number, user: User): Promise<void>;
}
