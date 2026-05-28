"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateManyRecordsService", {
    enumerable: true,
    get: function() {
        return UpdateManyRecordsService;
    }
});
const _common = require("@nestjs/common");
const _workflow = require("twenty-shared/workflow");
const _commonupdatemanyqueryrunnerservice = require("../../../api/common/common-query-runners/common-update-many-query-runner.service");
const _recordcrudexception = require("../exceptions/record-crud.exception");
const _commonapicontextbuilderservice = require("./common-api-context-builder.service");
const _getrecorddisplaynameutil = require("../utils/get-record-display-name.util");
const _removeundefinedfromrecordutil = require("../utils/remove-undefined-from-record.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateManyRecordsService = class UpdateManyRecordsService {
    async execute(params) {
        const { objectName, filter, data, authContext } = params;
        try {
            const { queryRunnerContext, selectedFields, flatObjectMetadata, flatFieldMetadataMaps } = await this.commonApiContextBuilder.build({
                authContext,
                objectName
            });
            if (!(0, _workflow.canObjectBeManagedByAutomation)({
                nameSingular: flatObjectMetadata.nameSingular
            })) {
                throw new _recordcrudexception.RecordCrudException('Failed to update: Object cannot be updated by automation', _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
            }
            const cleanedData = (0, _removeundefinedfromrecordutil.removeUndefinedFromRecord)(data);
            const { results: updatedRecords } = await this.commonUpdateManyRunner.execute({
                filter,
                data: cleanedData,
                selectedFields
            }, queryRunnerContext);
            this.logger.log(`Updated ${updatedRecords.length} records in ${objectName}`);
            return {
                success: true,
                message: `Updated ${updatedRecords.length} records in ${objectName}`,
                result: params.slimResponse ? updatedRecords.map((record)=>({
                        id: record.id
                    })) : updatedRecords,
                recordReferences: updatedRecords.map((record)=>({
                        objectNameSingular: objectName,
                        recordId: record.id,
                        displayName: (0, _getrecorddisplaynameutil.getRecordDisplayName)(record, flatObjectMetadata, flatFieldMetadataMaps)
                    }))
            };
        } catch (error) {
            if (error instanceof _recordcrudexception.RecordCrudException) {
                return {
                    success: false,
                    message: `Failed to update records in ${objectName}`,
                    error: error.message
                };
            }
            this.logger.error(`Failed to update records: ${error}`);
            return {
                success: false,
                message: `Failed to update records in ${objectName}`,
                error: error instanceof Error ? error.message : 'Failed to update records'
            };
        }
    }
    constructor(commonUpdateManyRunner, commonApiContextBuilder){
        this.commonUpdateManyRunner = commonUpdateManyRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.logger = new _common.Logger(UpdateManyRecordsService.name);
    }
};
UpdateManyRecordsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonupdatemanyqueryrunnerservice.CommonUpdateManyQueryRunnerService === "undefined" ? Object : _commonupdatemanyqueryrunnerservice.CommonUpdateManyQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService
    ])
], UpdateManyRecordsService);

//# sourceMappingURL=update-many-records.service.js.map