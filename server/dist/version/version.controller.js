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
exports.VersionController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const admin_auth_guard_1 = require("../auth/guard/admin-auth.guard");
const constants_1 = require("../constants");
const version_service_1 = require("./version.service");
const update_version_dto_1 = require("./dto/update-version.dto");
let VersionController = class VersionController {
    constructor(versionService) {
        this.versionService = versionService;
    }
    getVersion() {
        return this.versionService.getVersion();
    }
    createVersion(createVersionDto) {
        return this.versionService.createVersion(createVersionDto);
    }
    updateVersion(updateVersionDto) {
        return this.versionService.updateVersion(updateVersionDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "getVersion", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), admin_auth_guard_1.AuthAdminGuard),
    (0, common_1.SetMetadata)(constants_1.ADMIN_FLAG, true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_version_dto_1.UpdateVersionDto]),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "createVersion", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), admin_auth_guard_1.AuthAdminGuard),
    (0, common_1.SetMetadata)(constants_1.ADMIN_FLAG, true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_version_dto_1.UpdateVersionDto]),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "updateVersion", null);
VersionController = __decorate([
    (0, common_1.Controller)('version'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [version_service_1.VersionService])
], VersionController);
exports.VersionController = VersionController;
//# sourceMappingURL=version.controller.js.map