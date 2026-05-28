"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutTabController", {
    enumerable: true,
    get: function() {
        return PageLayoutTabController;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _flatentitymapsrestapiexceptionfilter = require("../../flat-entity/filters/flat-entity-maps-rest-api-exception.filter");
const _createpagelayouttabinput = require("../dtos/inputs/create-page-layout-tab.input");
const _updatepagelayouttabinput = require("../dtos/inputs/update-page-layout-tab.input");
const _pagelayouttabexception = require("../exceptions/page-layout-tab.exception");
const _pagelayouttabrestapiexceptionfilter = require("../filters/page-layout-tab-rest-api-exception.filter");
const _pagelayouttabservice = require("../services/page-layout-tab.service");
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
let PageLayoutTabController = class PageLayoutTabController {
    async findMany(workspace, pageLayoutId) {
        if (!(0, _utils.isDefined)(pageLayoutId)) {
            throw new _pagelayouttabexception.PageLayoutTabException((0, _pagelayouttabexception.generatePageLayoutTabExceptionMessage)(_pagelayouttabexception.PageLayoutTabExceptionMessageKey.PAGE_LAYOUT_ID_REQUIRED), _pagelayouttabexception.PageLayoutTabExceptionCode.INVALID_PAGE_LAYOUT_TAB_DATA);
        }
        return this.pageLayoutTabService.findByPageLayoutId({
            workspaceId: workspace.id,
            pageLayoutId
        });
    }
    async findOne(id, workspace) {
        return this.pageLayoutTabService.findByIdOrThrow({
            id,
            workspaceId: workspace.id
        });
    }
    async create(input, workspace) {
        return this.pageLayoutTabService.create({
            createPageLayoutTabInput: input,
            workspaceId: workspace.id
        });
    }
    async update(id, input, workspace) {
        return this.pageLayoutTabService.update({
            id,
            workspaceId: workspace.id,
            updateData: input
        });
    }
    async destroy(id, workspace) {
        return this.pageLayoutTabService.destroy({
            id,
            workspaceId: workspace.id
        });
    }
    constructor(pageLayoutTabService){
        this.pageLayoutTabService = pageLayoutTabService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _common.Query)('pageLayoutId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutTabController.prototype, "findMany", null);
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
], PageLayoutTabController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpagelayouttabinput.CreatePageLayoutTabInput === "undefined" ? Object : _createpagelayouttabinput.CreatePageLayoutTabInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutTabController.prototype, "create", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.LAYOUTS)),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatepagelayouttabinput.UpdatePageLayoutTabInput === "undefined" ? Object : _updatepagelayouttabinput.UpdatePageLayoutTabInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PageLayoutTabController.prototype, "update", null);
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
], PageLayoutTabController.prototype, "destroy", null);
PageLayoutTabController = _ts_decorate([
    (0, _common.Controller)('rest/metadata/pageLayoutTabs'),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _pagelayouttabrestapiexceptionfilter.PageLayoutTabRestApiExceptionFilter, _flatentitymapsrestapiexceptionfilter.FlatEntityMapsRestApiExceptionFilter, _workspacemigrationrunnerrestapiexceptionfilter.WorkspaceMigrationRunnerRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayouttabservice.PageLayoutTabService === "undefined" ? Object : _pagelayouttabservice.PageLayoutTabService
    ])
], PageLayoutTabController);

//# sourceMappingURL=page-layout-tab.controller.js.map