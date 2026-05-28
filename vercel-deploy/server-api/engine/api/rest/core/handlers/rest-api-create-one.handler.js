"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiCreateOneHandler", {
    enumerable: true,
    get: function() {
        return RestApiCreateOneHandler;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commoncreateonequeryrunnerservice = require("../../../common/common-query-runners/common-create-one-query-runner.service");
const _restapibasehandler = require("./rest-api-base.handler");
const _parsedepthrestrequestutil = require("../../input-request-parsers/depth-parser-utils/parse-depth-rest-request.util");
const _parseupsertrestrequestutil = require("../../input-request-parsers/upsert-parser-utils/parse-upsert-rest-request.util");
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
let RestApiCreateOneHandler = class RestApiCreateOneHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const { data, depth, upsert } = this.parseRequestArgs(request);
            const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
            const selectedFields = await this.computeSelectedFields({
                depth,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                authContext
            });
            const { results: record } = await this.commonCreateOneQueryRunnerService.execute({
                data,
                selectedFields,
                upsert
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
    formatRestResponse(record, objectNameSingular) {
        return {
            data: {
                [`create${(0, _utils.capitalize)(objectNameSingular)}`]: record
            }
        };
    }
    parseRequestArgs(request) {
        return {
            data: request.body,
            depth: (0, _parsedepthrestrequestutil.parseDepthRestRequest)(request),
            upsert: (0, _parseupsertrestrequestutil.parseUpsertRestRequest)(request)
        };
    }
    constructor(commonCreateOneQueryRunnerService){
        super(), this.commonCreateOneQueryRunnerService = commonCreateOneQueryRunnerService;
    }
};
RestApiCreateOneHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService === "undefined" ? Object : _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService
    ])
], RestApiCreateOneHandler);

//# sourceMappingURL=rest-api-create-one.handler.js.map