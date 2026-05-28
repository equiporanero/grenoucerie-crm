"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldController", {
    enumerable: true,
    get: function() {
        return ViewFieldController;
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
const _createviewfieldinput = require("../dtos/inputs/create-view-field.input");
const _viewfieldexception = require("../exceptions/view-field.exception");
const _viewfieldrestapiexceptionfilter = require("../filters/view-field-rest-api-exception.filter");
const _viewfieldservice = require("../services/view-field.service");
const _createviewfieldpermissionguard = require("../../view-permissions/guards/create-view-field-permission.guard");
const _deleteviewfieldpermissionguard = require("../../view-permissions/guards/delete-view-field-permission.guard");
const _updateviewfieldpermissionguard = require("../../view-permissions/guards/update-view-field-permission.guard");
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
let ViewFieldController = class ViewFieldController {
    async findMany(workspace, viewId) {
        if (viewId) {
            return this.viewFieldService.findByViewId(workspace.id, viewId);
        }
        return this.viewFieldService.findByWorkspaceId(workspace.id);
    }
    async findOne(id, workspace) {
        const viewField = await this.viewFieldService.findById(id, workspace.id);
        if (!(0, _utils.isDefined)(viewField)) {
            throw new _viewfieldexception.ViewFieldException((0, _viewfieldexception.generateViewFieldExceptionMessage)(_viewfieldexception.ViewFieldExceptionMessageKey.VIEW_FIELD_NOT_FOUND, id), _viewfieldexception.ViewFieldExceptionCode.VIEW_FIELD_NOT_FOUND, {
                userFriendlyMessage: (0, _viewfieldexception.generateViewFieldUserFriendlyExceptionMessage)(_viewfieldexception.ViewFieldExceptionMessageKey.VIEW_FIELD_NOT_FOUND)
            });
        }
        return viewField;
    }
    async update(id, input, workspace) {
        return await this.viewFieldService.updateOne({
            updateViewFieldInput: {
                id,
                update: input
            },
            workspaceId: workspace.id
        });
    }
    async create(input, workspace) {
        return await this.viewFieldService.createOne({
            createViewFieldInput: input,
            workspaceId: workspace.id
        });
    }
    async delete(id, workspace) {
        const deletedViewField = await this.viewFieldService.deleteOne({
            deleteViewFieldInput: {
                id
            },
            workspaceId: workspace.id
        });
        return {
            success: (0, _utils.isDefined)(deletedViewField)
        };
    }
    constructor(viewFieldService){
        this.viewFieldService = viewFieldService;
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
], ViewFieldController.prototype, "findMany", null);
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
], ViewFieldController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseGuards)(_updateviewfieldpermissionguard.UpdateViewFieldPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldController.prototype, "update", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_createviewfieldpermissionguard.CreateViewFieldPermissionGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewfieldinput.CreateViewFieldInput === "undefined" ? Object : _createviewfieldinput.CreateViewFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldController.prototype, "create", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)(_deleteviewfieldpermissionguard.DeleteViewFieldPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldController.prototype, "delete", null);
ViewFieldController = _ts_decorate([
    (0, _common.Controller)('rest/metadata/viewFields'),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _viewfieldrestapiexceptionfilter.ViewFieldRestApiExceptionFilter, _flatentitymapsrestapiexceptionfilter.FlatEntityMapsRestApiExceptionFilter, _workspacemigrationrunnerrestapiexceptionfilter.WorkspaceMigrationRunnerRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfieldservice.ViewFieldService === "undefined" ? Object : _viewfieldservice.ViewFieldService
    ])
], ViewFieldController);

//# sourceMappingURL=view-field.controller.js.map