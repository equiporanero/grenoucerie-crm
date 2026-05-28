"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonFindOneQueryRunnerService", {
    enumerable: true,
    get: function() {
        return CommonFindOneQueryRunnerService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _commonbasequeryrunnerservice = require("./common-base-query-runner.service");
const _commonqueryrunnerexception = require("./errors/common-query-runner.exception");
const _standarderrormessageconstant = require("./errors/standard-error-message.constant");
const _commonqueryargstype = require("../types/common-query-args.type");
const _buildcolumnstoselect = require("../../graphql/graphql-query-runner/utils/build-columns-to-select");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommonFindOneQueryRunnerService = class CommonFindOneQueryRunnerService extends _commonbasequeryrunnerservice.CommonBaseQueryRunnerService {
    async run(args, queryRunnerContext) {
        const { repository, authContext, rolePermissionConfig, workspaceDataSource, flatObjectMetadataMaps, flatFieldMetadataMaps, flatObjectMetadata, commonQueryParser } = queryRunnerContext;
        const queryBuilder = repository.createQueryBuilder(flatObjectMetadata.nameSingular);
        commonQueryParser.applyFilterToBuilder(queryBuilder, flatObjectMetadata.nameSingular, args.filter ?? {});
        commonQueryParser.applyDeletedAtToBuilder(queryBuilder, args.filter ?? {});
        const columnsToSelect = (0, _buildcolumnstoselect.buildColumnsToSelect)({
            select: args.selectedFieldsResult.select,
            relations: args.selectedFieldsResult.relations,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        const objectRecord = await queryBuilder.setFindOptions({
            select: columnsToSelect
        }).getOne();
        if (!objectRecord) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Record not found', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.RECORD_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "0arbc4",
                    message: "This record does not exist or has been deleted."
                }
            });
        }
        const objectRecords = [
            objectRecord
        ];
        if ((0, _utils.isDefined)(args.selectedFieldsResult.relations)) {
            await this.processNestedRelationsHelper.processNestedRelations({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                parentObjectMetadataItem: flatObjectMetadata,
                parentObjectRecords: objectRecords,
                relations: args.selectedFieldsResult.relations,
                limit: _constants.QUERY_MAX_RECORDS_FROM_RELATION,
                authContext,
                workspaceDataSource,
                rolePermissionConfig,
                selectedFields: args.selectedFieldsResult.select
            });
        }
        return objectRecords[0];
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
        return this.commonResultGettersService.processRecord(queryResult, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, authContext.workspace.id);
    }
    async validate(args, _queryRunnerContext) {
        if (!args.filter || Object.keys(args.filter).length === 0) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('Missing filter argument', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
    }
    constructor(...args){
        super(...args), this.operationName = _commonqueryargstype.CommonQueryNames.FIND_ONE;
    }
};
CommonFindOneQueryRunnerService = _ts_decorate([
    (0, _common.Injectable)()
], CommonFindOneQueryRunnerService);

//# sourceMappingURL=common-find-one-query-runner.service.js.map