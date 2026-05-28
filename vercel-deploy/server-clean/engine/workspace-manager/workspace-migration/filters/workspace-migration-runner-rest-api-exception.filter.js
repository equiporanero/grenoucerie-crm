"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRunnerRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRunnerRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _workspacemigrationrunnerexception = require("../workspace-migration-runner/exceptions/workspace-migration-runner.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationRunnerRestApiExceptionFilter = class WorkspaceMigrationRunnerRestApiExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        if (exception.code === _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.EXECUTION_FAILED) {
            const underlyingError = exception.errors?.metadata ?? exception.errors?.workspaceSchema ?? exception.errors?.actionTranspilation;
            if (underlyingError instanceof _typeorm.QueryFailedError) {
                return this.httpExceptionHandlerService.handleError(underlyingError, response);
            }
        }
        return this.httpExceptionHandlerService.handleError(exception, response);
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
WorkspaceMigrationRunnerRestApiExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(_workspacemigrationrunnerexception.WorkspaceMigrationRunnerException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], WorkspaceMigrationRunnerRestApiExceptionFilter);

//# sourceMappingURL=workspace-migration-runner-rest-api-exception.filter.js.map