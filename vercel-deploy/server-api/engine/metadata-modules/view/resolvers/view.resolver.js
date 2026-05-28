"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewResolver", {
    enumerable: true,
    get: function() {
        return ViewResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _resolvervalidationpipe = require("../../../core-modules/graphql/pipes/resolver-validation.pipe");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _custompermissionguard = require("../../../guards/custom-permission.guard");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _resolveobjectmetadatastandardoverrideutil = require("../../object-metadata/utils/resolve-object-metadata-standard-override.util");
const _viewfieldgroupdto = require("../../view-field-group/dtos/view-field-group.dto");
const _viewfielddto = require("../../view-field/dtos/view-field.dto");
const _viewfiltergroupdto = require("../../view-filter-group/dtos/view-filter-group.dto");
const _viewfilterdto = require("../../view-filter/dtos/view-filter.dto");
const _viewgroupdto = require("../../view-group/dtos/view-group.dto");
const _createviewpermissionguard = require("../../view-permissions/guards/create-view-permission.guard");
const _deleteviewpermissionguard = require("../../view-permissions/guards/delete-view-permission.guard");
const _destroyviewpermissionguard = require("../../view-permissions/guards/destroy-view-permission.guard");
const _updateviewpermissionguard = require("../../view-permissions/guards/update-view-permission.guard");
const _viewsortdto = require("../../view-sort/dtos/view-sort.dto");
const _createviewinput = require("../dtos/inputs/create-view.input");
const _updateviewinput = require("../dtos/inputs/update-view.input");
const _upsertviewwidgetinput = require("../dtos/inputs/upsert-view-widget.input");
const _viewdto = require("../dtos/view.dto");
const _viewwidgetupsertservice = require("../services/view-widget-upsert.service");
const _viewservice = require("../services/view.service");
const _viewgraphqlapiexceptionfilter = require("../utils/view-graphql-api-exception.filter");
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
let ViewResolver = class ViewResolver {
    async name(view, context, workspace) {
        if (view.name.includes('{objectLabelPlural}')) {
            const objectMetadata = await context.loaders.objectMetadataLoader.load({
                objectMetadataId: view.objectMetadataId,
                workspaceId: workspace.id
            });
            if ((0, _utils.isDefined)(objectMetadata)) {
                const i18n = this.i18nService.getI18nInstance(context.req.locale);
                const translatedObjectLabel = (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)({
                    labelPlural: objectMetadata.labelPlural,
                    labelSingular: objectMetadata.labelSingular,
                    description: objectMetadata.description ?? undefined,
                    icon: objectMetadata.icon ?? undefined,
                    isCustom: objectMetadata.isCustom,
                    standardOverrides: objectMetadata.standardOverrides ?? undefined
                }, 'labelPlural', context.req.locale, i18n);
                return this.viewService.processViewNameWithTemplate(view.name, view.isCustom, translatedObjectLabel, context.req.locale);
            }
        }
        return this.viewService.processViewNameWithTemplate(view.name, view.isCustom, undefined, context.req.locale);
    }
    async getViews(workspace, userWorkspaceId, objectMetadataId, viewTypes) {
        if (objectMetadataId) {
            return this.viewService.findByObjectMetadataId(workspace.id, objectMetadataId, userWorkspaceId, viewTypes);
        }
        return this.viewService.findByWorkspaceId(workspace.id, userWorkspaceId, viewTypes);
    }
    async getView(id, workspace) {
        const view = await this.viewService.findById(id, workspace.id);
        if (!view) {
            return null;
        }
        return view;
    }
    async createView(input, workspace, userWorkspaceId) {
        const visibility = input.visibility ?? _types.ViewVisibility.WORKSPACE;
        input.visibility = visibility;
        return await this.viewService.createOne({
            createViewInput: input,
            workspaceId: workspace.id,
            createdByUserWorkspaceId: userWorkspaceId
        });
    }
    async updateView(id, input, workspace, userWorkspaceId) {
        return await this.viewService.updateOne({
            updateViewInput: {
                ...input,
                id
            },
            workspaceId: workspace.id,
            userWorkspaceId
        });
    }
    async deleteView(id, workspace) {
        const deletedView = await this.viewService.deleteOne({
            deleteViewInput: {
                id
            },
            workspaceId: workspace.id
        });
        return (0, _utils.isDefined)(deletedView);
    }
    async destroyView(id, workspace) {
        const deletedView = await this.viewService.destroyOne({
            destroyViewInput: {
                id
            },
            workspaceId: workspace.id
        });
        return (0, _utils.isDefined)(deletedView);
    }
    async upsertViewWidget(input, { id: workspaceId }) {
        return await this.viewWidgetUpsertService.upsertViewWidget({
            input,
            workspaceId
        });
    }
    async viewFields(view, context, workspace) {
        return context.loaders.viewFieldsByViewIdLoader.load({
            workspaceId: workspace.id,
            viewId: view.id
        });
    }
    async viewFilters(view, context, workspace) {
        return context.loaders.viewFiltersByViewIdLoader.load({
            workspaceId: workspace.id,
            viewId: view.id
        });
    }
    async viewFilterGroups(view, context, workspace) {
        return context.loaders.viewFilterGroupsByViewIdLoader.load({
            workspaceId: workspace.id,
            viewId: view.id
        });
    }
    async viewSorts(view, context, workspace) {
        return context.loaders.viewSortsByViewIdLoader.load({
            workspaceId: workspace.id,
            viewId: view.id
        });
    }
    async viewGroups(view, context, workspace) {
        return context.loaders.viewGroupsByViewIdLoader.load({
            workspaceId: workspace.id,
            viewId: view.id
        });
    }
    async viewFieldGroups(view, context, workspace) {
        return context.loaders.viewFieldGroupsByViewIdLoader.load({
            workspaceId: workspace.id,
            viewId: view.id
        });
    }
    constructor(viewService, viewWidgetUpsertService, i18nService){
        this.viewService = viewService;
        this.viewWidgetUpsertService = viewWidgetUpsertService;
        this.i18nService = i18nService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewdto.ViewDTO === "undefined" ? Object : _viewdto.ViewDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "name", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _viewdto.ViewDTO
        ]),
    (0, _common.UseGuards)(_custompermissionguard.CustomPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(2, (0, _graphql.Args)('objectMetadataId', {
        type: ()=>String,
        nullable: true
    })),
    _ts_param(3, (0, _graphql.Args)('viewTypes', {
        type: ()=>[
                _types.ViewType
            ],
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        String,
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "getViews", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_viewdto.ViewDTO, {
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
], ViewResolver.prototype, "getView", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewdto.ViewDTO),
    (0, _common.UseGuards)(_createviewpermissionguard.CreateViewPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewinput.CreateViewInput === "undefined" ? Object : _createviewinput.CreateViewInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "createView", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewdto.ViewDTO),
    (0, _common.UseGuards)(_updateviewpermissionguard.UpdateViewPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(3, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateviewinput.UpdateViewInput === "undefined" ? Object : _updateviewinput.UpdateViewInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "updateView", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_deleteviewpermissionguard.DeleteViewPermissionGuard),
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
], ViewResolver.prototype, "deleteView", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_destroyviewpermissionguard.DestroyViewPermissionGuard),
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
], ViewResolver.prototype, "destroyView", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_viewdto.ViewDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upsertviewwidgetinput.UpsertViewWidgetInput === "undefined" ? Object : _upsertviewwidgetinput.UpsertViewWidgetInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "upsertViewWidget", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewfielddto.ViewFieldDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewdto.ViewDTO === "undefined" ? Object : _viewdto.ViewDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "viewFields", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewfilterdto.ViewFilterDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewdto.ViewDTO === "undefined" ? Object : _viewdto.ViewDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "viewFilters", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewfiltergroupdto.ViewFilterGroupDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewdto.ViewDTO === "undefined" ? Object : _viewdto.ViewDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "viewFilterGroups", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewsortdto.ViewSortDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewdto.ViewDTO === "undefined" ? Object : _viewdto.ViewDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "viewSorts", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewgroupdto.ViewGroupDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewdto.ViewDTO === "undefined" ? Object : _viewdto.ViewDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "viewGroups", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewfieldgroupdto.ViewFieldGroupDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewdto.ViewDTO === "undefined" ? Object : _viewdto.ViewDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewResolver.prototype, "viewFieldGroups", null);
ViewResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_viewdto.ViewDTO),
    (0, _common.UseFilters)(_viewgraphqlapiexceptionfilter.ViewGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _viewwidgetupsertservice.ViewWidgetUpsertService === "undefined" ? Object : _viewwidgetupsertservice.ViewWidgetUpsertService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], ViewResolver);

//# sourceMappingURL=view.resolver.js.map