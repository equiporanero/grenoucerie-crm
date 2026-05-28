"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationConnectionsController", {
    enumerable: true,
    get: function() {
        return ApplicationConnectionsController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _utils = require("twenty-shared/utils");
const _getappconnectiondto = require("./dtos/get-app-connection.dto");
const _listappconnectionsdto = require("./dtos/list-app-connections.dto");
const _applicationconnectionslistservice = require("./services/application-connections-list.service");
const _jwtauthguard = require("../../../../guards/jwt-auth.guard");
const _nopermissionguard = require("../../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../../guards/workspace-auth.guard");
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
let ApplicationConnectionsController = class ApplicationConnectionsController {
    async list(request, filter) {
        const { applicationId, workspaceId, requestUserWorkspaceId } = this.requireAppContext(request);
        return this.listService.list({
            applicationId,
            workspaceId,
            requestUserWorkspaceId,
            filter
        });
    }
    async get(request, body) {
        const { applicationId, workspaceId, requestUserWorkspaceId } = this.requireAppContext(request);
        return this.listService.getOne({
            applicationId,
            workspaceId,
            requestUserWorkspaceId,
            id: body.id
        });
    }
    requireAppContext(request) {
        if (!(0, _utils.isDefined)(request.application) || !(0, _utils.isDefined)(request.workspace)) {
            throw new _common.ForbiddenException('This endpoint requires an APPLICATION_ACCESS token.');
        }
        return {
            applicationId: request.application.id,
            workspaceId: request.workspace.id,
            requestUserWorkspaceId: request.userWorkspaceId ?? null
        };
    }
    constructor(listService){
        this.listService = listService;
    }
};
_ts_decorate([
    (0, _common.Post)('list'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _listappconnectionsdto.ListAppConnectionsDto === "undefined" ? Object : _listappconnectionsdto.ListAppConnectionsDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationConnectionsController.prototype, "list", null);
_ts_decorate([
    (0, _common.Post)('get'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _getappconnectiondto.GetAppConnectionDto === "undefined" ? Object : _getappconnectiondto.GetAppConnectionDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationConnectionsController.prototype, "get", null);
ApplicationConnectionsController = _ts_decorate([
    (0, _common.Controller)('apps/connections'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UsePipes)(new _common.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationconnectionslistservice.ApplicationConnectionsListService === "undefined" ? Object : _applicationconnectionslistservice.ApplicationConnectionsListService
    ])
], ApplicationConnectionsController);

//# sourceMappingURL=application-connections.controller.js.map