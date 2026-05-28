"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FindRecordsService", {
    enumerable: true,
    get: function() {
        return FindRecordsService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _commonfindmanyqueryrunnerservice = require("../../../api/common/common-query-runners/common-find-many-query-runner.service");
const _commonapicontextbuilderservice = require("./common-api-context-builder.service");
const _getrecorddisplaynameutil = require("../utils/get-record-display-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FindRecordsService = class FindRecordsService {
    async execute(params) {
        const { objectName, filter, orderBy, limit, offset = 0, authContext } = params;
        try {
            const { queryRunnerContext, selectedFields, flatObjectMetadata, flatFieldMetadataMaps } = await this.commonApiContextBuilder.build({
                authContext,
                objectName
            });
            // Add id to orderBy for consistent pagination
            const orderByWithIdCondition = [
                ...(orderBy ?? []).filter((item)=>item !== undefined),
                {
                    id: _types.OrderByDirection.AscNullsFirst
                }
            ];
            const { results: { records, totalCount } } = await this.commonFindManyRunner.execute({
                filter,
                orderBy: orderByWithIdCondition,
                first: limit ? Math.min(limit, _constants.QUERY_MAX_RECORDS) : _constants.QUERY_MAX_RECORDS,
                offset,
                selectedFields: {
                    ...selectedFields,
                    totalCount: true
                }
            }, queryRunnerContext);
            this.logger.log(`Found ${records.length} records in ${objectName}`);
            const recordReferences = records.map((record)=>({
                    objectNameSingular: objectName,
                    recordId: record.id,
                    displayName: (0, _getrecorddisplaynameutil.getRecordDisplayName)(record, flatObjectMetadata, flatFieldMetadataMaps)
                }));
            return {
                success: true,
                message: `Found ${records.length} ${objectName} records`,
                result: {
                    records,
                    count: totalCount
                },
                recordReferences
            };
        } catch (error) {
            this.logger.error(`Failed to find records: ${error}`);
            return {
                success: false,
                message: `Failed to find ${objectName} records`,
                error: error instanceof Error ? error.message : 'Failed to find records'
            };
        }
    }
    constructor(commonFindManyRunner, commonApiContextBuilder){
        this.commonFindManyRunner = commonFindManyRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.logger = new _common.Logger(FindRecordsService.name);
    }
};
FindRecordsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonfindmanyqueryrunnerservice.CommonFindManyQueryRunnerService === "undefined" ? Object : _commonfindmanyqueryrunnerservice.CommonFindManyQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService
    ])
], FindRecordsService);

//# sourceMappingURL=find-records.service.js.map