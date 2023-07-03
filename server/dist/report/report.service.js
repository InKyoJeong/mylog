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
exports.ReportService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const report_entity_1 = require("./report.entity");
const post_entity_1 = require("../post/post.entity");
let ReportService = class ReportService {
    constructor(reportRepository, postRepository) {
        this.reportRepository = reportRepository;
        this.postRepository = postRepository;
    }
    async getReports() {
        return this.reportRepository.find();
    }
    async reportPostById(postId, user) {
        const foundPost = await this.postRepository
            .createQueryBuilder('post')
            .where('post.id = :postId', { postId })
            .getOne();
        if (!foundPost) {
            throw new common_1.NotFoundException('존재하지 않는 피드입니다.');
        }
        const existingReport = await this.reportRepository
            .createQueryBuilder('report')
            .where('report.userId = :userId', { userId: user.id })
            .andWhere('report.postId = :postId', { postId })
            .getOne();
        if (existingReport) {
            throw new common_1.ConflictException('이미 신고한 게시글입니다.');
        }
        const report = this.reportRepository.create({
            postId,
            title: foundPost.title,
            user,
        });
        try {
            await this.reportRepository.save(report);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('신고 도중 에러가 발생했습니다.');
        }
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(report_entity_1.Report)),
    __param(1, (0, typeorm_2.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map