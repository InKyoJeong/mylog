import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedbackService } from './feedback.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
@UseGuards(AuthGuard())
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @GetUser() user: User,
  ) {
    return this.feedbackService.createFeedback(createFeedbackDto, user);
  }
}
