"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetResolver", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _applicationservice = require("../../../core-modules/application/application.service");
const _resolvervalidationpipe = require("../../../core-modules/graphql/pipes/resolver-validation.pipe");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createpagelayoutwidgetinput = require("../dtos/inputs/create-page-layout-widget.input");
const _updatepagelayoutwidgetinput = require("../dtos/inputs/update-page-layout-widget.input");
const _pagelayoutwidgetdto = require("../dtos/page-layout-widget.dto");
const _widgetconfigurationinterface = require("../dtos/widget-configuration.interface");
const _pagelayoutwidgetservice = require("../services/page-layout-widget.service");
const _resolvepagelayoutwidgettitleutil = require("../utils/resolve-page-layout-widget-title.util");
const _pagelayoutgraphqlapiexceptionfilter = require("../../page-layout/utils/page-layout-graphql-api-exception.filter");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
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
let PageLayoutWidgetResolver = class PageLayoutWidgetResolver {
    async title(widget, context, workspace) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspace
        });
        return (0, _resolvepagelayoutwidgettitleutil.resolvePageLayoutWidgetTitle)({
            title: widget.title,
            applicationId: widget.applicationId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id,
            overrides: widget.overrides,
            i18nInstance: i18n
        });
    }
    async getPageLayoutWidgets(workspace, pageLayoutTabId) {
        return this.pageLayoutWidgetService.findByPageLayoutTabId({
            workspaceId: workspace.id,
            pageLayoutTabId
        });
    }
    async getPageLayoutWidget(id, workspace) {
        return this.pageLayoutWidgetService.findByIdOrThrow({
            id,
            workspaceId: workspace.id
        });
    }
    async createPageLayoutWidget(input, workspace) {
        return this.pageLayoutWidgetService.create({
            input,
            workspaceId: workspace.id
        });
    }
    async updatePageLayoutWidget(id, input, workspace) {
        return this.pageLayoutWidgetService.update({
            id,
            workspaceId: workspace.id,
            updateData: input
        });
    }
    async destroyPageLayoutWidget(id, workspace) {
        return this.pageLayoutWidgetService.destroy({
            id,
            workspaceId: workspace.id
        });
    }
    configuration(widget) {
        return widget.configuration;
    }
    constructor(pageLayoutWidgetService, i18nService, applicationService){
        this.pageLayoutWidgetService = pageLayoutWidgetService;
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
        typeof _pagelayoutwidgetdto.PageLayoutWidgetDTO === "undefined" ? Object : _pagelayoutwidgetdto.PageLayoutWidgetDTO,
        typeof I18nContext === "undefined" ? Object : I18nContext,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetResolver.prototype, "title", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _pagelayoutwidgetdto.PageLayoutWidgetDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('pageLayoutTabId', {
        type: ()=>String
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetResolver.prototype, "getPageLayoutWidgets", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_pagelayoutwidgetdto.PageLayoutWidgetDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetResolver.prototype, "getPageLayoutWidget", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayoutwidgetdto.PageLayoutWidgetDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpagelayoutwidgetinput.CreatePageLayoutWidgetInput === "undefined" ? Object : _createpagelayoutwidgetinput.CreatePageLayoutWidgetInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetResolver.prototype, "createPageLayoutWidget", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayoutwidgetdto.PageLayoutWidgetDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepagelayoutwidgetinput.UpdatePageLayoutWidgetInput === "undefined" ? Object : _updatepagelayoutwidgetinput.UpdatePageLayoutWidgetInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetResolver.prototype, "updatePageLayoutWidget", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetResolver.prototype, "destroyPageLayoutWidget", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_widgetconfigurationinterface.WidgetConfiguration, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayoutwidgetdto.PageLayoutWidgetDTO === "undefined" ? Object : _pagelayoutwidgetdto.PageLayoutWidgetDTO
    ]),
    _ts_metadata("design:returntype", void 0)
], PageLayoutWidgetResolver.prototype, "configuration", null);
PageLayoutWidgetResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_pagelayoutwidgetdto.PageLayoutWidgetDTO),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor),
    (0, _common.UseFilters)(_pagelayoutgraphqlapiexceptionfilter.PageLayoutGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayoutwidgetservice.PageLayoutWidgetService === "undefined" ? Object : _pagelayoutwidgetservice.PageLayoutWidgetService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], PageLayoutWidgetResolver);

//# sourceMappingURL=page-layout-widget.resolver.js.map