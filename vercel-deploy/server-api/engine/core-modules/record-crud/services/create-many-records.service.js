"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateManyRecordsService", {
    enumerable: true,
    get: function() {
        return CreateManyRecordsService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _workflow = require("twenty-shared/workflow");
const _commoncreatemanyqueryrunnerservice = require("../../../api/common/common-query-runners/common-create-many-query-runner/common-create-many-query-runner.service");
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
let CreateManyRecordsService = class CreateManyRecordsService {
    async execute(params) {
        const { objectName, objectRecords, authContext } = params;
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
            const actorMetadata = params.createdBy ?? {
                source: _types.FieldActorSource.WORKFLOW,
                name: 'Workflow'
            };
            const cleanedRecords = objectRecords.map((record)=>({
                    ...(0, _removeundefinedfromrecordutil.removeUndefinedFromRecord)(record),
                    createdBy: actorMetadata
                }));
            const { results: createdRecords } = await this.commonCreateManyRunner.execute({
                data: cleanedRecords,
                selectedFields
            }, queryRunnerContext);
            this.logger.log(`Created ${createdRecords.length} records in ${objectName}`);
            return {
                success: true,
                message: `Created ${createdRecords.length} records in ${objectName}`,
                result: params.slimResponse ? createdRecords.map((record)=>({
                        id: record.id
                    })) : createdRecords,
                recordReferences: createdRecords.map((record)=>({
                        objectNameSingular: objectName,
                        recordId: record.id,
                        displayName: (0, _getrecorddisplaynameutil.getRecordDisplayName)(record, flatObjectMetadata, flatFieldMetadataMaps)
                    }))
            };
        } catch (error) {
            if (error instanceof _recordcrudexception.RecordCrudException) {
                return {
                    success: false,
                    message: `Failed to create records in ${objectName}`,
                    error: error.message
                };
            }
            this.logger.error(`Failed to create records: ${error}`);
            return {
                success: false,
                message: `Failed to create records in ${objectName}`,
                error: error instanceof Error ? error.message : 'Failed to create records'
            };
        }
    }
    constructor(commonCreateManyRunner, commonApiContextBuilder){
        this.commonCreateManyRunner = commonCreateManyRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.logger = new _common.Logger(CreateManyRecordsService.name);
    }
};
CreateManyRecordsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commoncreatemanyqueryrunnerservice.CommonCreateManyQueryRunnerService === "undefined" ? Object : _commoncreatemanyqueryrunnerservice.CommonCreateManyQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService
    ])
], CreateManyRecordsService);

//# sourceMappingURL=create-many-records.service.js.map