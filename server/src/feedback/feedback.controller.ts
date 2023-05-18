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

@Controller('feedback')
@UseGuards(AuthGuard())
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}
}
