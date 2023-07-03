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
exports.MemoController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const memo_service_1 = require("./memo.service");
const get_user_decorator_1 = require("../@common/decorators/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const create_memo_dto_1 = require("./dto/create-memo.dto");
let MemoController = class MemoController {
    constructor(memoService) {
        this.memoService = memoService;
    }
    getAllMyMemos(user) {
        return this.memoService.getAllMyMemos(user);
    }
    createMemo(createMemoDto, user) {
        return this.memoService.createMemo(createMemoDto, user);
    }
    deleteMemo(id, user) {
        return this.memoService.deleteMemo(id, user);
    }
};
__decorate([
    (0, common_1.Get)('/my'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MemoController.prototype, "getAllMyMemos", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_memo_dto_1.CreateMemoDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MemoController.prototype, "createMemo", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MemoController.prototype, "deleteMemo", null);
MemoController = __decorate([
    (0, common_1.Controller)('memos'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [memo_service_1.MemoService])
], MemoController);
exports.MemoController = MemoController;
//# sourceMappingURL=memo.controller.js.map