"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldGroupResolver", {
    enumerable: true,
    get: function() {
        return ViewFieldGroupResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _guards = require("@sniptt/guards");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationservice = require("../../../core-modules/application/application.service");
const _resolvervalidationpipe = require("../../../core-modules/graphql/pipes/resolver-validation.pipe");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createviewfieldgroupinput = require("../dtos/inputs/create-view-field-group.input");
const _deleteviewfieldgroupinput = require("../dtos/inputs/delete-view-field-group.input");
const _destroyviewfieldgroupinput = require("../dtos/inputs/destroy-view-field-group.input");
const _updateviewfieldgroupinput = require("../dtos/inputs/update-view-field-group.input");
const _upsertfieldswidgetinput = require("../dtos/inputs/upsert-fields-widget.input");
const _viewfieldgroupdto = require("../dtos/view-field-group.dto");
const _fieldswidgetupsertservice = require("../services/fields-widget-upsert.service");
const _viewfieldgroupservice = require("../services/view-field-group.service");
const _resolveviewfieldgroupnameutil = require("../utils/resolve-view-field-group-name.util");
const _viewfielddto = require("../../view-field/dtos/view-field.dto");
const _viewdto = require("../../view/dtos/view.dto");
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
let ViewFieldGroupResolver = class ViewFieldGroupResolver {
    async name(viewFieldGroup, context, workspace) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspace
        });
        return (0, _resolveviewfieldgroupnameutil.resolveViewFieldGroupName)({
            name: viewFieldGroup.name,
            applicationId: viewFieldGroup.applicationId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id,
            overrides: viewFieldGroup.overrides,
            i18nInstance: i18n
        });
    }
    async getViewFieldGroups(viewId, workspace) {
        return this.viewFieldGroupService.findByViewId(workspace.id, viewId);
    }
    async getViewFieldGroup(id, workspace) {
        return this.viewFieldGroupService.findById(id, workspace.id);
    }
    async updateViewFieldGroup(updateViewFieldGroupInput, { id: workspaceId }) {
        return await this.viewFieldGroupService.updateOne({
            updateViewFieldGroupInput,
            workspaceId
        });
    }
    async createViewFieldGroup(createViewFieldGroupInput, { id: workspaceId }) {
        return await this.viewFieldGroupService.createOne({
            createViewFieldGroupInput,
            workspaceId
        });
    }
    async createManyViewFieldGroups(createViewFieldGroupInputs, { id: workspaceId }) {
        return await this.viewFieldGroupService.createMany({
            createViewFieldGroupInputs,
            workspaceId
        });
    }
    async deleteViewFieldGroup(deleteViewFieldGroupInput, { id: workspaceId }) {
        return await this.viewFieldGroupService.deleteOne({
            deleteViewFieldGroupInput,
            workspaceId
        });
    }
    async destroyViewFieldGroup(destroyViewFieldGroupInput, { id: workspaceId }) {
        return await this.viewFieldGroupService.destroyOne({
            destroyViewFieldGroupInput,
            workspaceId
        });
    }
    async upsertFieldsWidget(input, { id: workspaceId }) {
        return await this.fieldsWidgetUpsertService.upsertFieldsWidget({
            input,
            workspaceId
        });
    }
    async viewFields(viewFieldGroup, context, workspace) {
        if ((0, _guards.isArray)(viewFieldGroup.viewFields)) {
            return viewFieldGroup.viewFields;
        }
        return context.loaders.viewFieldsByViewFieldGroupIdLoader.load({
            workspaceId: workspace.id,
            viewFieldGroupId: viewFieldGroup.id
        });
    }
    constructor(viewFieldGroupService, fieldsWidgetUpsertService, i18nService, applicationService){
        this.viewFieldGroupService = viewFieldGroupService;
        this.fieldsWidgetUpsertService = fieldsWidgetUpsertService;
        this.i18nService = i18nService;
        this.applicationService = applicationService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfieldgroupdto.ViewFieldGroupDTO === "undefined" ? Object : _viewfieldgroupdto.ViewFieldGroupDTO,
        typeof I18nContext === "undefined" ? Object : I18nContext,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "name", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _viewfieldgroupdto.ViewFieldGroupDTO
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
], ViewFieldGroupResolver.prototype, "getViewFieldGroups", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_viewfieldgroupdto.ViewFieldGroupDTO, {
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
], ViewFieldGroupResolver.prototype, "getViewFieldGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfieldgroupdto.ViewFieldGroupDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateviewfieldgroupinput.UpdateViewFieldGroupInput === "undefined" ? Object : _updateviewfieldgroupinput.UpdateViewFieldGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "updateViewFieldGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfieldgroupdto.ViewFieldGroupDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewfieldgroupinput.CreateViewFieldGroupInput === "undefined" ? Object : _createviewfieldgroupinput.CreateViewFieldGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "createViewFieldGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _viewfieldgroupdto.ViewFieldGroupDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('inputs', {
        type: ()=>[
                _createviewfieldgroupinput.CreateViewFieldGroupInput
            ]
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "createManyViewFieldGroups", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfieldgroupdto.ViewFieldGroupDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteviewfieldgroupinput.DeleteViewFieldGroupInput === "undefined" ? Object : _deleteviewfieldgroupinput.DeleteViewFieldGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "deleteViewFieldGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewfieldgroupdto.ViewFieldGroupDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _destroyviewfieldgroupinput.DestroyViewFieldGroupInput === "undefined" ? Object : _destroyviewfieldgroupinput.DestroyViewFieldGroupInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "destroyViewFieldGroup", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewdto.ViewDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upsertfieldswidgetinput.UpsertFieldsWidgetInput === "undefined" ? Object : _upsertfieldswidgetinput.UpsertFieldsWidgetInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "upsertFieldsWidget", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewfielddto.ViewFieldDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfieldgroupdto.ViewFieldGroupDTO === "undefined" ? Object : _viewfieldgroupdto.ViewFieldGroupDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewFieldGroupResolver.prototype, "viewFields", null);
ViewFieldGroupResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_viewfieldgroupdto.ViewFieldGroupDTO),
    (0, _common.UseFilters)(_viewgraphqlapiexceptionfilter.ViewGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfieldgroupservice.ViewFieldGroupService === "undefined" ? Object : _viewfieldgroupservice.ViewFieldGroupService,
        typeof _fieldswidgetupsertservice.FieldsWidgetUpsertService === "undefined" ? Object : _fieldswidgetupsertservice.FieldsWidgetUpsertService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ViewFieldGroupResolver);

//# sourceMappingURL=view-field-group.resolver.js.map