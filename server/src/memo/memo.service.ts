import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { Memo } from './memo.entity';
import { User } from 'src/auth/user.entity';
import { CreateMemoDto } from './dto/create-memo.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
  ) {}

  async getAllMyMemos(user: User) {
    try {
      const memos = this.memoRepository
        .createQueryBuilder('memo')
        .where('memo.userId = :userId', { userId: user.id })
        .getMany();

      return memos;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '메모를 가져오는 도중 에러가 발생했습니다.',
      );
    }
  }

  async createMemo(createMemoDto: CreateMemoDto, user: User) {
    const { text } = createMemoDto;

    const memo = this.memoRepository.create({ text, user });

    try {
      await this.memoRepository.save(memo);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '메모를 추가하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async deleteMemo(id: number, user: User) {
    try {
      const result = await this.memoRepository
        .createQueryBuilder('memo')
        .delete()
        .from(Memo)
        .where('userId = :userId', { userId: user.id })
        .andWhere('id = :id', { id })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException('존재하지 않는 메모입니다.');
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '메모를 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }
}
