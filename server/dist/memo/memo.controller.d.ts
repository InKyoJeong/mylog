import { MemoService } from './memo.service';
import { User } from 'src/auth/user.entity';
import { CreateMemoDto } from './dto/create-memo.dto';
export declare class MemoController {
    private memoService;
    constructor(memoService: MemoService);
    getAllMyMemos(user: User): Promise<import("./memo.entity").Memo[]>;
    createMemo(createMemoDto: CreateMemoDto, user: User): Promise<void>;
    deleteMemo(id: number, user: User): Promise<void>;
}
