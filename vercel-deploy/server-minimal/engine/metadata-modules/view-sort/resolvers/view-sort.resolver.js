"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewSortResolver", {
    enumerable: true,
    get: function() {
        return ViewSortResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createviewsortpermissionguard = require("../../view-permissions/guards/create-view-sort-permission.guard");
const _deleteviewsortpermissionguard = require("../../view-permissions/guards/delete-view-sort-permission.guard");
const _destroyviewsortpermissionguard = require("../../view-permissions/guards/destroy-view-sort-permission.guard");
const _updateviewsortpermissionguard = require("../../view-permissions/guards/update-view-sort-permission.guard");
const _createviewsortinput = require("../dtos/inputs/create-view-sort.input");
const _updateviewsortinput = require("../dtos/inputs/update-view-sort.input");
const _viewsortdto = require("../dtos/view-sort.dto");
const _viewsortservice = require("../services/view-sort.service");
const _viewgraphqlapiexceptionfilter = require("../../view/utils/view-graphql-api-exception.filter");
const _deleteviewsortinput = require("../dtos/inputs/delete-view-sort.input");
const _destroyviewsortinput = require("../dtos/inputs/destroy-view-sort.input");
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
let ViewSortResolver = class ViewSortResolver {
    async getViewSorts(workspace, viewId) {
        if (viewId) {
            return this.viewSortService.findByViewId(workspace.id, viewId);
        }
        return this.viewSortService.findByWorkspaceId(workspace.id);
    }
    async getViewSort(id, { id: workspaceId }) {
        return this.viewSortService.findById(id, workspaceId);
    }
    async createViewSort(createViewSortInput, { id: workspaceId }) {
        return this.viewSortService.createOne({
            createViewSortInput,
            workspaceId
        });
    }
    async updateViewSort(updateViewSortInput, { id: workspaceId }) {
        return this.viewSortService.updateOne({
            updateViewSortInput,
            workspaceId
        });
    }
    async deleteViewSort(deleteViewSortInput, { id: workspaceId }) {
        const deletedViewSort = await this.viewSortService.deleteOne({
            deleteViewSortInput,
            workspaceId
        });
        return (0, _classvalidator.isDefined)(deletedViewSort);
    }
    async destroyViewSort(destroyViewSortInput, { id: workspaceId }) {
        const destroyedViewSort = await this.viewSortService.destroyOne({
            destroyViewSortInput,
            workspaceId
        });
        return (0, _classvalidator.isDefined)(destroyedViewSort);
    }
    constructor(viewSortService){
        this.viewSortService = viewSortService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _viewsortdto.ViewSortDTO
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
], ViewSortResolver.prototype, "getViewSorts", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_viewsortdto.ViewSortDTO, {
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
], ViewSortResolver.prototype, "getViewSort", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewsortdto.ViewSortDTO),
    (0, _common.UseGuards)(_createviewsortpermissionguard.CreateViewSortPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewsortinput.CreateViewSortInput === "undefined" ? Object : _createviewsortinput.CreateViewSortInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewSortResolver.prototype, "createViewSort", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewsortdto.ViewSortDTO),
    (0, _common.UseGuards)(_updateviewsortpermissionguard.UpdateViewSortPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateviewsortinput.UpdateViewSortInput === "undefined" ? Object : _updateviewsortinput.UpdateViewSortInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewSortResolver.prototype, "updateViewSort", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_deleteviewsortpermissionguard.DeleteViewSortPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteviewsortinput.DeleteViewSortInput === "undefined" ? Object : _deleteviewsortinput.DeleteViewSortInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewSortResolver.prototype, "deleteViewSort", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_destroyviewsortpermissionguard.DestroyViewSortPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _destroyviewsortinput.DestroyViewSortInput === "undefined" ? Object : _destroyviewsortinput.DestroyViewSortInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewSortResolver.prototype, "destroyViewSort", null);
ViewSortResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_viewsortdto.ViewSortDTO),
    (0, _common.UseFilters)(_viewgraphqlapiexceptionfilter.ViewGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewsortservice.ViewSortService === "undefined" ? Object : _viewsortservice.ViewSortService
    ])
], ViewSortResolver);

//# sourceMappingURL=view-sort.resolver.js.map