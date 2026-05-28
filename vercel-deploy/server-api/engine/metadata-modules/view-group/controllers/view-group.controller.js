"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewGroupController", {
    enumerable: true,
    get: function() {
        return ViewGroupController;
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
const _createviewgroupinput = require("../dtos/inputs/create-view-group.input");
const _updateviewgroupinput = require("../dtos/inputs/update-view-group.input");
const _viewgroupexception = require("../exceptions/view-group.exception");
const _viewgrouprestapiexceptionfilter = require("../filters/view-group-rest-api-exception.filter");
const _viewgroupservice = require("../services/view-group.service");
const _createviewgrouppermissionguard = require("../../view-permissions/guards/create-view-group-permission.guard");
const _deleteviewgrouppermissionguard = require("../../view-permissions/guards/delete-view-group-permission.guard");
const _updateviewgrouppermissionguard = require("../../view-permissions/guards/update-view-group-permission.guard");
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
let ViewGroupController = class ViewGroupController {
    async findMany(workspace, viewId) {
        if (viewId) {
            return this.viewGroupService.findByViewId(workspace.id, viewId);
        }
        return this.viewGroupService.findByWorkspaceId(workspace.id);
    }
    async findOne(id, workspace) {
        const viewGroup = await this.viewGroupService.findById(id, workspace.id);
        if (!(0, _utils.isDefined)(viewGroup)) {
            throw new _viewgroupexception.ViewGroupException((0, _viewgroupexception.generateViewGroupExceptionMessage)(_viewgroupexception.ViewGroupExceptionMessageKey.VIEW_GROUP_NOT_FOUND, id), _viewgroupexception.ViewGroupExceptionCode.VIEW_GROUP_NOT_FOUND, {
                userFriendlyMessage: (0, _viewgroupexception.generateViewGroupUserFriendlyExceptionMessage)(_viewgroupexception.ViewGroupExceptionMessageKey.VIEW_GROUP_NOT_FOUND)
            });
        }
        return viewGroup;
    }
    async create(input, workspace) {
        return await this.viewGroupService.createOne({
            createViewGroupInput: input,
            workspaceId: workspace.id
        });
    }
    async update(id, input, workspace) {
        const updateInput = {
            id,
            update: input.update ?? input
        };
        return await this.viewGroupService.updateOne({
            updateViewGroupInput: updateInput,
            workspaceId: workspace.id
        });
    }
    async delete(id, workspace) {
        const deletedViewGroup = await this.viewGroupService.deleteOne({
            deleteViewGroupInput: {
                id
            },
            workspaceId: workspace.id
        });
        return {
            success: (0, _utils.isDefined)(deletedViewGroup)
        };
    }
    constructor(viewGroupService){
        this.viewGroupService = viewGroupService;
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
], ViewGroupController.prototype, "findMany", null);
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
], ViewGroupController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_createviewgrouppermissionguard.CreateViewGroupPermissionGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewgroupinput.CreateViewGroupInput === "undefined" ? Object : _createviewgroupinput.CreateViewGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseGuards)(_updateviewgrouppermissionguard.UpdateViewGroupPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateviewgroupinput.UpdateViewGroupInput === "undefined" ? Object : _updateviewgroupinput.UpdateViewGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)(_deleteviewgrouppermissionguard.DeleteViewGroupPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupController.prototype, "delete", null);
ViewGroupController = _ts_decorate([
    (0, _common.Controller)('rest/metadata/viewGroups'),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _viewgrouprestapiexceptionfilter.ViewGroupRestApiExceptionFilter, _flatentitymapsrestapiexceptionfilter.FlatEntityMapsRestApiExceptionFilter, _workspacemigrationrunnerrestapiexceptionfilter.WorkspaceMigrationRunnerRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewgroupservice.ViewGroupService === "undefined" ? Object : _viewgroupservice.ViewGroupService
    ])
], ViewGroupController);

//# sourceMappingURL=view-group.controller.js.map