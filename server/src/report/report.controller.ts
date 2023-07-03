import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('report')
@UseGuards(AuthGuard())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post('/:postId')
  reportPostById(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User,
  ) {
    return this.reportService.reportPostById(postId, user);
  }
}
