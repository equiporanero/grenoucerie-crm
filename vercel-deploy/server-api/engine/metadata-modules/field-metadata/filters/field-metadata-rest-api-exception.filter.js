"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldMetadataRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return FieldMetadataRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _translations = require("twenty-shared/translations");
const _restinputrequestparserexception = require("../../../api/rest/input-request-parsers/rest-input-request-parser.exception");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _fieldmetadataexception = require("../field-metadata.exception");
const _fieldmetadataexceptioncodetohttpstatusutil = require("../utils/field-metadata-exception-code-to-http-status.util");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _flatentitymapsexceptioncodetohttpstatusutil = require("../../flat-entity/utils/flat-entity-maps-exception-code-to-http-status.util");
const _invalidmetadataexception = require("../../utils/exceptions/invalid-metadata.exception");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationbuilderrestapiexceptionhandlerutil = require("../../../workspace-manager/workspace-migration/interceptors/utils/workspace-migration-builder-rest-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FieldMetadataRestApiExceptionFilter = class FieldMetadataRestApiExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        if (exception instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
            return (0, _workspacemigrationbuilderrestapiexceptionhandlerutil.workspaceMigrationBuilderRestApiExceptionHandler)({
                exception,
                response,
                i18n: this.i18nService.getI18nInstance(_translations.SOURCE_LOCALE)
            });
        }
        if (exception instanceof _invalidmetadataexception.InvalidMetadataException || exception instanceof _restinputrequestparserexception.RestInputRequestParserException) {
            return this.httpExceptionHandlerService.handleError(exception, response, 400);
        }
        if (exception instanceof _flatentitymapsexception.FlatEntityMapsException) {
            return this.httpExceptionHandlerService.handleError(exception, response, (0, _flatentitymapsexceptioncodetohttpstatusutil.flatEntityMapsExceptionCodeToHttpStatus)(exception.code));
        }
        if (exception instanceof _fieldmetadataexception.FieldMetadataException) {
            return this.httpExceptionHandlerService.handleError(exception, response, (0, _fieldmetadataexceptioncodetohttpstatusutil.fieldMetadataExceptionCodeToHttpStatus)(exception.code));
        }
        return this.httpExceptionHandlerService.handleError(exception, response, 500);
    }
    constructor(httpExceptionHandlerService, i18nService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
        this.i18nService = i18nService;
    }
};
FieldMetadataRestApiExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(_fieldmetadataexception.FieldMetadataException, _invalidmetadataexception.InvalidMetadataException, _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException, _restinputrequestparserexception.RestInputRequestParserException, _flatentitymapsexception.FlatEntityMapsException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], FieldMetadataRestApiExceptionFilter);

//# sourceMappingURL=field-metadata-rest-api-exception.filter.js.map