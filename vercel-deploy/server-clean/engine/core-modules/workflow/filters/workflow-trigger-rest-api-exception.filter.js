"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowTriggerRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return WorkflowTriggerRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _httpexceptionhandlerservice = require("../../exception-handler/http-exception-handler.service");
const _workflowtriggerexception = require("../../../../modules/workflow/workflow-trigger/exceptions/workflow-trigger.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowTriggerRestApiExceptionFilter = class WorkflowTriggerRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch(exception.code){
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_INPUT:
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER:
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION:
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_ACTION_TYPE:
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_STATUS:
                return this.httpExceptionHandlerService.handleError(exception, response, 400);
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.FORBIDDEN:
                return this.httpExceptionHandlerService.handleError(exception, response, 403);
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _workflowtriggerexception.WorkflowTriggerExceptionCode.INTERNAL_ERROR:
            default:
                return this.httpExceptionHandlerService.handleError(exception, response, 500);
        }
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
WorkflowTriggerRestApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_workflowtriggerexception.WorkflowTriggerException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], WorkflowTriggerRestApiExceptionFilter);

//# sourceMappingURL=workflow-trigger-rest-api-exception.filter.js.map