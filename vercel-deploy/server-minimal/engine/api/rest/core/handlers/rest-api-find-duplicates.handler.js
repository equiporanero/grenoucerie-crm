"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiFindDuplicatesHandler", {
    enumerable: true,
    get: function() {
        return RestApiFindDuplicatesHandler;
    }
});
const _common = require("@nestjs/common");
const _commonfindduplicatesqueryrunnerservice = require("../../../common/common-query-runners/common-find-duplicates-query-runner.service");
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
let RestApiFindDuplicatesHandler = class RestApiFindDuplicatesHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const { data, ids, depth } = this.parseRequestArgs(request);
            const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
            const selectedFields = await this.computeSelectedFields({
                depth,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                authContext
            });
            const { results: duplicateConnections } = await this.commonFindDuplicatesQueryRunnerService.execute({
                data,
                ids,
                selectedFields
            }, {
                authContext,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                objectIdByNameSingular
            });
            return this.formatRestResponse(duplicateConnections, flatObjectMetadata.nameSingular);
        } catch (error) {
            return (0, _workspacequeryrunnerrestapiexceptionhandlerutil.workspaceQueryRunnerRestApiExceptionHandler)(error);
        }
    }
    formatRestResponse(duplicateConnections, objectNameSingular) {
        return {
            data: duplicateConnections.map((connection)=>({
                    [`${objectNameSingular}Duplicates`]: connection.records,
                    totalCount: connection.totalCount,
                    pageInfo: {
                        hasNextPage: connection.hasNextPage,
                        hasPreviousPage: connection.hasPreviousPage,
                        startCursor: connection.startCursor,
                        endCursor: connection.endCursor
                    }
                }))
        };
    }
    parseRequestArgs(request) {
        return {
            data: request.body.data,
            ids: request.body.ids,
            depth: (0, _parsedepthrestrequestutil.parseDepthRestRequest)(request)
        };
    }
    constructor(commonFindDuplicatesQueryRunnerService){
        super(), this.commonFindDuplicatesQueryRunnerService = commonFindDuplicatesQueryRunnerService;
    }
};
RestApiFindDuplicatesHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonfindduplicatesqueryrunnerservice.CommonFindDuplicatesQueryRunnerService === "undefined" ? Object : _commonfindduplicatesqueryrunnerservice.CommonFindDuplicatesQueryRunnerService
    ])
], RestApiFindDuplicatesHandler);

//# sourceMappingURL=rest-api-find-duplicates.handler.js.map