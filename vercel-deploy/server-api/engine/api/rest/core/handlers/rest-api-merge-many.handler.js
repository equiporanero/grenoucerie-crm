"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiMergeManyHandler", {
    enumerable: true,
    get: function() {
        return RestApiMergeManyHandler;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commonmergemanyqueryrunnerservice = require("../../../common/common-query-runners/common-merge-many-query-runner.service");
const _restapibasehandler = require("./rest-api-base.handler");
const _parsedepthrestrequestutil = require("../../input-request-parsers/depth-parser-utils/parse-depth-rest-request.util");
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
let RestApiMergeManyHandler = class RestApiMergeManyHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const { depth, ...restArgs } = await this.parseRequestArgs(request);
            const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
            const selectedFields = await this.computeSelectedFields({
                depth,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                authContext
            });
            const { results: record } = await this.commonMergeManyQueryRunnerService.execute({
                ...restArgs,
                selectedFields
            }, {
                authContext,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                objectIdByNameSingular
            });
            return this.formatRestResponse(record, flatObjectMetadata.nameSingular);
        } catch (error) {
            return (0, _workspacequeryrunnerrestapiexceptionhandlerutil.workspaceQueryRunnerRestApiExceptionHandler)(error);
        }
    }
    formatRestResponse(record, objectNamePlural) {
        return {
            data: {
                [`merge${(0, _utils.capitalize)(objectNamePlural)}`]: record
            }
        };
    }
    async parseRequestArgs(request) {
        const depth = (0, _parsedepthrestrequestutil.parseDepthRestRequest)(request);
        return {
            conflictPriorityIndex: request.body.conflictPriorityIndex,
            dryRun: request.body.dryRun,
            ids: request.body.ids,
            depth
        };
    }
    constructor(commonMergeManyQueryRunnerService){
        super(), this.commonMergeManyQueryRunnerService = commonMergeManyQueryRunnerService;
    }
};
RestApiMergeManyHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonmergemanyqueryrunnerservice.CommonMergeManyQueryRunnerService === "undefined" ? Object : _commonmergemanyqueryrunnerservice.CommonMergeManyQueryRunnerService
    ])
], RestApiMergeManyHandler);

//# sourceMappingURL=rest-api-merge-many.handler.js.map