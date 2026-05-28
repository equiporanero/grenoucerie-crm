"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiUpdateManyHandler", {
    enumerable: true,
    get: function() {
        return RestApiUpdateManyHandler;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _restapibasehandler = require("./rest-api-base.handler");
const _commonupdatemanyqueryrunnerservice = require("../../../common/common-query-runners/common-update-many-query-runner.service");
const _parsedepthrestrequestutil = require("../../input-request-parsers/depth-parser-utils/parse-depth-rest-request.util");
const _parsefilterrestrequestutil = require("../../input-request-parsers/filter-parser-utils/parse-filter-rest-request.util");
const _workspacequeryrunnerrestapiexceptionhandlerutil = require("../../utils/workspace-query-runner-rest-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RestApiUpdateManyHandler = class RestApiUpdateManyHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const { data, depth, filter } = this.parseRequestArgs(request);
            const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
            const selectedFields = await this.computeSelectedFields({
                depth,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                authContext
            });
            const { results: records } = await this.commonUpdateManyQueryRunnerService.execute({
                data,
                filter,
                selectedFields
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
                [`update${(0, _utils.capitalize)(objectNamePlural)}`]: records
            }
        };
    }
    parseRequestArgs(request) {
        return {
            data: request.body,
            depth: (0, _parsedepthrestrequestutil.parseDepthRestRequest)(request),
            filter: (0, _parsefilterrestrequestutil.parseFilterRestRequest)(request)
        };
    }
    constructor(commonUpdateManyQueryRunnerService){
        super(), this.commonUpdateManyQueryRunnerService = commonUpdateManyQueryRunnerService;
    }
};
RestApiUpdateManyHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonupdatemanyqueryrunnerservice.CommonUpdateManyQueryRunnerService === "undefined" ? Object : _commonupdatemanyqueryrunnerservice.CommonUpdateManyQueryRunnerService
    ])
], RestApiUpdateManyHandler);

//# sourceMappingURL=rest-api-update-many.handler.js.map