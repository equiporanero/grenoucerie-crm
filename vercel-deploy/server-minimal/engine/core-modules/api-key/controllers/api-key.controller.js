"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiKeyController", {
    enumerable: true,
    get: function() {
        return ApiKeyController;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _restapiexceptionfilter = require("../../../api/rest/rest-api-exception.filter");
const _createapikeyinput = require("../dtos/create-api-key.input");
const _updateapikeyinput = require("../dtos/update-api-key.input");
const _apikeyservice = require("../services/api-key.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _jwtauthguard = require("../../../guards/jwt-auth.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _permissionsrestapiexceptionfilter = require("../../../metadata-modules/permissions/utils/permissions-rest-api-exception.filter");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ApiKeyController = class ApiKeyController {
    async findAll(workspace) {
        return this.apiKeyService.findActiveByWorkspaceId(workspace.id);
    }
    async findOne(id, workspace) {
        return this.apiKeyService.findById(id, workspace.id);
    }
    async create(createApiKeyDto, workspace) {
        return this.apiKeyService.create({
            name: createApiKeyDto.name,
            expiresAt: new Date(createApiKeyDto.expiresAt),
            revokedAt: createApiKeyDto.revokedAt ? new Date(createApiKeyDto.revokedAt) : undefined,
            workspaceId: workspace.id,
            roleId: createApiKeyDto.roleId
        });
    }
    async update(id, updateApiKeyDto, workspace) {
        const updateData = {};
        if (updateApiKeyDto.name !== undefined) updateData.name = updateApiKeyDto.name;
        if (updateApiKeyDto.expiresAt !== undefined) updateData.expiresAt = new Date(updateApiKeyDto.expiresAt);
        if (updateApiKeyDto.revokedAt !== undefined) {
            updateData.revokedAt = updateApiKeyDto.revokedAt ? new Date(updateApiKeyDto.revokedAt) : undefined;
        }
        return this.apiKeyService.update(id, workspace.id, updateData);
    }
    async remove(id, workspace) {
        return this.apiKeyService.revoke(id, workspace.id);
    }
    constructor(apiKeyService){
        this.apiKeyService = apiKeyService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createapikeyinput.CreateApiKeyInput === "undefined" ? Object : _createapikeyinput.CreateApiKeyInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateapikeyinput.UpdateApiKeyInput === "undefined" ? Object : _updateapikeyinput.UpdateApiKeyInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyController.prototype, "remove", null);
ApiKeyController = _ts_decorate([
    (0, _common.Controller)([
        'rest/apiKeys',
        'rest/metadata/apiKeys'
    ]),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _restapiexceptionfilter.RestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apikeyservice.ApiKeyService === "undefined" ? Object : _apikeyservice.ApiKeyService
    ])
], ApiKeyController);

//# sourceMappingURL=api-key.controller.js.map