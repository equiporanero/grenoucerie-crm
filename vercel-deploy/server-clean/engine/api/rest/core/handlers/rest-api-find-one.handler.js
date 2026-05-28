"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiFindOneHandler", {
    enumerable: true,
    get: function() {
        return RestApiFindOneHandler;
    }
});
const _common = require("@nestjs/common");
const _commonfindonequeryrunnerservice = require("../../../common/common-query-runners/common-find-one-query-runner.service");
const _restapibasehandler = require("./rest-api-base.handler");
const _parsedepthrestrequestutil = require("../../input-request-parsers/depth-parser-utils/parse-depth-rest-request.util");
const _parsecorepathutils = require("../../input-request-parsers/path-parser-utils/parse-core-path.utils");
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
let RestApiFindOneHandler = class RestApiFindOneHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const { filter, depth } = await this.parseRequestArgs(request);
            const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
            const selectedFields = await this.computeSelectedFields({
                depth,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                authContext
            });
            const { results: record } = await this.commonFindOneQueryRunnerService.execute({
                filter,
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
    formatRestResponse(record, objectNameSingular) {
        return {
            data: {
                [objectNameSingular]: record
            }
        };
    }
    async parseRequestArgs(request) {
        const { id: recordId } = (0, _parsecorepathutils.parseCorePath)(request);
        const filter = {
            id: {
                eq: recordId
            }
        };
        const depth = (0, _parsedepthrestrequestutil.parseDepthRestRequest)(request);
        return {
            filter,
            depth
        };
    }
    constructor(commonFindOneQueryRunnerService){
        super(), this.commonFindOneQueryRunnerService = commonFindOneQueryRunnerService;
    }
};
RestApiFindOneHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonfindonequeryrunnerservice.CommonFindOneQueryRunnerService === "undefined" ? Object : _commonfindonequeryrunnerservice.CommonFindOneQueryRunnerService
    ])
], RestApiFindOneHandler);

//# sourceMappingURL=rest-api-find-one.handler.js.map