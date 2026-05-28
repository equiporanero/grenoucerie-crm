"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetController", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetController;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _constants = require("twenty-shared/constants");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _flatentitymapsrestapiexceptionfilter = require("../../flat-entity/filters/flat-entity-maps-rest-api-exception.filter");
const _createpagelayoutwidgetinput = require("../dtos/inputs/create-page-layout-widget.input");
const _updatepagelayoutwidgetinput = require("../dtos/inputs/update-page-layout-widget.input");
const _pagelayoutwidgetexception = require("../exceptions/page-layout-widget.exception");
const _pagelayoutwidgetrestapiexceptionfilter = require("../filters/page-layout-widget-rest-api-exception.filter");
const _pagelayoutwidgetservice = require("../services/page-layout-widget.service");
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
let PageLayoutWidgetController = class PageLayoutWidgetController {
    async findMany(workspace, pageLayoutTabId) {
        if (!(0, _classvalidator.isDefined)(pageLayoutTabId)) {
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException((0, _pagelayoutwidgetexception.generatePageLayoutWidgetExceptionMessage)(_pagelayoutwidgetexception.PageLayoutWidgetExceptionMessageKey.PAGE_LAYOUT_TAB_ID_REQUIRED), _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        }
        return this.pageLayoutWidgetService.findByPageLayoutTabId({
            workspaceId: workspace.id,
            pageLayoutTabId
        });
    }
    async findOne(id, workspace) {
        return this.pageLayoutWidgetService.findByIdOrThrow({
            id,
            workspaceId: workspace.id
        });
    }
    async create(input, workspace) {
        return this.pageLayoutWidgetService.create({
            input,
            workspaceId: workspace.id
        });
    }
    async update(id, input, workspace) {
        return this.pageLayoutWidgetService.update({
            id,
            workspaceId: workspace.id,
            updateData: input
        });
    }
    async destroy(id, workspace) {
        return this.pageLayoutWidgetService.destroy({
            id,
            workspaceId: workspace.id
        });
    }
    constructor(pageLayoutWidgetService){
        this.pageLayoutWidgetService = pageLayoutWidgetService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _common.Query)('pageLayoutTabId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetController.prototype, "findMany", null);
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
], PageLayoutWidgetController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpagelayoutwidgetinput.CreatePageLayoutWidgetInput === "undefined" ? Object : _createpagelayoutwidgetinput.CreatePageLayoutWidgetInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepagelayoutwidgetinput.UpdatePageLayoutWidgetInput === "undefined" ? Object : _updatepagelayoutwidgetinput.UpdatePageLayoutWidgetInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutWidgetController.prototype, "destroy", null);
PageLayoutWidgetController = _ts_decorate([
    (0, _common.Controller)('rest/metadata/pageLayoutWidgets'),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _pagelayoutwidgetrestapiexceptionfilter.PageLayoutWidgetRestApiExceptionFilter, _flatentitymapsrestapiexceptionfilter.FlatEntityMapsRestApiExceptionFilter, _workspacemigrationrunnerrestapiexceptionfilter.WorkspaceMigrationRunnerRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayoutwidgetservice.PageLayoutWidgetService === "undefined" ? Object : _pagelayoutwidgetservice.PageLayoutWidgetService
    ])
], PageLayoutWidgetController);

//# sourceMappingURL=page-layout-widget.controller.js.map