"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OpenApiController", {
    enumerable: true,
    get: function() {
        return OpenApiController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _openapiservice = require("./open-api.service");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
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
let OpenApiController = class OpenApiController {
    async generateOpenApiSchemaCore(request, res) {
        const data = await this.openApiService.generateCoreSchema(request);
        res.send(data);
    }
    async generateOpenApiSchemaMetaData(request, res) {
        const data = await this.openApiService.generateMetaDataSchema(request);
        res.send(data);
    }
    constructor(openApiService){
        this.openApiService = openApiService;
    }
};
_ts_decorate([
    (0, _common.Get)([
        'open-api/core',
        'rest/open-api/core'
    ]),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OpenApiController.prototype, "generateOpenApiSchemaCore", null);
_ts_decorate([
    (0, _common.Get)([
        'open-api/metadata',
        'rest/open-api/metadata'
    ]),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OpenApiController.prototype, "generateOpenApiSchemaMetaData", null);
OpenApiController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _openapiservice.OpenApiService === "undefined" ? Object : _openapiservice.OpenApiService
    ])
], OpenApiController);

//# sourceMappingURL=open-api.controller.js.map