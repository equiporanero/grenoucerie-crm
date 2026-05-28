"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonCreateOneQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonCreateOneQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commoncreatemanyqueryrunnerservice = require("./common-create-many-query-runner/common-create-many-query-runner.service");
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
let CommonCreateOneQueryRunnerService = class CommonCreateOneQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const result = await this.commonCreateManyQueryRunnerService.run({
            ...args,
            data: [
                args.data
            ]
        }, queryRunnerContext);
        return result[0];
    }
    async computeArgs(args, queryRunnerContext) {
        const { authContext, flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps } = queryRunnerContext;
        const coercedData = await this.dataArgProcessor.process({
            partialRecordInputs: [
                args.data
            ],
            authContext,
            flatObjectMetadata,
            flatFieldMetadataMaps,
            flatObjectMetadataMaps
        });
        return {
            ...args,
            data: coercedData[0]
        };
    }
    async processQueryResult(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext) {
        return this.commonResultGettersService.processRecord(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id);
    }
    async validate(args, queryRunnerContext) {
        const { flatObjectMetadata } = queryRunnerContext;
        (0, _assertmutationnotonremoteobjectutil.assertMutationNotOnRemoteObject)(flatObjectMetadata);
        if (args.data?.id) {
            (0, _assertisvaliduuidutil.assertIsValidUuid)(args.data.id);
        }
    }
    constructor(commonCreateManyQueryRunnerService){
        super(), this.commonCreateManyQueryRunnerService = commonCreateManyQueryRunnerService, this.operationName = _commonqueryargstype.CommonQueryNames.CREATE_ONE;
    }
};
CommonCreateOneQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commoncreatemanyqueryrunnerservice.CommonCreateManyQueryRunnerService === "undefined" ? Object : _commoncreatemanyqueryrunnerservice.CommonCreateManyQueryRunnerService
    ])
], CommonCreateOneQueryRunnerService);

//# sourceMappingURL=common-create-one-query-runner.service.js.map