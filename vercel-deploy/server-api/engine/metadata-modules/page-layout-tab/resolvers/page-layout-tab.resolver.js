"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutTabResolver", {
    enumerable: true,
    get: function() {
        return PageLayoutTabResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationservice = require("../../../core-modules/application/application.service");
const _resolvervalidationpipe = require("../../../core-modules/graphql/pipes/resolver-validation.pipe");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createpagelayouttabinput = require("../dtos/inputs/create-page-layout-tab.input");
const _updatepagelayouttabinput = require("../dtos/inputs/update-page-layout-tab.input");
const _pagelayouttabdto = require("../dtos/page-layout-tab.dto");
const _pagelayouttabservice = require("../services/page-layout-tab.service");
const _resolvepagelayouttabtitleutil = require("../utils/resolve-page-layout-tab-title.util");
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
let PageLayoutTabResolver = class PageLayoutTabResolver {
    async title(tab, context, workspace) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspace
        });
        return (0, _resolvepagelayouttabtitleutil.resolvePageLayoutTabTitle)({
            title: tab.title,
            applicationId: tab.applicationId,
            twentyStandardApplicationId: twentyStandardFlatApplication.id,
            overrides: tab.overrides,
            i18nInstance: i18n
        });
    }
    async getPageLayoutTabs(workspace, pageLayoutId) {
        return this.pageLayoutTabService.findByPageLayoutId({
            workspaceId: workspace.id,
            pageLayoutId
        });
    }
    async getPageLayoutTab(id, workspace) {
        return this.pageLayoutTabService.findByIdOrThrow({
            id,
            workspaceId: workspace.id
        });
    }
    async createPageLayoutTab(input, workspace) {
        return this.pageLayoutTabService.create({
            createPageLayoutTabInput: input,
            workspaceId: workspace.id
        });
    }
    async updatePageLayoutTab(id, input, workspace) {
        return this.pageLayoutTabService.update({
            id,
            workspaceId: workspace.id,
            updateData: input
        });
    }
    async destroyPageLayoutTab(id, workspace) {
        return this.pageLayoutTabService.destroy({
            id,
            workspaceId: workspace.id
        });
    }
    constructor(pageLayoutTabService, i18nService, applicationService){
        this.pageLayoutTabService = pageLayoutTabService;
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
        typeof _pagelayouttabdto.PageLayoutTabDTO === "undefined" ? Object : _pagelayouttabdto.PageLayoutTabDTO,
        typeof I18nContext === "undefined" ? Object : I18nContext,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutTabResolver.prototype, "title", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _pagelayouttabdto.PageLayoutTabDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('pageLayoutId', {
        type: ()=>String
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutTabResolver.prototype, "getPageLayoutTabs", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_pagelayouttabdto.PageLayoutTabDTO),
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
], PageLayoutTabResolver.prototype, "getPageLayoutTab", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayouttabdto.PageLayoutTabDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpagelayouttabinput.CreatePageLayoutTabInput === "undefined" ? Object : _createpagelayouttabinput.CreatePageLayoutTabInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutTabResolver.prototype, "createPageLayoutTab", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayouttabdto.PageLayoutTabDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepagelayouttabinput.UpdatePageLayoutTabInput === "undefined" ? Object : _updatepagelayouttabinput.UpdatePageLayoutTabInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutTabResolver.prototype, "updatePageLayoutTab", null);
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
], PageLayoutTabResolver.prototype, "destroyPageLayoutTab", null);
PageLayoutTabResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_pagelayouttabdto.PageLayoutTabDTO),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor),
    (0, _common.UseFilters)(_pagelayoutgraphqlapiexceptionfilter.PageLayoutGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayouttabservice.PageLayoutTabService === "undefined" ? Object : _pagelayouttabservice.PageLayoutTabService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], PageLayoutTabResolver);

//# sourceMappingURL=page-layout-tab.resolver.js.map