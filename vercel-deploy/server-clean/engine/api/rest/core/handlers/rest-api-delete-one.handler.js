"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiDeleteOneHandler", {
    enumerable: true,
    get: function() {
        return RestApiDeleteOneHandler;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commondeleteonequeryrunnerservice = require("../../../common/common-query-runners/common-delete-one-query-runner.service");
const _restapibasehandler = require("./rest-api-base.handler");
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
let RestApiDeleteOneHandler = class RestApiDeleteOneHandler extends _restapibasehandler.RestApiBaseHandler {
    async handle(request) {
        try {
            const { id } = this.parseRequestArgs(request);
            const { authContext, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.buildCommonOptions(request);
            const { results: record } = await this.commonDeleteOneQueryRunnerService.execute({
                id,
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
            return this.formatRestResponse(record, flatObjectMetadata.nameSingular);
        } catch (error) {
            return (0, _workspacequeryrunnerrestapiexceptionhandlerutil.workspaceQueryRunnerRestApiExceptionHandler)(error);
        }
    }
    formatRestResponse(record, objectNameSingular) {
        return {
            data: {
                [`delete${(0, _utils.capitalize)(objectNameSingular)}`]: record
            }
        };
    }
    parseRequestArgs(request) {
        const { id } = (0, _parsecorepathutils.parseCorePath)(request);
        if (!(0, _utils.isDefined)(id)) {
            throw new _common.BadRequestException('Record ID not found');
        }
        return {
            id
        };
    }
    constructor(commonDeleteOneQueryRunnerService){
        super(), this.commonDeleteOneQueryRunnerService = commonDeleteOneQueryRunnerService;
    }
};
RestApiDeleteOneHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commondeleteonequeryrunnerservice.CommonDeleteOneQueryRunnerService === "undefined" ? Object : _commondeleteonequeryrunnerservice.CommonDeleteOneQueryRunnerService
    ])
], RestApiDeleteOneHandler);

//# sourceMappingURL=rest-api-delete-one.handler.js.map