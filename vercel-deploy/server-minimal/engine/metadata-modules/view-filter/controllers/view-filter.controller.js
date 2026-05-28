"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterController", {
    enumerable: true,
    get: function() {
        return ViewFilterController;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _flatentitymapsrestapiexceptionfilter = require("../../flat-entity/filters/flat-entity-maps-rest-api-exception.filter");
const _permissionsrestapiexceptionfilter = require("../../permissions/utils/permissions-rest-api-exception.filter");
const _createviewfilterinput = require("../dtos/inputs/create-view-filter.input");
const _updateviewfilterinput = require("../dtos/inputs/update-view-filter.input");
const _viewfilterexception = require("../exceptions/view-filter.exception");
const _viewfilterrestapiexceptionfilter = require("../filters/view-filter-rest-api-exception.filter");
const _viewfilterservice = require("../services/view-filter.service");
const _createviewfilterpermissionguard = require("../../view-permissions/guards/create-view-filter-permission.guard");
const _deleteviewfilterpermissionguard = require("../../view-permissions/guards/delete-view-filter-permission.guard");
const _updateviewfilterpermissionguard = require("../../view-permissions/guards/update-view-filter-permission.guard");
const _workspacemigrationrunnerrestapiexceptionfilter = require("../../../workspace-manager/workspace-migration/filters/workspace-migration-runner-rest-api-exception.filter");
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
let ViewFilterController = class ViewFilterController {
    async findMany(workspace, viewId) {
        if (viewId) {
            return this.viewFilterService.findByViewId(workspace.id, viewId);
        }
        return this.viewFilterService.findByWorkspaceId(workspace.id);
    }
    async findOne(id, workspace) {
        const viewFilter = await this.viewFilterService.findById(id, workspace.id);
        if (!(0, _utils.isDefined)(viewFilter)) {
            throw new _viewfilterexception.ViewFilterException((0, _viewfilterexception.generateViewFilterExceptionMessage)(_viewfilterexception.ViewFilterExceptionMessageKey.VIEW_FILTER_NOT_FOUND, id), _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND, {
                userFriendlyMessage: (0, _viewfilterexception.generateViewFilterUserFriendlyExceptionMessage)(_viewfilterexception.ViewFilterExceptionMessageKey.VIEW_FILTER_NOT_FOUND)
            });
        }
        return viewFilter;
    }
    async create(input, workspace) {
        return await this.viewFilterService.createOne({
            createViewFilterInput: input,
            workspaceId: workspace.id
        });
    }
    async update(id, input, workspace) {
        const updateInput = {
            id,
            update: input.update ?? input
        };
        return await this.viewFilterService.updateOne({
            updateViewFilterInput: updateInput,
            workspaceId: workspace.id
        });
    }
    async delete(id, workspace) {
        const deletedViewFilter = await this.viewFilterService.deleteOne({
            deleteViewFilterInput: {
                id
            },
            workspaceId: workspace.id
        });
        return {
            success: (0, _utils.isDefined)(deletedViewFilter)
        };
    }
    constructor(viewFilterService){
        this.viewFilterService = viewFilterService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _common.Query)('viewId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterController.prototype, "findMany", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_createviewfilterpermissionguard.CreateViewFilterPermissionGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewfilterinput.CreateViewFilterInput === "undefined" ? Object : _createviewfilterinput.CreateViewFilterInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseGuards)(_updateviewfilterpermissionguard.UpdateViewFilterPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateviewfilterinput.UpdateViewFilterInput === "undefined" ? Object : _updateviewfilterinput.UpdateViewFilterInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)(_deleteviewfilterpermissionguard.DeleteViewFilterPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFilterController.prototype, "delete", null);
ViewFilterController = _ts_decorate([
    (0, _common.Controller)('rest/metadata/viewFilters'),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _viewfilterrestapiexceptionfilter.ViewFilterRestApiExceptionFilter, _flatentitymapsrestapiexceptionfilter.FlatEntityMapsRestApiExceptionFilter, _workspacemigrationrunnerrestapiexceptionfilter.WorkspaceMigrationRunnerRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfilterservice.ViewFilterService === "undefined" ? Object : _viewfilterservice.ViewFilterService
    ])
], ViewFilterController);

//# sourceMappingURL=view-filter.controller.js.map