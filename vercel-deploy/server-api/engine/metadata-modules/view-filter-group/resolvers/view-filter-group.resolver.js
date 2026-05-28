"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterGroupResolver", {
    enumerable: true,
    get: function() {
        return ViewFilterGroupResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _utils = require("twenty-shared/utils");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createviewfiltergroupinput = require("../dtos/inputs/create-view-filter-group.input");
const _updateviewfiltergroupinput = require("../dtos/inputs/update-view-filter-group.input");
const _viewfiltergroupdto = require("../dtos/view-filter-group.dto");
const _viewfiltergroupservice = require("../services/view-filter-group.service");
const _createviewfiltergrouppermissionguard = require("../../view-permissions/guards/create-view-filter-group-permission.guard");
const _deleteviewfiltergrouppermissionguard = require("../../view-permissions/guards/delete-view-filter-group-permission.guard");
const _destroyviewfiltergrouppermissionguard = require("../../view-permissions/guards/destroy-view-filter-group-permission.guard");
const _updateviewfiltergrouppermissionguard = require("../../view-permissions/guards/update-view-filter-group-permission.guard");
const _viewgraphqlapiexceptionfilter = require("../../view/utils/view-graphql-api-exception.filter");
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
let ViewFilterGroupResolver = class ViewFilterGroupResolver {
    async getViewFilterGroups(workspace, viewId) {
        if (viewId) {
            return this.viewFilterGroupService.findByViewId(workspace.id, viewId);
        }
        return this.viewFilterGroupService.findByWorkspaceId(workspace.id);
    }
    async getViewFilterGroup(id, workspace) {
        return this.viewFilterGroupService.findById(id, workspace.id);
    }
    async createViewFilterGroup(input, workspace) {
        return this.viewFilterGroupService.createOne({
            createViewFilterGroupInput: input,
            workspaceId: workspace.id
        });
    }
    async updateViewFilterGroup(id, input, workspace) {
        return this.viewFilterGroupService.updateOne({
            id,
            updateViewFilterGroupInput: input,
            workspaceId: workspace.id
        });
    }
    async deleteViewFilterGroup(id, workspace) {
        const deletedViewFilterGroup = await this.viewFilterGroupService.deleteOne({
            deleteViewFilterGroupInput: {
                id
            },
            workspaceId: workspace.id
        });
        return (0, _utils.isDefined)(deletedViewFilterGroup);
    }
    async destroyViewFilterGroup(id, workspace) {
        const destroyedViewFilterGroup = await this.viewFilterGroupService.destroyOne({
            destroyViewFilterGroupInput: {
                id
            },
            workspaceId: workspace.id
        });
        return (0, _utils.isDefined)(destroyedViewFilterGroup);
    }
    constructor(viewFilterGroupService){
        this.viewFilterGroupService = viewFilterGroupService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _viewfiltergroupdto.ViewFilterGroupDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('viewId', {
        type: ()=>String,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterGroupResolver.prototype, "getViewFilterGroups", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_viewfiltergroupdto.ViewFilterGroupDTO, {
        nullable: true
    }),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterGroupResolver.prototype, "getViewFilterGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfiltergroupdto.ViewFilterGroupDTO),
    (0, _common.UseGuards)(_createviewfiltergrouppermissionguard.CreateViewFilterGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewfiltergroupinput.CreateViewFilterGroupInput === "undefined" ? Object : _createviewfiltergroupinput.CreateViewFilterGroupInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterGroupResolver.prototype, "createViewFilterGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfiltergroupdto.ViewFilterGroupDTO),
    (0, _common.UseGuards)(_updateviewfiltergrouppermissionguard.UpdateViewFilterGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateviewfiltergroupinput.UpdateViewFilterGroupInput === "undefined" ? Object : _updateviewfiltergroupinput.UpdateViewFilterGroupInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterGroupResolver.prototype, "updateViewFilterGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_deleteviewfiltergrouppermissionguard.DeleteViewFilterGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterGroupResolver.prototype, "deleteViewFilterGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_destroyviewfiltergrouppermissionguard.DestroyViewFilterGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterGroupResolver.prototype, "destroyViewFilterGroup", null);
ViewFilterGroupResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_viewfiltergroupdto.ViewFilterGroupDTO),
    (0, _common.UseFilters)(_viewgraphqlapiexceptionfilter.ViewGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfiltergroupservice.ViewFilterGroupService === "undefined" ? Object : _viewfiltergroupservice.ViewFilterGroupService
    ])
], ViewFilterGroupResolver);

//# sourceMappingURL=view-filter-group.resolver.js.map