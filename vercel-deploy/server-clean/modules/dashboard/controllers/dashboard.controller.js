"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardController", {
    enumerable: true,
    get: function() {
        return DashboardController;
    }
});
const _common = require("@nestjs/common");
const _workspaceauthcontextstorage = require("../../../engine/core-modules/auth/storage/workspace-auth-context.storage");
const _jwtauthguard = require("../../../engine/guards/jwt-auth.guard");
const _nopermissionguard = require("../../../engine/guards/no-permission.guard");
const _workspaceauthguard = require("../../../engine/guards/workspace-auth.guard");
const _dashboardrestapiexceptionfilter = require("../filters/dashboard-rest-api-exception.filter");
const _dashboardduplicationservice = require("../services/dashboard-duplication.service");
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
let DashboardController = class DashboardController {
    async duplicate(id) {
        const authContext = (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)();
        return this.dashboardDuplicationService.duplicateDashboard(id, authContext);
    }
    constructor(dashboardDuplicationService){
        this.dashboardDuplicationService = dashboardDuplicationService;
    }
};
_ts_decorate([
    (0, _common.Post)(':id/duplicate'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], DashboardController.prototype, "duplicate", null);
DashboardController = _ts_decorate([
    (0, _common.Controller)('rest/dashboards'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UseFilters)(_dashboardrestapiexceptionfilter.DashboardRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dashboardduplicationservice.DashboardDuplicationService === "undefined" ? Object : _dashboardduplicationservice.DashboardDuplicationService
    ])
], DashboardController);

//# sourceMappingURL=dashboard.controller.js.map