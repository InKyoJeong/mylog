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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const feedback_service_1 = require("./feedback.service");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const create_feedback_dto_1 = require("./dto/create-feedback.dto");
const admin_auth_guard_1 = require("../auth/guard/admin-auth.guard");
const constants_1 = require("../constants");
let FeedbackController = class FeedbackController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    getFeedbacks(page) {
        return this.feedbackService.getFeedbacks(page);
    }
    createFeedback(createFeedbackDto, user) {
        return this.feedbackService.createFeedback(createFeedbackDto, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), admin_auth_guard_1.AuthAdminGuard),
    (0, common_1.SetMetadata)(constants_1.ADMIN_FLAG, true),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FeedbackController.prototype, "getFeedbacks", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], FeedbackController.prototype, "createFeedback", null);
FeedbackController = __decorate([
    (0, common_1.Controller)('feedback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackController);
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=feedback.controller.js.map