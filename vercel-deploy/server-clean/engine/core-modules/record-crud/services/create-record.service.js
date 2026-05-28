"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateRecordService", {
    enumerable: true,
    get: function() {
        return CreateRecordService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _workflow = require("twenty-shared/workflow");
const _commoncreateonequeryrunnerservice = require("../../../api/common/common-query-runners/common-create-one-query-runner.service");
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
let CreateRecordService = class CreateRecordService {
    async execute(params) {
        const { objectName, objectRecord, authContext } = params;
        try {
            const { queryRunnerContext, selectedFields, flatObjectMetadata, flatFieldMetadataMaps } = await this.commonApiContextBuilder.build({
                authContext,
                objectName
            });
            if (!(0, _workflow.canObjectBeManagedByAutomation)({
                nameSingular: flatObjectMetadata.nameSingular
            })) {
                throw new _recordcrudexception.RecordCrudException('Failed to create: Object cannot be created by automation', _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
            }
            // Pass createdBy explicitly if provided (for workflows)
            // Common API hook will also inject createdBy from authContext if available
            const actorMetadata = params.createdBy ?? {
                source: _types.FieldActorSource.WORKFLOW,
                name: 'Workflow'
            };
            // Clean undefined values from the record data (including nested composite fields)
            // This prevents validation errors for partial composite field inputs
            const cleanedRecord = (0, _removeundefinedfromrecordutil.removeUndefinedFromRecord)(objectRecord);
            const dataWithActor = {
                ...cleanedRecord,
                createdBy: actorMetadata
            };
            const { results: createdRecord } = await this.commonCreateOneRunner.execute({
                data: dataWithActor,
                selectedFields
            }, queryRunnerContext);
            this.logger.log(`Record created successfully in ${objectName}`);
            return {
                success: true,
                message: `Record created successfully in ${objectName}`,
                result: params.slimResponse ? {
                    id: createdRecord.id
                } : createdRecord,
                recordReferences: [
                    {
                        objectNameSingular: objectName,
                        recordId: createdRecord.id,
                        displayName: (0, _getrecorddisplaynameutil.getRecordDisplayName)(createdRecord, flatObjectMetadata, flatFieldMetadataMaps)
                    }
                ]
            };
        } catch (error) {
            if (error instanceof _recordcrudexception.RecordCrudException) {
                return {
                    success: false,
                    message: `Failed to create record in ${objectName}`,
                    error: error.message
                };
            }
            this.logger.error(`Failed to create record: ${error}`);
            return {
                success: false,
                message: `Failed to create record in ${objectName}`,
                error: error instanceof Error ? error.message : 'Failed to create record'
            };
        }
    }
    constructor(commonCreateOneRunner, commonApiContextBuilder){
        this.commonCreateOneRunner = commonCreateOneRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.logger = new _common.Logger(CreateRecordService.name);
    }
};
CreateRecordService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService === "undefined" ? Object : _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService
    ])
], CreateRecordService);

//# sourceMappingURL=create-record.service.js.map