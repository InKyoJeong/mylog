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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const version_entity_1 = require("./version.entity");
let VersionService = class VersionService {
    constructor(versionRepository) {
        this.versionRepository = versionRepository;
    }
    async getVersion() {
        try {
            const version = await this.versionRepository.findOneBy({ id: 1 });
            const { id } = version, versions = __rest(version, ["id"]);
            return versions;
        }
        catch (error) {
            console.log('error', error);
            throw new common_1.InternalServerErrorException('버전을 가져오는 도중 에러가 발생했습니다.');
        }
    }
    async updateVersion(updateVersionDto) {
        const { versionIOS, versionAndroid } = updateVersionDto;
        const versions = this.versionRepository.create({
            versionIOS,
            versionAndroid,
        });
        try {
            await this.versionRepository.save(versions);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('버전을 변경하는 도중 에러가 발생했습니다.');
        }
    }
};
VersionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(version_entity_1.Version)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VersionService);
exports.VersionService = VersionService;
//# sourceMappingURL=version.service.js.map