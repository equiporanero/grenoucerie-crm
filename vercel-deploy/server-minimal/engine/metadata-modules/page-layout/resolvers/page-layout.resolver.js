"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutResolver", {
    enumerable: true,
    get: function() {
        return PageLayoutResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _resolvervalidationpipe = require("../../../core-modules/graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _pagelayouttabdto = require("../../page-layout-tab/dtos/page-layout-tab.dto");
const _pagelayoutwidgetdto = require("../../page-layout-widget/dtos/page-layout-widget.dto");
const _createpagelayoutinput = require("../dtos/inputs/create-page-layout.input");
const _updatepagelayoutwithtabsinput = require("../dtos/inputs/update-page-layout-with-tabs.input");
const _updatepagelayoutinput = require("../dtos/inputs/update-page-layout.input");
const _pagelayoutdto = require("../dtos/page-layout.dto");
const _pagelayouttypeenum = require("../enums/page-layout-type.enum");
const _pagelayoutresetservice = require("../services/page-layout-reset.service");
const _pagelayoutupdateservice = require("../services/page-layout-update.service");
const _pagelayoutservice = require("../services/page-layout.service");
const _pagelayoutgraphqlapiexceptionfilter = require("../utils/page-layout-graphql-api-exception.filter");
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
let PageLayoutResolver = class PageLayoutResolver {
    async getPageLayouts(workspace, objectMetadataId, pageLayoutType) {
        if (objectMetadataId || pageLayoutType) {
            return this.pageLayoutService.findBy({
                workspaceId: workspace.id,
                filter: {
                    objectMetadataId,
                    pageLayoutType
                }
            });
        }
        return this.pageLayoutService.findByWorkspaceId(workspace.id);
    }
    async getPageLayout(id, workspace) {
        return this.pageLayoutService.findByIdOrThrow({
            id,
            workspaceId: workspace.id
        });
    }
    async createPageLayout(input, workspace) {
        return this.pageLayoutService.create({
            createPageLayoutInput: input,
            workspaceId: workspace.id
        });
    }
    async updatePageLayout(id, input, workspace) {
        return this.pageLayoutService.update({
            id,
            workspaceId: workspace.id,
            updateData: input
        });
    }
    async destroyPageLayout(id, workspace) {
        return this.pageLayoutService.destroy({
            id,
            workspaceId: workspace.id
        });
    }
    async updatePageLayoutWithTabsAndWidgets(id, input, workspace) {
        return this.pageLayoutUpdateService.updatePageLayoutWithTabs({
            id,
            workspaceId: workspace.id,
            input
        });
    }
    async resetPageLayoutToDefault(id, workspace) {
        return this.pageLayoutResetService.resetPageLayoutToDefault({
            id,
            workspaceId: workspace.id
        });
    }
    async resetPageLayoutWidgetToDefault(id, workspace) {
        return this.pageLayoutResetService.resetPageLayoutWidgetToDefault({
            id,
            workspaceId: workspace.id
        });
    }
    async resetPageLayoutTabToDefault(id, workspace) {
        return this.pageLayoutResetService.resetPageLayoutTabToDefault({
            id,
            workspaceId: workspace.id
        });
    }
    constructor(pageLayoutService, pageLayoutUpdateService, pageLayoutResetService){
        this.pageLayoutService = pageLayoutService;
        this.pageLayoutUpdateService = pageLayoutUpdateService;
        this.pageLayoutResetService = pageLayoutResetService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _pagelayoutdto.PageLayoutDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('objectMetadataId', {
        type: ()=>String,
        nullable: true
    })),
    _ts_param(2, (0, _graphql.Args)('pageLayoutType', {
        type: ()=>_pagelayouttypeenum.PageLayoutType,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String,
        typeof _pagelayouttypeenum.PageLayoutType === "undefined" ? Object : _pagelayouttypeenum.PageLayoutType
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutResolver.prototype, "getPageLayouts", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_pagelayoutdto.PageLayoutDTO, {
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
], PageLayoutResolver.prototype, "getPageLayout", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayoutdto.PageLayoutDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpagelayoutinput.CreatePageLayoutInput === "undefined" ? Object : _createpagelayoutinput.CreatePageLayoutInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutResolver.prototype, "createPageLayout", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayoutdto.PageLayoutDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepagelayoutinput.UpdatePageLayoutInput === "undefined" ? Object : _updatepagelayoutinput.UpdatePageLayoutInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutResolver.prototype, "updatePageLayout", null);
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
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutResolver.prototype, "destroyPageLayout", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayoutdto.PageLayoutDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>String
    })),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepagelayoutwithtabsinput.UpdatePageLayoutWithTabsInput === "undefined" ? Object : _updatepagelayoutwithtabsinput.UpdatePageLayoutWithTabsInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutResolver.prototype, "updatePageLayoutWithTabsAndWidgets", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayoutdto.PageLayoutDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
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
], PageLayoutResolver.prototype, "resetPageLayoutToDefault", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayoutwidgetdto.PageLayoutWidgetDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
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
], PageLayoutResolver.prototype, "resetPageLayoutWidgetToDefault", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_pagelayouttabdto.PageLayoutTabDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
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
], PageLayoutResolver.prototype, "resetPageLayoutTabToDefault", null);
PageLayoutResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_pagelayoutdto.PageLayoutDTO),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor),
    (0, _common.UseFilters)(_pagelayoutgraphqlapiexceptionfilter.PageLayoutGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayoutservice.PageLayoutService === "undefined" ? Object : _pagelayoutservice.PageLayoutService,
        typeof _pagelayoutupdateservice.PageLayoutUpdateService === "undefined" ? Object : _pagelayoutupdateservice.PageLayoutUpdateService,
        typeof _pagelayoutresetservice.PageLayoutResetService === "undefined" ? Object : _pagelayoutresetservice.PageLayoutResetService
    ])
], PageLayoutResolver);

//# sourceMappingURL=page-layout.resolver.js.map