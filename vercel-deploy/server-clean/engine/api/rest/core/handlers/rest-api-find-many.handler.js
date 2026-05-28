"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiFindManyHandler", {
    enumerable: true,
    get: function() {
        return RestApiFindManyHandler;
    }
});
const _common = require("@nestjs/common");
const _restapibasehandler = require("./rest-api-base.handler");
const _commonfindmanyqueryrunnerservice = require("../../../common/common-query-runners/common-find-many-query-runner.service");
const _parsedepthrestrequestutil = require("../../input-request-parsers/depth-parser-utils/parse-depth-rest-request.util");
const _parseendingbeforerestrequestutil = require("../../input-request-parsers/ending-before-parser-utils/parse-ending-before-rest-request.util");
const _parsefilterrestrequestutil = require("../../input-request-parsers/filter-parser-utils/parse-filter-rest-request.util");
const _parselimitrestrequestutil = require("../../input-request-parsers/limit-parser-utils/parse-limit-rest-request.util");
const _parseorderbyrestrequestutil = require("../../input-request-parsers/order-by-parser-utils/parse-order-by-rest-request.util");
const _parsestartingafterrestrequestutil = require("../../input-request-parsers/starting-after-parser-utils/parse-starting-after-rest-request.util");
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
let RestApiFindManyHandler = class RestApiFindManyHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const parsedArgs = this.parseRequestArgs(request);
            const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
            const selectedFields = await this.computeSelectedFields({
                depth: parsedArgs.depth,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                authContext
            });
            const { results: { records, aggregatedValues, pageInfo } } = await this.commonFindManyQueryRunnerService.execute({
                ...parsedArgs,
                selectedFields: {
                    ...selectedFields,
                    totalCount: true
                }
            }, {
                authContext,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                objectIdByNameSingular
            });
            return this.formatRestResponse(records, aggregatedValues, flatObjectMetadata.namePlural, pageInfo);
        } catch (error) {
            return (0, _workspacequeryrunnerrestapiexceptionhandlerutil.workspaceQueryRunnerRestApiExceptionHandler)(error);
        }
    }
    formatRestResponse(records, aggregatedValues, objectNamePlural, pageInfo) {
        return {
            data: {
                [objectNamePlural]: records
            },
            totalCount: Number(aggregatedValues.totalCount),
            pageInfo
        };
    }
    parseRequestArgs(request) {
        const depth = (0, _parsedepthrestrequestutil.parseDepthRestRequest)(request);
        const limit = (0, _parselimitrestrequestutil.parseLimitRestRequest)(request);
        const orderBy = (0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request);
        const filter = (0, _parsefilterrestrequestutil.parseFilterRestRequest)(request);
        const endingBefore = (0, _parseendingbeforerestrequestutil.parseEndingBeforeRestRequest)(request);
        const startingAfter = (0, _parsestartingafterrestrequestutil.parseStartingAfterRestRequest)(request);
        return {
            filter,
            orderBy,
            first: !endingBefore ? limit : undefined,
            last: endingBefore ? limit : undefined,
            before: endingBefore,
            after: startingAfter,
            depth
        };
    }
    constructor(commonFindManyQueryRunnerService){
        super(), this.commonFindManyQueryRunnerService = commonFindManyQueryRunnerService;
    }
};
RestApiFindManyHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonfindmanyqueryrunnerservice.CommonFindManyQueryRunnerService === "undefined" ? Object : _commonfindmanyqueryrunnerservice.CommonFindManyQueryRunnerService
    ])
], RestApiFindManyHandler);

//# sourceMappingURL=rest-api-find-many.handler.js.map