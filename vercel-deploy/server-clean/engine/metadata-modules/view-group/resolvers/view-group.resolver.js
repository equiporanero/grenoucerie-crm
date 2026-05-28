"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewGroupResolver", {
    enumerable: true,
    get: function() {
        return ViewGroupResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createviewgroupinput = require("../dtos/inputs/create-view-group.input");
const _deleteviewgroupinput = require("../dtos/inputs/delete-view-group.input");
const _destroyviewgroupinput = require("../dtos/inputs/destroy-view-group.input");
const _updateviewgroupinput = require("../dtos/inputs/update-view-group.input");
const _viewgroupdto = require("../dtos/view-group.dto");
const _viewgroupservice = require("../services/view-group.service");
const _viewgroupgraphqlapiexceptionfilter = require("../utils/view-group-graphql-api-exception.filter");
const _createviewgrouppermissionguard = require("../../view-permissions/guards/create-view-group-permission.guard");
const _deleteviewgrouppermissionguard = require("../../view-permissions/guards/delete-view-group-permission.guard");
const _destroyviewgrouppermissionguard = require("../../view-permissions/guards/destroy-view-group-permission.guard");
const _updateviewgrouppermissionguard = require("../../view-permissions/guards/update-view-group-permission.guard");
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
let ViewGroupResolver = class ViewGroupResolver {
    async getViewGroups(workspace, viewId) {
        if (viewId) {
            return this.viewGroupService.findByViewId(workspace.id, viewId);
        }
        return this.viewGroupService.findByWorkspaceId(workspace.id);
    }
    async getViewGroup(id, workspace) {
        return this.viewGroupService.findById(id, workspace.id);
    }
    async createViewGroup(createViewGroupInput, { id: workspaceId }) {
        return await this.viewGroupService.createOne({
            createViewGroupInput,
            workspaceId
        });
    }
    async createManyViewGroups(createViewGroupInputs, { id: workspaceId }) {
        return await this.viewGroupService.createMany({
            createViewGroupInputs,
            workspaceId
        });
    }
    async updateViewGroup(updateViewGroupInput, { id: workspaceId }) {
        return await this.viewGroupService.updateOne({
            updateViewGroupInput,
            workspaceId
        });
    }
    async updateManyViewGroups(updateViewGroupInputs, { id: workspaceId }) {
        return await this.viewGroupService.updateMany({
            updateViewGroupInputs,
            workspaceId
        });
    }
    async deleteViewGroup(deleteViewGroupInput, { id: workspaceId }) {
        return await this.viewGroupService.deleteOne({
            deleteViewGroupInput,
            workspaceId
        });
    }
    async destroyViewGroup(destroyViewGroupInput, { id: workspaceId }) {
        return await this.viewGroupService.destroyOne({
            destroyViewGroupInput,
            workspaceId
        });
    }
    constructor(viewGroupService){
        this.viewGroupService = viewGroupService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _viewgroupdto.ViewGroupDTO
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
], ViewGroupResolver.prototype, "getViewGroups", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_viewgroupdto.ViewGroupDTO, {
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
], ViewGroupResolver.prototype, "getViewGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewgroupdto.ViewGroupDTO),
    (0, _common.UseGuards)(_createviewgrouppermissionguard.CreateViewGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewgroupinput.CreateViewGroupInput === "undefined" ? Object : _createviewgroupinput.CreateViewGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupResolver.prototype, "createViewGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _viewgroupdto.ViewGroupDTO
        ]),
    (0, _common.UseGuards)(_createviewgrouppermissionguard.CreateViewGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('inputs', {
        type: ()=>[
                _createviewgroupinput.CreateViewGroupInput
            ]
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupResolver.prototype, "createManyViewGroups", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewgroupdto.ViewGroupDTO),
    (0, _common.UseGuards)(_updateviewgrouppermissionguard.UpdateViewGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateviewgroupinput.UpdateViewGroupInput === "undefined" ? Object : _updateviewgroupinput.UpdateViewGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupResolver.prototype, "updateViewGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _viewgroupdto.ViewGroupDTO
        ]),
    (0, _common.UseGuards)(_updateviewgrouppermissionguard.UpdateViewGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('inputs', {
        type: ()=>[
                _updateviewgroupinput.UpdateViewGroupInput
            ]
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupResolver.prototype, "updateManyViewGroups", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewgroupdto.ViewGroupDTO),
    (0, _common.UseGuards)(_deleteviewgrouppermissionguard.DeleteViewGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteviewgroupinput.DeleteViewGroupInput === "undefined" ? Object : _deleteviewgroupinput.DeleteViewGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupResolver.prototype, "deleteViewGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewgroupdto.ViewGroupDTO),
    (0, _common.UseGuards)(_destroyviewgrouppermissionguard.DestroyViewGroupPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _destroyviewgroupinput.DestroyViewGroupInput === "undefined" ? Object : _destroyviewgroupinput.DestroyViewGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewGroupResolver.prototype, "destroyViewGroup", null);
ViewGroupResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_viewgroupdto.ViewGroupDTO),
    (0, _common.UseFilters)(_viewgroupgraphqlapiexceptionfilter.ViewGroupGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewgroupservice.ViewGroupService === "undefined" ? Object : _viewgroupservice.ViewGroupService
    ])
], ViewGroupResolver);

//# sourceMappingURL=view-group.resolver.js.map