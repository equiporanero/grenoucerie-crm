"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionsRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return PermissionsRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _permissionsexception = require("../permissions.exception");
const _permissionrestapiexceptioncodetohttpstatusutil = require("./permission-rest-api-exception-code-to-http-status.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PermissionsRestApiExceptionFilter = class PermissionsRestApiExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        return this.httpExceptionHandlerService.handleError(exception, response, (0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(exception.code));
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
PermissionsRestApiExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(_permissionsexception.PermissionsException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], PermissionsRestApiExceptionFilter);

//# sourceMappingURL=permissions-rest-api-exception.filter.js.map