"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewController", {
    enumerable: true,
    get: function() {
        return ViewController;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _requestlocaledecorator = require("../../../decorators/locale/request-locale.decorator");
const _custompermissionguard = require("../../../guards/custom-permission.guard");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveobjectmetadatastandardoverrideutil = require("../../object-metadata/utils/resolve-object-metadata-standard-override.util");
const _createviewpermissionguard = require("../../view-permissions/guards/create-view-permission.guard");
const _deleteviewpermissionguard = require("../../view-permissions/guards/delete-view-permission.guard");
const _updateviewpermissionguard = require("../../view-permissions/guards/update-view-permission.guard");
const _createviewinput = require("../dtos/inputs/create-view.input");
const _updateviewinput = require("../dtos/inputs/update-view.input");
const _viewexception = require("../exceptions/view.exception");
const _viewrestapiexceptionfilter = require("../filters/view-rest-api-exception.filter");
const _viewservice = require("../services/view.service");
const _flatentitymapsrestapiexceptionfilter = require("../../flat-entity/filters/flat-entity-maps-rest-api-exception.filter");
const _permissionsrestapiexceptionfilter = require("../../permissions/utils/permissions-rest-api-exception.filter");
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
let ViewController = class ViewController {
    async findMany(locale, workspace, userWorkspaceId, objectMetadataId) {
        const views = objectMetadataId ? await this.viewService.findByObjectMetadataIdWithRelations(workspace.id, objectMetadataId, userWorkspaceId) : await this.viewService.findByWorkspaceIdWithRelations(workspace.id, userWorkspaceId);
        return this.processViewsWithTemplates(views, workspace.id, locale);
    }
    async findOne(id, locale, workspace) {
        const view = await this.viewService.findByIdWithRelations(id, workspace.id);
        if (!(0, _utils.isDefined)(view)) {
            throw new _viewexception.ViewException((0, _viewexception.generateViewExceptionMessage)(_viewexception.ViewExceptionMessageKey.VIEW_NOT_FOUND, id), _viewexception.ViewExceptionCode.VIEW_NOT_FOUND, {
                userFriendlyMessage: (0, _viewexception.generateViewUserFriendlyExceptionMessage)(_viewexception.ViewExceptionMessageKey.VIEW_NOT_FOUND)
            });
        }
        const processedViews = await this.processViewsWithTemplates([
            view
        ], workspace.id, locale);
        return processedViews[0];
    }
    async create(input, workspace, locale) {
        const view = await this.viewService.createOne({
            createViewInput: input,
            workspaceId: workspace.id
        });
        const processedViews = await this.processViewsWithTemplates([
            view
        ], workspace.id, locale);
        return processedViews[0];
    }
    async update(id, input, locale, workspace, userWorkspaceId) {
        const updatedView = await this.viewService.updateOne({
            updateViewInput: {
                ...input,
                id
            },
            workspaceId: workspace.id,
            userWorkspaceId
        });
        const processedViews = await this.processViewsWithTemplates([
            updatedView
        ], workspace.id, locale);
        return processedViews[0];
    }
    async delete(id, workspace) {
        const deletedView = await this.viewService.deleteOne({
            deleteViewInput: {
                id
            },
            workspaceId: workspace.id
        });
        return {
            success: (0, _utils.isDefined)(deletedView)
        };
    }
    async processViewsWithTemplates(views, workspaceId, locale) {
        const hasTemplates = views.some((view)=>view.name.includes('{objectLabelPlural}'));
        if (!hasTemplates && views.every((view)=>view.isCustom)) {
            return views;
        }
        const { flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        return views.map((view)=>{
            let processedName = view.name;
            if (view.name.includes('{objectLabelPlural}')) {
                const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: view.objectMetadataId,
                    flatEntityMaps: flatObjectMetadataMaps
                });
                if (objectMetadata) {
                    const i18n = this.i18nService.getI18nInstance(locale ?? 'en');
                    const translatedObjectLabel = (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)({
                        labelPlural: objectMetadata.labelPlural,
                        labelSingular: objectMetadata.labelSingular,
                        description: objectMetadata.description ?? undefined,
                        icon: objectMetadata.icon ?? undefined,
                        isCustom: objectMetadata.isCustom,
                        standardOverrides: objectMetadata.standardOverrides ?? undefined
                    }, 'labelPlural', locale, i18n);
                    processedName = this.viewService.processViewNameWithTemplate(view.name, view.isCustom, translatedObjectLabel, locale);
                }
            } else {
                processedName = this.viewService.processViewNameWithTemplate(view.name, view.isCustom, undefined, locale);
            }
            return {
                ...view,
                name: processedName
            };
        });
    }
    constructor(viewService, flatEntityMapsCacheService, i18nService){
        this.viewService = viewService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.i18nService = i18nService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_custompermissionguard.CustomPermissionGuard),
    _ts_param(0, (0, _requestlocaledecorator.RequestLocale)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _common.Query)('objectMetadataId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewController.prototype, "findMany", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _requestlocaledecorator.RequestLocale)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)(_createviewpermissionguard.CreateViewPermissionGuard),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _requestlocaledecorator.RequestLocale)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createviewinput.CreateViewInput === "undefined" ? Object : _createviewinput.CreateViewInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseGuards)(_updateviewpermissionguard.UpdateViewPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _requestlocaledecorator.RequestLocale)()),
    _ts_param(3, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(4, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateviewinput.UpdateViewInput === "undefined" ? Object : _updateviewinput.UpdateViewInput,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)(_deleteviewpermissionguard.DeleteViewPermissionGuard),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewController.prototype, "delete", null);
ViewController = _ts_decorate([
    (0, _common.Controller)('rest/metadata/views'),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _viewrestapiexceptionfilter.ViewRestApiExceptionFilter, _flatentitymapsrestapiexceptionfilter.FlatEntityMapsRestApiExceptionFilter, _workspacemigrationrunnerrestapiexceptionfilter.WorkspaceMigrationRunnerRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], ViewController);

//# sourceMappingURL=view.controller.js.map