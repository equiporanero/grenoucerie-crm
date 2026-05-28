"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonUpdateOneQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonUpdateOneQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commonupdatemanyqueryrunnerservice = require("./common-update-many-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _commonqueryargstype = require("../types/common-query-args.type");
const _assertisvaliduuidutil = require("../../graphql/workspace-query-runner/utils/assert-is-valid-uuid.util");
const _assertmutationnotonremoteobjectutil = require("../../../metadata-modules/object-metadata/utils/assert-mutation-not-on-remote-object.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CommonUpdateOneQueryRunnerService = class CommonUpdateOneQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const result = await this.commonUpdateManyQueryRunnerService.run({
            ...args,
            filter: {
                id: {
                    eq: args.id
                }
            }
        }, queryRunnerContext);
        if (!result || result.length === 0) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Record not found', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "0arbc4",
                    message: "This record does not exist or has been deleted."
                }
            });
        }
        return result[0];
    }
    async computeArgs(args, queryRunnerContext) {
        const { authContext, flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps } = queryRunnerContext;
        return {
            ...args,
            data: (await this.dataArgProcessor.process({
                partialRecordInputs: [
                    args.data
                ],
                authContext,
                flatObjectMetadata,
                flatFieldMetadataMaps,
                flatObjectMetadataMaps,
                shouldBackfillPositionIfUndefined: false
            }))[0]
        };
    }
    async processQueryResult(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext) {
        return this.commonResultGettersService.processRecord(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id);
    }
    async validate(args, queryRunnerContext) {
        const { flatObjectMetadata } = queryRunnerContext;
        (0, _assertmutationnotonremoteobjectutil.assertMutationNotOnRemoteObject)(flatObjectMetadata);
        (0, _assertisvaliduuidutil.assertIsValidUuid)(args.id);
    }
    constructor(commonUpdateManyQueryRunnerService){
        super(), this.commonUpdateManyQueryRunnerService = commonUpdateManyQueryRunnerService, this.operationName = _commonqueryargstype.CommonQueryNames.UPDATE_ONE;
    }
};
CommonUpdateOneQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonupdatemanyqueryrunnerservice.CommonUpdateManyQueryRunnerService === "undefined" ? Object : _commonupdatemanyqueryrunnerservice.CommonUpdateManyQueryRunnerService
    ])
], CommonUpdateOneQueryRunnerService);

//# sourceMappingURL=common-update-one-query-runner.service.js.map