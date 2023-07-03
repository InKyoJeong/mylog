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
exports.ReportController = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const user_entity_1 = require("../auth/user.entity");
const get_user_decorator_1 = require("../common/decorators/get-user.decorator");
const admin_auth_guard_1 = require("../auth/guard/admin-auth.guard");
const constants_1 = require("../constants");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    getReports() {
        return this.reportService.getReports();
    }
    reportPostById(postId, user) {
        return this.reportService.reportPostById(postId, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), admin_auth_guard_1.AuthAdminGuard),
    (0, common_1.SetMetadata)(constants_1.ADMIN_FLAG, true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getReports", null);
__decorate([
    (0, common_1.Post)('/:postId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "reportPostById", null);
ReportController = __decorate([
    (0, common_1.Controller)('report'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map