"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemResolver", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _utils = require("twenty-shared/utils");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspaceauthcontextstorage = require("../../core-modules/auth/storage/workspace-auth-context.storage");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authapikeydecorator = require("../../decorators/auth/auth-api-key.decorator");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _createnavigationmenuiteminput = require("./dtos/create-navigation-menu-item.input");
const _navigationmenuitemdto = require("./dtos/navigation-menu-item.dto");
const _recordidentifierdto = require("./dtos/record-identifier.dto");
const _updatenavigationmenuiteminput = require("./dtos/update-navigation-menu-item.input");
const _navigationmenuitemgraphqlapiexceptioninterceptor = require("./interceptors/navigation-menu-item-graphql-api-exception.interceptor");
const _navigationmenuitemservice = require("./navigation-menu-item.service");
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
let NavigationMenuItemResolver = class NavigationMenuItemResolver {
    async navigationMenuItems(workspace, userWorkspaceId) {
        return await this.navigationMenuItemService.findAll({
            workspaceId: workspace.id,
            userWorkspaceId
        });
    }
    async navigationMenuItem(id, workspace) {
        return await this.navigationMenuItemService.findById({
            id,
            workspaceId: workspace.id
        });
    }
    async createManyNavigationMenuItems(inputs, workspace, userWorkspaceId, apiKey, context) {
        return await this.navigationMenuItemService.createMany({
            inputs,
            workspaceId: workspace.id,
            authUserWorkspaceId: userWorkspaceId,
            authApiKeyId: apiKey?.id,
            authApplicationId: context.req.application?.id
        });
    }
    async createNavigationMenuItem(input, workspace, userWorkspaceId, apiKey, context) {
        return await this.navigationMenuItemService.create({
            input,
            workspaceId: workspace.id,
            authUserWorkspaceId: userWorkspaceId,
            authApiKeyId: apiKey?.id,
            authApplicationId: context.req.application?.id
        });
    }
    async updateManyNavigationMenuItems(inputs, workspace, userWorkspaceId, apiKey, context) {
        return await this.navigationMenuItemService.updateMany({
            inputs,
            workspaceId: workspace.id,
            authUserWorkspaceId: userWorkspaceId,
            authApiKeyId: apiKey?.id,
            authApplicationId: context.req.application?.id
        });
    }
    async updateNavigationMenuItem(input, workspace, userWorkspaceId, apiKey, context) {
        return await this.navigationMenuItemService.update({
            input: {
                ...input.update,
                id: input.id
            },
            workspaceId: workspace.id,
            authUserWorkspaceId: userWorkspaceId,
            authApiKeyId: apiKey?.id,
            authApplicationId: context.req.application?.id
        });
    }
    async deleteManyNavigationMenuItems(ids, workspace, userWorkspaceId, apiKey, context) {
        return await this.navigationMenuItemService.deleteMany({
            ids,
            workspaceId: workspace.id,
            authUserWorkspaceId: userWorkspaceId,
            authApiKeyId: apiKey?.id,
            authApplicationId: context.req.application?.id
        });
    }
    async deleteNavigationMenuItem(id, workspace, userWorkspaceId, apiKey, context) {
        return await this.navigationMenuItemService.delete({
            id,
            workspaceId: workspace.id,
            authUserWorkspaceId: userWorkspaceId,
            authApiKeyId: apiKey?.id,
            authApplicationId: context.req.application?.id
        });
    }
    async targetRecordIdentifier(navigationMenuItem, workspace) {
        if (!(0, _utils.isDefined)(navigationMenuItem.targetRecordId) || !(0, _utils.isDefined)(navigationMenuItem.targetObjectMetadataId)) {
            return null;
        }
        const authContext = (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)();
        return await this.navigationMenuItemService.findTargetRecord({
            targetRecordId: navigationMenuItem.targetRecordId,
            targetObjectMetadataId: navigationMenuItem.targetObjectMetadataId,
            workspaceId: workspace.id,
            authContext
        });
    }
    constructor(navigationMenuItemService){
        this.navigationMenuItemService = navigationMenuItemService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _navigationmenuitemdto.NavigationMenuItemDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "navigationMenuItems", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_navigationmenuitemdto.NavigationMenuItemDTO, {
        nullable: true
    }),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
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
], NavigationMenuItemResolver.prototype, "navigationMenuItem", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _navigationmenuitemdto.NavigationMenuItemDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('inputs', {
        type: ()=>[
                _createnavigationmenuiteminput.CreateNavigationMenuItemInput
            ]
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(4, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "createManyNavigationMenuItems", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_navigationmenuitemdto.NavigationMenuItemDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(4, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createnavigationmenuiteminput.CreateNavigationMenuItemInput === "undefined" ? Object : _createnavigationmenuiteminput.CreateNavigationMenuItemInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "createNavigationMenuItem", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _navigationmenuitemdto.NavigationMenuItemDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('inputs', {
        type: ()=>[
                _updatenavigationmenuiteminput.UpdateOneNavigationMenuItemInput
            ]
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(4, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "updateManyNavigationMenuItems", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_navigationmenuitemdto.NavigationMenuItemDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(4, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatenavigationmenuiteminput.UpdateOneNavigationMenuItemInput === "undefined" ? Object : _updatenavigationmenuiteminput.UpdateOneNavigationMenuItemInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "updateNavigationMenuItem", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _navigationmenuitemdto.NavigationMenuItemDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('ids', {
        type: ()=>[
                _scalars.UUIDScalarType
            ]
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(4, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "deleteManyNavigationMenuItems", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_navigationmenuitemdto.NavigationMenuItemDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(4, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        Object,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "deleteNavigationMenuItem", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_recordidentifierdto.RecordIdentifierDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _navigationmenuitemdto.NavigationMenuItemDTO === "undefined" ? Object : _navigationmenuitemdto.NavigationMenuItemDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemResolver.prototype, "targetRecordIdentifier", null);
NavigationMenuItemResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor, _navigationmenuitemgraphqlapiexceptioninterceptor.NavigationMenuItemGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_navigationmenuitemdto.NavigationMenuItemDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _navigationmenuitemservice.NavigationMenuItemService === "undefined" ? Object : _navigationmenuitemservice.NavigationMenuItemService
    ])
], NavigationMenuItemResolver);

//# sourceMappingURL=navigation-menu-item.resolver.js.map