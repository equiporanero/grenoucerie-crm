"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationConnectionProviderResolver", {
    enumerable: true,
    get: function() {
        return ApplicationConnectionProviderResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationconnectionproviderdto = require("./dtos/application-connection-provider.dto");
const _connectionproviderservice = require("./connection-provider.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
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
let ApplicationConnectionProviderResolver = class ApplicationConnectionProviderResolver {
    async applicationConnectionProviders(applicationId, workspace) {
        const providers = await this.oauthProviderService.findManyByApplication({
            applicationId,
            workspaceId: workspace.id
        });
        const credentialsConfiguredByProviderId = await this.oauthProviderService.areClientCredentialsConfiguredBatch(providers);
        return providers.map((provider)=>({
                id: provider.id,
                applicationId: provider.applicationId,
                type: provider.type,
                name: provider.name,
                displayName: provider.displayName,
                oauth: provider.type === 'oauth' && provider.oauthConfig ? {
                    scopes: provider.oauthConfig.scopes,
                    isClientCredentialsConfigured: credentialsConfiguredByProviderId.get(provider.id) ?? false
                } : null
            }));
    }
    constructor(oauthProviderService){
        this.oauthProviderService = oauthProviderService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _applicationconnectionproviderdto.ApplicationConnectionProviderDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('applicationId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationConnectionProviderResolver.prototype, "applicationConnectionProviders", null);
ApplicationConnectionProviderResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_applicationconnectionproviderdto.ApplicationConnectionProviderDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectionproviderservice.ConnectionProviderService === "undefined" ? Object : _connectionproviderservice.ConnectionProviderService
    ])
], ApplicationConnectionProviderResolver);

//# sourceMappingURL=application-connection-provider.resolver.js.map