"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiDeleteManyHandler", {
    enumerable: true,
    get: function() {
        return RestApiDeleteManyHandler;
    }
});
const _common = require("@nestjs/common");
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _utils = require("twenty-shared/utils");
const _commondeletemanyqueryrunnerservice = require("../../../common/common-query-runners/common-delete-many-query-runner.service");
const _restapibasehandler = require("./rest-api-base.handler");
const _parsefilterrestrequestutil = require("../../input-request-parsers/filter-parser-utils/parse-filter-rest-request.util");
const _workspacequeryrunnerrestapiexceptionhandlerutil = require("../../utils/workspace-query-runner-rest-api-exception-handler.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RestApiDeleteManyHandler = class RestApiDeleteManyHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        const { filter } = this.parseRequestArgs(request);
        if ((0, _lodashisempty.default)(filter)) {
            throw new _common.BadRequestException('Filters are mandatory for bulk delete operations. Please provide at least one filter to prevent accidental deletion of all records.');
        }
        const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
        try {
            const { results: records } = await this.commonDeleteManyQueryRunnerService.execute({
                filter,
                selectedFields: {
                    id: true
                }
            }, {
                authContext,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                objectIdByNameSingular
            });
            return this.formatRestResponse(records, flatObjectMetadata.namePlural);
        } catch (error) {
            return (0, _workspacequeryrunnerrestapiexceptionhandlerutil.workspaceQueryRunnerRestApiExceptionHandler)(error);
        }
    }
    formatRestResponse(records, objectNamePlural) {
        return {
            data: {
                [`delete${(0, _utils.capitalize)(objectNamePlural)}`]: records
            }
        };
    }
    parseRequestArgs(request) {
        const filter = (0, _parsefilterrestrequestutil.parseFilterRestRequest)(request);
        return {
            filter
        };
    }
    constructor(commonDeleteManyQueryRunnerService){
        super(), this.commonDeleteManyQueryRunnerService = commonDeleteManyQueryRunnerService;
    }
};
RestApiDeleteManyHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commondeletemanyqueryrunnerservice.CommonDeleteManyQueryRunnerService === "undefined" ? Object : _commondeletemanyqueryrunnerservice.CommonDeleteManyQueryRunnerService
    ])
], RestApiDeleteManyHandler);

//# sourceMappingURL=rest-api-delete-many.handler.js.map