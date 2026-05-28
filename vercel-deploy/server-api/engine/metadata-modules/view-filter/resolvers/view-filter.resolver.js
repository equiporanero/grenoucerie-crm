"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterResolver", {
    enumerable: true,
    get: function() {
        return ViewFilterResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createviewfilterinput = require("../dtos/inputs/create-view-filter.input");
const _deleteviewfilterinput = require("../dtos/inputs/delete-view-filter.input");
const _destroyviewfilterinput = require("../dtos/inputs/destroy-view-filter.input");
const _updateviewfilterinput = require("../dtos/inputs/update-view-filter.input");
const _viewfilterdto = require("../dtos/view-filter.dto");
const _viewfilterservice = require("../services/view-filter.service");
const _createviewfilterpermissionguard = require("../../view-permissions/guards/create-view-filter-permission.guard");
const _deleteviewfilterpermissionguard = require("../../view-permissions/guards/delete-view-filter-permission.guard");
const _destroyviewfilterpermissionguard = require("../../view-permissions/guards/destroy-view-filter-permission.guard");
const _updateviewfilterpermissionguard = require("../../view-permissions/guards/update-view-filter-permission.guard");
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
let ViewFilterResolver = class ViewFilterResolver {
    async getViewFilters(workspace, viewId) {
        if (viewId) {
            return this.viewFilterService.findByViewId(workspace.id, viewId);
        }
        return this.viewFilterService.findByWorkspaceId(workspace.id);
    }
    async getViewFilter(id, workspace) {
        return this.viewFilterService.findById(id, workspace.id);
    }
    async createViewFilter(createViewFilterInput, { id: workspaceId }) {
        return await this.viewFilterService.createOne({
            createViewFilterInput,
            workspaceId
        });
    }
    async updateViewFilter(updateViewFilterInput, { id: workspaceId }) {
        return this.viewFilterService.updateOne({
            updateViewFilterInput,
            workspaceId
        });
    }
    async deleteViewFilter(deleteViewFilterInput, { id: workspaceId }) {
        return this.viewFilterService.deleteOne({
            deleteViewFilterInput,
            workspaceId
        });
    }
    async destroyViewFilter(destroyViewFilterInput, { id: workspaceId }) {
        return this.viewFilterService.destroyOne({
            destroyViewFilterInput,
            workspaceId
        });
    }
    constructor(viewFilterService){
        this.viewFilterService = viewFilterService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _viewfilterdto.ViewFilterDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('viewId', {
        type: ()=>String,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterResolver.prototype, "getViewFilters", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_viewfilterdto.ViewFilterDTO, {
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
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterResolver.prototype, "getViewFilter", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfilterdto.ViewFilterDTO),
    (0, _common.UseGuards)(_createviewfilterpermissionguard.CreateViewFilterPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewfilterinput.CreateViewFilterInput === "undefined" ? Object : _createviewfilterinput.CreateViewFilterInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterResolver.prototype, "createViewFilter", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfilterdto.ViewFilterDTO),
    (0, _common.UseGuards)(_updateviewfilterpermissionguard.UpdateViewFilterPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateviewfilterinput.UpdateViewFilterInput === "undefined" ? Object : _updateviewfilterinput.UpdateViewFilterInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterResolver.prototype, "updateViewFilter", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfilterdto.ViewFilterDTO),
    (0, _common.UseGuards)(_deleteviewfilterpermissionguard.DeleteViewFilterPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteviewfilterinput.DeleteViewFilterInput === "undefined" ? Object : _deleteviewfilterinput.DeleteViewFilterInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterResolver.prototype, "deleteViewFilter", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfilterdto.ViewFilterDTO),
    (0, _common.UseGuards)(_destroyviewfilterpermissionguard.DestroyViewFilterPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _destroyviewfilterinput.DestroyViewFilterInput === "undefined" ? Object : _destroyviewfilterinput.DestroyViewFilterInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterResolver.prototype, "destroyViewFilter", null);
ViewFilterResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_viewfilterdto.ViewFilterDTO),
    (0, _common.UseFilters)(_viewgraphqlapiexceptionfilter.ViewGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfilterservice.ViewFilterService === "undefined" ? Object : _viewfilterservice.ViewFilterService
    ])
], ViewFilterResolver);

//# sourceMappingURL=view-filter.resolver.js.map