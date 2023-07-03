import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthAdminGuard } from 'src/auth/guard/admin-auth.guard';
import { ADMIN_FLAG } from 'src/constants';

@Controller('report')
@UseGuards(AuthGuard())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  getReports() {
    return this.reportService.getReports();
  }

  @Post('/:postId')
  reportPostById(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User,
  ) {
    return this.reportService.reportPostById(postId, user);
  }
}
