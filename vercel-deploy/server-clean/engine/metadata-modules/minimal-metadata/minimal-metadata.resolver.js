"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MinimalMetadataResolver", {
    enumerable: true,
    get: function() {
        return MinimalMetadataResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _minimalmetadatadto = require("./dtos/minimal-metadata.dto");
const _minimalmetadataservice = require("./minimal-metadata.service");
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
let MinimalMetadataResolver = class MinimalMetadataResolver {
    async minimalMetadata(workspace, userWorkspaceId, context) {
        return this.minimalMetadataService.getMinimalMetadata(workspace.id, userWorkspaceId, context.req.locale);
    }
    constructor(minimalMetadataService){
        this.minimalMetadataService = minimalMetadataService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_minimalmetadatadto.MinimalMetadataDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(2, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        typeof I18nContext === "undefined" ? Object : I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], MinimalMetadataResolver.prototype, "minimalMetadata", null);
MinimalMetadataResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_minimalmetadatadto.MinimalMetadataDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _minimalmetadataservice.MinimalMetadataService === "undefined" ? Object : _minimalmetadataservice.MinimalMetadataService
    ])
], MinimalMetadataResolver);

//# sourceMappingURL=minimal-metadata.resolver.js.map