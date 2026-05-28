"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonDestroyOneQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonDestroyOneQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commondestroymanyqueryrunnerservice = require("./common-destroy-many-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _commonqueryargstype = require("../types/common-query-args.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CommonDestroyOneQueryRunnerService = class CommonDestroyOneQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const result = await this.commonDestroyManyQueryRunnerService.run({
            ...args,
            filter: {
                id: {
                    eq: args.id
                }
            }
        }, queryRunnerContext);
        if (!(0, _utils.isDefined)(result) || result.length === 0) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Record not found', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "0arbc4",
                    message: "This record does not exist or has been deleted."
                }
            });
        }
        return result[0];
    }
    async computeArgs(args, _queryRunnerContext) {
        return args;
    }
    async processQueryResult(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext) {
        return this.commonResultGettersService.processRecord(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id);
    }
    async validate(args, _queryRunnerContext) {
        if (!(0, _utils.isDefined)(args.id)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Missing id', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    constructor(commonDestroyManyQueryRunnerService){
        super(), this.commonDestroyManyQueryRunnerService = commonDestroyManyQueryRunnerService, this.operationName = _commonqueryargstype.CommonQueryNames.DESTROY_ONE;
    }
};
CommonDestroyOneQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commondestroymanyqueryrunnerservice.CommonDestroyManyQueryRunnerService === "undefined" ? Object : _commondestroymanyqueryrunnerservice.CommonDestroyManyQueryRunnerService
    ])
], CommonDestroyOneQueryRunnerService);

//# sourceMappingURL=common-destroy-one-query-runner.service.js.map