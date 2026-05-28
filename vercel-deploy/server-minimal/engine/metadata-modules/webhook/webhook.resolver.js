"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WebhookResolver", {
    enumerable: true,
    get: function() {
        return WebhookResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _createwebhookinput = require("./dtos/create-webhook.input");
const _updatewebhookinput = require("./dtos/update-webhook.input");
const _webhookdto = require("./dtos/webhook.dto");
const _webhookgraphqlapiexceptioninterceptor = require("./interceptors/webhook-graphql-api-exception.interceptor");
const _webhookservice = require("./webhook.service");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
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
let WebhookResolver = class WebhookResolver {
    async webhooks(workspace) {
        return await this.webhookService.findAll(workspace.id);
    }
    async webhook(id, workspace) {
        return await this.webhookService.findById(id, workspace.id);
    }
    async createWebhook(input, workspace) {
        return await this.webhookService.create(input, workspace.id);
    }
    async updateWebhook(input, workspace) {
        return await this.webhookService.update(input, workspace.id);
    }
    async deleteWebhook(id, workspace) {
        return await this.webhookService.delete(id, workspace.id);
    }
    constructor(webhookService){
        this.webhookService = webhookService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _webhookdto.WebhookDTO
        ]),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WebhookResolver.prototype, "webhooks", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_webhookdto.WebhookDTO, {
        nullable: true
    }),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WebhookResolver.prototype, "webhook", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_webhookdto.WebhookDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createwebhookinput.CreateWebhookInput === "undefined" ? Object : _createwebhookinput.CreateWebhookInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WebhookResolver.prototype, "createWebhook", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_webhookdto.WebhookDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatewebhookinput.UpdateWebhookInput === "undefined" ? Object : _updatewebhookinput.UpdateWebhookInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WebhookResolver.prototype, "updateWebhook", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_webhookdto.WebhookDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WebhookResolver.prototype, "deleteWebhook", null);
WebhookResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor, _webhookgraphqlapiexceptioninterceptor.WebhookGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_webhookdto.WebhookDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _webhookservice.WebhookService === "undefined" ? Object : _webhookservice.WebhookService
    ])
], WebhookResolver);

//# sourceMappingURL=webhook.resolver.js.map