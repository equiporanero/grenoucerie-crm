"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateRecordService", {
    enumerable: true,
    get: function() {
        return UpdateRecordService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _commonupdateonequeryrunnerservice = require("../../../api/common/common-query-runners/common-update-one-query-runner.service");
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
let UpdateRecordService = class UpdateRecordService {
    async execute(params) {
        const { objectName, objectRecordId, objectRecord, fieldsToUpdate, authContext } = params;
        if (!(0, _utils.isDefined)(objectRecordId) || !(0, _utils.isValidUuid)(objectRecordId)) {
            return {
                success: false,
                message: 'Failed to update: Object record ID must be a valid UUID',
                error: 'Invalid object record ID'
            };
        }
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
            const fieldsToUpdateArray = fieldsToUpdate ?? Object.keys(objectRecord);
            if (fieldsToUpdateArray.length === 0) {
                return {
                    success: true,
                    message: 'No fields to update',
                    result: undefined
                };
            }
            // Filter objectRecord to only include fieldsToUpdate
            const filteredObjectRecord = Object.keys(objectRecord).reduce((acc, key)=>{
                if (fieldsToUpdateArray.includes(key)) {
                    return {
                        ...acc,
                        [key]: objectRecord[key]
                    };
                }
                return acc;
            }, {});
            // Clean undefined values from the record data (including nested composite fields)
            // This prevents validation errors for partial composite field inputs
            const cleanedRecord = (0, _removeundefinedfromrecordutil.removeUndefinedFromRecord)(filteredObjectRecord);
            const { results: updatedRecord } = await this.commonUpdateOneRunner.execute({
                id: objectRecordId,
                data: cleanedRecord,
                selectedFields
            }, queryRunnerContext);
            this.logger.log(`Record updated successfully in ${objectName}`);
            return {
                success: true,
                message: `Record updated successfully in ${objectName}`,
                result: params.slimResponse ? {
                    id: objectRecordId
                } : updatedRecord,
                recordReferences: [
                    {
                        objectNameSingular: objectName,
                        recordId: objectRecordId,
                        displayName: (0, _getrecorddisplaynameutil.getRecordDisplayName)(updatedRecord, flatObjectMetadata, flatFieldMetadataMaps)
                    }
                ]
            };
        } catch (error) {
            if (error instanceof _recordcrudexception.RecordCrudException) {
                return {
                    success: false,
                    message: `Failed to update record in ${objectName}`,
                    error: error.message
                };
            }
            this.logger.error(`Failed to update record: ${error}`);
            return {
                success: false,
                message: `Failed to update record in ${objectName}`,
                error: error instanceof Error ? error.message : 'Failed to update record'
            };
        }
    }
    constructor(commonUpdateOneRunner, commonApiContextBuilder){
        this.commonUpdateOneRunner = commonUpdateOneRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.logger = new _common.Logger(UpdateRecordService.name);
    }
};
UpdateRecordService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commonupdateonequeryrunnerservice.CommonUpdateOneQueryRunnerService === "undefined" ? Object : _commonupdateonequeryrunnerservice.CommonUpdateOneQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService
    ])
], UpdateRecordService);

//# sourceMappingURL=update-record.service.js.map