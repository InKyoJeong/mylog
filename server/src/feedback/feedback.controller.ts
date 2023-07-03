import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';
import { AuthAdminGuard } from 'src/auth/guard/admin-auth.guard';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/@common/decorators/get-user.decorator';
import { ADMIN_FLAG } from 'src/@common/constants';

@Controller('feedback')
@UseGuards(AuthGuard())
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  @UseGuards(AuthGuard(), AuthAdminGuard)
  @SetMetadata(ADMIN_FLAG, true)
  getFeedbacks(@Query('page') page: number) {
    return this.feedbackService.getFeedbacks(page);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @GetUser() user: User,
  ) {
    return this.feedbackService.createFeedback(createFeedbackDto, user);
  }
}
