import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateMemoDto } from './dto/create-memo.dto';

@Controller('memos')
export class MemoController {
  constructor(private memoService: MemoService) {}

  @Get('/my')
  getAllMyMemos(@GetUser() user: User) {
    return this.memoService.getAllMyMemos(user);
  }

  @Post('/')
  createMemo(@Body() createMemoDto: CreateMemoDto, @GetUser() user: User) {
    return this.memoService.createMemo(createMemoDto, user);
  }

  @Delete('/:id')
  deleteMemo(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.memoService.deleteMemo(id, user);
  }
}
