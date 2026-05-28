"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonDestroyManyQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonDestroyManyQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _buildmutationquerybuilderutil = require("./utils/build-mutation-query-builder.util");
const _commonqueryargstype = require("../types/common-query-args.type");
const _buildcolumnstoreturn = require("../../graphql/graphql-query-runner/utils/build-columns-to-return");
const _assertisvaliduuidutil = require("../../graphql/workspace-query-runner/utils/assert-is-valid-uuid.util");
const _assertmutationnotonremoteobjectutil = require("../../../metadata-modules/object-metadata/utils/assert-mutation-not-on-remote-object.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommonDestroyManyQueryRunnerService = class CommonDestroyManyQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const { repository, authContext, rolePermissionConfig, workspaceDataSource, flatObjectMetadataMaps, flatFieldMetadataMaps, flatObjectMetadata, commonQueryParser } = queryRunnerContext;
        const queryBuilder = (0, _buildmutationquerybuilderutil.buildMutationQueryBuilder)({
            repository,
            alias: flatObjectMetadata.nameSingular,
            filter: args.filter,
            commonQueryParser
        });
        const columnsToReturn = (0, _buildcolumnstoreturn.buildColumnsToReturn)({
            select: args.selectedFieldsResult.select,
            relations: args.selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        const destroyedObjectRecords = await queryBuilder.delete().returning(columnsToReturn).execute();
        const destroyedRecords = destroyedObjectRecords.generatedMaps;
        if ((0, _utils.isDefined)(args.selectedFieldsResult.relations)) {
            await this.processNestedRelationsHelper.processNestedRelations({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem: flatObjectMetadata,
                parentObjectRecords: destroyedRecords,
                relations: args.selectedFieldsResult.relations,
                limit: _constants.QUERY_MAX_RECORDS_FROM_RELATION,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields: args.selectedFieldsResult.select
            });
        }
        return destroyedRecords;
    }
    async computeArgs(args, queryRunnerContext) {
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = queryRunnerContext;
        return {
            ...args,
            filter: this.filterArgProcessor.process({
                filter: args.filter,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps
            })
        };
    }
    async processQueryResult(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext) {
        return this.commonResultGettersService.processRecordArray(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id);
    }
    async validate(args, queryRunnerContext) {
        const { flatObjectMetadata } = queryRunnerContext;
        (0, _assertmutationnotonremoteobjectutil.assertMutationNotOnRemoteObject)(flatObjectMetadata);
        if (!(0, _utils.isDefined)(args.filter)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Filter is required', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        args.filter.id?.in?.forEach((id)=>(0, _assertisvaliduuidutil.assertIsValidUuid)(id));
    }
    constructor(...args){
        super(...args), this.operationName = _commonqueryargstype.CommonQueryNames.DESTROY_MANY;
    }
};
CommonDestroyManyQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)()
], CommonDestroyManyQueryRunnerService);

//# sourceMappingURL=common-destroy-many-query-runner.service.js.map