"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiCoreController", {
    enumerable: true,
    get: function() {
        return RestApiCoreController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _restapicoreservice = require("../services/rest-api-core.service");
const _restapiexceptionfilter = require("../../rest-api-exception.filter");
const _authenticatedrequest = require("../../types/authenticated-request");
const _custompermissionguard = require("../../../../guards/custom-permission.guard");
const _jwtauthguard = require("../../../../guards/jwt-auth.guard");
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
let RestApiCoreController = class RestApiCoreController {
    async handleApiPostBatch(request, res) {
        this.logger.log(`[REST API] Processing BATCH request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.createMany(request);
        res.status(201).send(result);
    }
    async handleApiFindDuplicates(request, res) {
        this.logger.log(`[REST API] Processing DUPLICATES request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.findDuplicates(request);
        res.status(200).send(result);
    }
    async handleApiPost(request, res) {
        this.logger.log(`[REST API] Processing POST request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.createOne(request);
        res.status(201).send(result);
    }
    async handleApiGroupBy(request, res) {
        this.logger.log(`[REST API] Processing GROUP BY request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.groupBy(request);
        res.status(200).send(result);
    }
    async handleApiGet(request, res) {
        this.logger.log(`[REST API] Processing GET request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.get(request);
        res.status(200).send(result);
    }
    async handleApiDelete(request, res) {
        this.logger.log(`[REST API] Processing DELETE request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.delete(request);
        res.status(200).send(result);
    }
    async handleApiRestore(request, res) {
        this.logger.log(`[REST API] Processing RESTORE request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.restore(request);
        res.status(200).send(result);
    }
    async handleApiMerge(request, res) {
        this.logger.log(`[REST API] Processing MERGE request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.mergeMany(request);
        res.status(200).send(result);
    }
    async handleApiPatch(request, res) {
        this.logger.log(`[REST API] Processing PATCH request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.update(request);
        res.status(200).send(result);
    }
    // This endpoint is not documented in the OpenAPI schema.
    // We keep it to avoid a breaking change since it initially used PUT instead
    // of PATCH, and because the PUT verb is often used as a PATCH.
    async handleApiPut(request, res) {
        this.logger.log(`[REST API] Processing PUT request to ${request.path} on workspace ${request.workspaceId}`);
        const result = await this.restApiCoreService.update(request);
        res.status(200).send(result);
    }
    constructor(restApiCoreService){
        this.restApiCoreService = restApiCoreService;
        this.logger = new _common.Logger(RestApiCoreController.name);
    }
};
_ts_decorate([
    (0, _common.Post)('batch/*path'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiPostBatch", null);
_ts_decorate([
    (0, _common.Post)('*path/duplicates'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiFindDuplicates", null);
_ts_decorate([
    (0, _common.Post)('*path'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiPost", null);
_ts_decorate([
    (0, _common.Get)('*path/groupBy'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiGroupBy", null);
_ts_decorate([
    (0, _common.Get)('*path'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiGet", null);
_ts_decorate([
    (0, _common.Delete)('*path'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiDelete", null);
_ts_decorate([
    (0, _common.Patch)('restore/*path'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiRestore", null);
_ts_decorate([
    (0, _common.Patch)('*path/merge'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiMerge", null);
_ts_decorate([
    (0, _common.Patch)('*path'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiPatch", null);
_ts_decorate([
    (0, _common.Put)('*path'),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authenticatedrequest.AuthenticatedRequest === "undefined" ? Object : _authenticatedrequest.AuthenticatedRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], RestApiCoreController.prototype, "handleApiPut", null);
RestApiCoreController = _ts_decorate([
    (0, _common.Controller)('rest'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, _custompermissionguard.CustomPermissionGuard),
    (0, _common.UseFilters)(_restapiexceptionfilter.RestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _restapicoreservice.RestApiCoreService === "undefined" ? Object : _restapicoreservice.RestApiCoreService
    ])
], RestApiCoreController);

//# sourceMappingURL=rest-api-core.controller.js.map