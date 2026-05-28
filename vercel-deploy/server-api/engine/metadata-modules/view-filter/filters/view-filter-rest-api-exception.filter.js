"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return ViewFilterRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _translations = require("twenty-shared/translations");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _viewfilterexception = require("../exceptions/view-filter.exception");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationbuilderrestapiexceptionhandlerutil = require("../../../workspace-manager/workspace-migration/interceptors/utils/workspace-migration-builder-rest-api-exception-handler.util");
const _customexception = require("../../../../utils/custom-exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ViewFilterRestApiExceptionFilter = class ViewFilterRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
            return (0, _workspacemigrationbuilderrestapiexceptionhandlerutil.workspaceMigrationBuilderRestApiExceptionHandler)({
                exception,
                response,
                i18n: this.i18nService.getI18nInstance(_translations.SOURCE_LOCALE)
            });
        }
        if (exception instanceof _viewfilterexception.ViewFilterException) {
            switch(exception.code){
                case _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND:
                    return this.httpExceptionHandlerService.handleError(exception, response, 404);
                case _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA:
                    return this.httpExceptionHandlerService.handleError(exception, response, 400);
                default:
                    // TODO: change to 500 when we have input validation
                    return this.httpExceptionHandlerService.handleError(exception, response, 400);
            }
        }
        // Fallback for any other exception type
        const unknownException = new _customexception.UnknownException('Internal server error', 'INTERNAL_ERROR', {
            userFriendlyMessage: /*i18n*/ {
                id: "W5A0Ly",
                message: "An unexpected error occurred."
            }
        });
        return this.httpExceptionHandlerService.handleError(unknownException, response, 500);
    }
    constructor(httpExceptionHandlerService, i18nService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
        this.i18nService = i18nService;
    }
};
ViewFilterRestApiExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(_viewfilterexception.ViewFilterException, _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], ViewFilterRestApiExceptionFilter);

//# sourceMappingURL=view-filter-rest-api-exception.filter.js.map