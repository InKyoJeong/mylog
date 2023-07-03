"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const memo_entity_1 = require("./memo.entity");
let MemoService = class MemoService {
    constructor(memoRepository) {
        this.memoRepository = memoRepository;
    }
    async getAllMyMemos(user) {
        try {
            const memos = this.memoRepository
                .createQueryBuilder('memo')
                .where('memo.userId = :userId', { userId: user.id })
                .getMany();
            return memos;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('메모를 가져오는 도중 에러가 발생했습니다.');
        }
    }
    async createMemo(createMemoDto, user) {
        const { text } = createMemoDto;
        const memo = this.memoRepository.create({ text, user });
        try {
            await this.memoRepository.save(memo);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('메모를 추가하는 도중 에러가 발생했습니다.');
        }
    }
    async deleteMemo(id, user) {
        try {
            const result = await this.memoRepository
                .createQueryBuilder('memo')
                .delete()
                .from(memo_entity_1.Memo)
                .where('userId = :userId', { userId: user.id })
                .andWhere('id = :id', { id })
                .execute();
            if (result.affected === 0) {
                throw new common_1.NotFoundException('존재하지 않는 메모입니다.');
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('메모를 삭제하는 도중 에러가 발생했습니다.');
        }
    }
};
MemoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(memo_entity_1.Memo)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MemoService);
exports.MemoService = MemoService;
//# sourceMappingURL=memo.service.js.map