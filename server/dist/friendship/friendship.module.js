"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const friendship_controller_1 = require("./friendship.controller");
const friendship_service_1 = require("./friendship.service");
const friendship_entity_1 = require("./friendship.entity");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../auth/user.entity");
let FriendshipModule = class FriendshipModule {
};
FriendshipModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([friendship_entity_1.Friendship, user_entity_1.User]), auth_module_1.AuthModule],
        controllers: [friendship_controller_1.FriendshipController],
        providers: [friendship_service_1.FriendshipService],
    })
], FriendshipModule);
exports.FriendshipModule = FriendshipModule;
//# sourceMappingURL=friendship.module.js.map