"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserVarsService", {
    enumerable: true,
    get: function() {
        return UserVarsService;
    }
});
const _common = require("@nestjs/common");
const _keyvaluepairentity = require("../../../key-value-pair/key-value-pair.entity");
const _keyvaluepairservice = require("../../../key-value-pair/key-value-pair.service");
const _mergeuservarsutil = require("../utils/merge-user-vars.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UserVarsService = class UserVarsService {
    async get({ userId, workspaceId, key }) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        let userVarWorkspaceLevel = [];
        if (workspaceId) {
            userVarWorkspaceLevel = await this.keyValuePairService.get({
                type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE,
                userId: null,
                workspaceId,
                key
            });
        }
        if (userVarWorkspaceLevel.length > 1) {
            throw new Error(`Multiple values found for key ${key} at workspace level`);
        }
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        let userVarUserLevel = [];
        if (userId) {
            userVarUserLevel = await this.keyValuePairService.get({
                type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE,
                userId,
                workspaceId: null,
                key
            });
        }
        if (userVarUserLevel.length > 1) {
            throw new Error(`Multiple values found for key ${key} at user level`);
        }
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        let userVarWorkspaceAndUserLevel = [];
        if (userId && workspaceId) {
            userVarWorkspaceAndUserLevel = await this.keyValuePairService.get({
                type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE,
                userId,
                workspaceId,
                key
            });
        }
        if (userVarWorkspaceAndUserLevel.length > 1) {
            throw new Error(`Multiple values found for key ${key} at workspace and user level`);
        }
        return (0, _mergeuservarsutil.mergeUserVars)([
            ...userVarUserLevel,
            ...userVarWorkspaceLevel,
            ...userVarWorkspaceAndUserLevel
        ]).get(key);
    }
    async getAll({ userId, workspaceId }) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        let result = [];
        if (userId) {
            result = [
                ...result,
                ...await this.keyValuePairService.get({
                    type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE,
                    userId,
                    workspaceId: null
                })
            ];
        }
        if (workspaceId) {
            result = [
                ...result,
                ...await this.keyValuePairService.get({
                    type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE,
                    userId: null,
                    workspaceId
                })
            ];
        }
        if (workspaceId && userId) {
            result = [
                ...result,
                ...await this.keyValuePairService.get({
                    type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE,
                    userId,
                    workspaceId
                })
            ];
        }
        return (0, _mergeuservarsutil.mergeUserVars)(result);
    }
    set({ userId, workspaceId, key, value }, queryRunner) {
        return this.keyValuePairService.set({
            userId,
            workspaceId,
            key: key,
            value,
            type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE
        }, queryRunner);
    }
    async delete({ userId, workspaceId, key }, queryRunner) {
        return this.keyValuePairService.delete({
            userId,
            workspaceId,
            key,
            type: _keyvaluepairentity.KeyValuePairType.USER_VARIABLE
        }, queryRunner);
    }
    constructor(keyValuePairService){
        this.keyValuePairService = keyValuePairService;
    }
};
UserVarsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _keyvaluepairservice.KeyValuePairService === "undefined" ? Object : _keyvaluepairservice.KeyValuePairService
    ])
], UserVarsService);

//# sourceMappingURL=user-vars.service.js.map