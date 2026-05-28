"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertRecordService", {
    enumerable: true,
    get: function() {
        return UpsertRecordService;
    }
});
const _common = require("@nestjs/common");
const _workflow = require("twenty-shared/workflow");
const _commoncreateonequeryrunnerservice = require("../../../api/common/common-query-runners/common-create-one-query-runner.service");
const _recordcrudexception = require("../exceptions/record-crud.exception");
const _commonapicontextbuilderservice = require("./common-api-context-builder.service");
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
let UpsertRecordService = class UpsertRecordService {
    async execute(params) {
        const { objectName, objectRecord, authContext } = params;
        try {
            const { queryRunnerContext, selectedFields, flatObjectMetadata } = await this.commonApiContextBuilder.build({
                authContext,
                objectName
            });
            if (!(0, _workflow.canObjectBeManagedByAutomation)({
                nameSingular: flatObjectMetadata.nameSingular
            })) {
                throw new _recordcrudexception.RecordCrudException('Failed to upsert: Object cannot be upserted by automation', _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
            }
            // Clean undefined values from the record data (including nested composite fields)
            // This prevents validation errors for partial composite field inputs
            const cleanedRecord = (0, _removeundefinedfromrecordutil.removeUndefinedFromRecord)(objectRecord);
            // Use Common API with upsert flag - it handles conflict detection automatically
            const { results: upsertedRecord } = await this.commonCreateOneRunner.execute({
                data: cleanedRecord,
                selectedFields,
                upsert: true
            }, queryRunnerContext);
            this.logger.log(`Record upserted successfully in ${objectName}`);
            return {
                success: true,
                message: `Record upserted successfully in ${objectName}`,
                result: upsertedRecord
            };
        } catch (error) {
            if (error instanceof _recordcrudexception.RecordCrudException) {
                return {
                    success: false,
                    message: `Failed to upsert record in ${objectName}`,
                    error: error.message
                };
            }
            this.logger.error(`Failed to upsert record: ${error}`);
            return {
                success: false,
                message: `Failed to upsert record in ${objectName}`,
                error: error instanceof Error ? error.message : 'Failed to upsert record'
            };
        }
    }
    constructor(commonCreateOneRunner, commonApiContextBuilder){
        this.commonCreateOneRunner = commonCreateOneRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.logger = new _common.Logger(UpsertRecordService.name);
    }
};
UpsertRecordService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService === "undefined" ? Object : _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService
    ])
], UpsertRecordService);

//# sourceMappingURL=upsert-record.service.js.map