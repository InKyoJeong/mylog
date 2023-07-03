import { ReportService } from './report.service';
import { User } from 'src/auth/user.entity';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    getReports(): Promise<import("./report.entity").Report[]>;
    reportPostById(postId: number, user: User): Promise<void>;
}
