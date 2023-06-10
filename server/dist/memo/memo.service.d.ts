import { Memo } from './memo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CreateMemoDto } from './dto/create-memo.dto';
export declare class MemoService {
    private memoRepository;
    constructor(memoRepository: Repository<Memo>);
    getAllMyMemos(user: User): Promise<Memo[]>;
    createMemo(createMemoDto: CreateMemoDto, user: User): Promise<void>;
    deleteMemo(id: number, user: User): Promise<void>;
}
