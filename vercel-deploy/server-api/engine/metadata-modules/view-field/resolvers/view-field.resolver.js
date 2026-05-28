"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldResolver", {
    enumerable: true,
    get: function() {
        return ViewFieldResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createviewfieldinput = require("../dtos/inputs/create-view-field.input");
const _deleteviewfieldinput = require("../dtos/inputs/delete-view-field.input");
const _destroyviewfieldinput = require("../dtos/inputs/destroy-view-field.input");
const _updateviewfieldinput = require("../dtos/inputs/update-view-field.input");
const _viewfielddto = require("../dtos/view-field.dto");
const _viewfieldservice = require("../services/view-field.service");
const _createviewfieldpermissionguard = require("../../view-permissions/guards/create-view-field-permission.guard");
const _deleteviewfieldpermissionguard = require("../../view-permissions/guards/delete-view-field-permission.guard");
const _destroyviewfieldpermissionguard = require("../../view-permissions/guards/destroy-view-field-permission.guard");
const _updateviewfieldpermissionguard = require("../../view-permissions/guards/update-view-field-permission.guard");
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
let ViewFieldResolver = class ViewFieldResolver {
    async getViewFields(viewId, workspace) {
        return this.viewFieldService.findByViewId(workspace.id, viewId);
    }
    async getViewField(id, workspace) {
        return this.viewFieldService.findById(id, workspace.id);
    }
    async updateViewField(updateViewFieldInput, { id: workspaceId }) {
        return await this.viewFieldService.updateOne({
            updateViewFieldInput,
            workspaceId
        });
    }
    async createViewField(createViewFieldInput, { id: workspaceId }) {
        return await this.viewFieldService.createOne({
            createViewFieldInput,
            workspaceId
        });
    }
    async createManyViewFields(createViewFieldInputs, { id: workspaceId }) {
        return await this.viewFieldService.createMany({
            createViewFieldInputs,
            workspaceId
        });
    }
    async deleteViewField(deleteViewFieldInput, { id: workspaceId }) {
        return await this.viewFieldService.deleteOne({
            deleteViewFieldInput,
            workspaceId
        });
    }
    async destroyViewField(destroyViewFieldInput, { id: workspaceId }) {
        return await this.viewFieldService.destroyOne({
            destroyViewFieldInput,
            workspaceId
        });
    }
    constructor(viewFieldService){
        this.viewFieldService = viewFieldService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _viewfielddto.ViewFieldDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('viewId', {
        type: ()=>String
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldResolver.prototype, "getViewFields", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_viewfielddto.ViewFieldDTO, {
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
], ViewFieldResolver.prototype, "getViewField", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfielddto.ViewFieldDTO),
    (0, _common.UseGuards)(_updateviewfieldpermissionguard.UpdateViewFieldPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateviewfieldinput.UpdateViewFieldInput === "undefined" ? Object : _updateviewfieldinput.UpdateViewFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldResolver.prototype, "updateViewField", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfielddto.ViewFieldDTO),
    (0, _common.UseGuards)(_createviewfieldpermissionguard.CreateViewFieldPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewfieldinput.CreateViewFieldInput === "undefined" ? Object : _createviewfieldinput.CreateViewFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldResolver.prototype, "createViewField", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _viewfielddto.ViewFieldDTO
        ]),
    (0, _common.UseGuards)(_createviewfieldpermissionguard.CreateViewFieldPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('inputs', {
        type: ()=>[
                _createviewfieldinput.CreateViewFieldInput
            ]
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldResolver.prototype, "createManyViewFields", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfielddto.ViewFieldDTO),
    (0, _common.UseGuards)(_deleteviewfieldpermissionguard.DeleteViewFieldPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteviewfieldinput.DeleteViewFieldInput === "undefined" ? Object : _deleteviewfieldinput.DeleteViewFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldResolver.prototype, "deleteViewField", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfielddto.ViewFieldDTO),
    (0, _common.UseGuards)(_destroyviewfieldpermissionguard.DestroyViewFieldPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _destroyviewfieldinput.DestroyViewFieldInput === "undefined" ? Object : _destroyviewfieldinput.DestroyViewFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldResolver.prototype, "destroyViewField", null);
ViewFieldResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_viewfielddto.ViewFieldDTO),
    (0, _common.UseFilters)(_viewgraphqlapiexceptionfilter.ViewGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfieldservice.ViewFieldService === "undefined" ? Object : _viewfieldservice.ViewFieldService
    ])
], ViewFieldResolver);

//# sourceMappingURL=view-field.resolver.js.map