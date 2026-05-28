"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiKeyResolver", {
    enumerable: true,
    get: function() {
        return ApiKeyResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _apikeyentity = require("./api-key.entity");
const _createapikeyinput = require("./dtos/create-api-key.input");
const _getapikeyinput = require("./dtos/get-api-key.input");
const _revokeapikeyinput = require("./dtos/revoke-api-key.input");
const _updateapikeyinput = require("./dtos/update-api-key.input");
const _apikeygraphqlapiexceptionhandlerutil = require("./utils/api-key-graphql-api-exception-handler.util");
const _workspaceentity = require("../workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _roledto = require("../../metadata-modules/role/dtos/role.dto");
const _apikeyroleservice = require("./services/api-key-role.service");
const _apikeyservice = require("./services/api-key.service");
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
let ApiKeyResolver = class ApiKeyResolver {
    async apiKeys(workspace) {
        return this.apiKeyService.findActiveByWorkspaceId(workspace.id);
    }
    async apiKey(input, workspace) {
        try {
            const apiKey = await this.apiKeyService.findById(input.id, workspace.id);
            if (!apiKey) {
                return null;
            }
            return apiKey;
        } catch (error) {
            (0, _apikeygraphqlapiexceptionhandlerutil.apiKeyGraphqlApiExceptionHandler)(error);
            throw error;
        }
    }
    async createApiKey(workspace, input) {
        return this.apiKeyService.create({
            name: input.name,
            expiresAt: new Date(input.expiresAt),
            revokedAt: input.revokedAt ? new Date(input.revokedAt) : undefined,
            workspaceId: workspace.id,
            roleId: input.roleId
        });
    }
    async updateApiKey(workspace, input) {
        const updateData = {};
        if (input.name !== undefined) updateData.name = input.name;
        if (input.expiresAt !== undefined) updateData.expiresAt = new Date(input.expiresAt);
        if (input.revokedAt !== undefined) {
            updateData.revokedAt = input.revokedAt ? new Date(input.revokedAt) : null;
        }
        return this.apiKeyService.update(input.id, workspace.id, updateData);
    }
    async revokeApiKey(workspace, input) {
        return this.apiKeyService.revoke(input.id, workspace.id);
    }
    async assignRoleToApiKey(workspace, apiKeyId, roleId) {
        try {
            await this.apiKeyRoleService.assignRoleToApiKey({
                apiKeyId,
                roleId,
                workspaceId: workspace.id
            });
            return true;
        } catch (error) {
            (0, _apikeygraphqlapiexceptionhandlerutil.apiKeyGraphqlApiExceptionHandler)(error);
            throw error;
        }
    }
    async role(apiKey, workspace) {
        return this.apiKeyRoleService.getRoleDtoByApiKeyId({
            apiKeyId: apiKey.id,
            workspaceId: workspace.id
        });
    }
    constructor(apiKeyService, apiKeyRoleService){
        this.apiKeyService = apiKeyService;
        this.apiKeyRoleService = apiKeyRoleService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _apikeyentity.ApiKeyEntity
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyResolver.prototype, "apiKeys", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_apikeyentity.ApiKeyEntity, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getapikeyinput.GetApiKeyInput === "undefined" ? Object : _getapikeyinput.GetApiKeyInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyResolver.prototype, "apiKey", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_apikeyentity.ApiKeyEntity),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _createapikeyinput.CreateApiKeyInput === "undefined" ? Object : _createapikeyinput.CreateApiKeyInput
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyResolver.prototype, "createApiKey", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_apikeyentity.ApiKeyEntity, {
        nullable: true
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _updateapikeyinput.UpdateApiKeyInput === "undefined" ? Object : _updateapikeyinput.UpdateApiKeyInput
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyResolver.prototype, "updateApiKey", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_apikeyentity.ApiKeyEntity, {
        nullable: true
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _revokeapikeyinput.RevokeApiKeyInput === "undefined" ? Object : _revokeapikeyinput.RevokeApiKeyInput
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyResolver.prototype, "revokeApiKey", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('apiKeyId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(2, (0, _graphql.Args)('roleId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyResolver.prototype, "assignRoleToApiKey", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_roledto.RoleDTO),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apikeyentity.ApiKeyEntity === "undefined" ? Object : _apikeyentity.ApiKeyEntity,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApiKeyResolver.prototype, "role", null);
ApiKeyResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_apikeyentity.ApiKeyEntity),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apikeyservice.ApiKeyService === "undefined" ? Object : _apikeyservice.ApiKeyService,
        typeof _apikeyroleservice.ApiKeyRoleService === "undefined" ? Object : _apikeyroleservice.ApiKeyRoleService
    ])
], ApiKeyResolver);

//# sourceMappingURL=api-key.resolver.js.map