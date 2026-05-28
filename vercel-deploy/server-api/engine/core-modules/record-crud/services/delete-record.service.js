"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteRecordService", {
    enumerable: true,
    get: function() {
        return DeleteRecordService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _commondeleteonequeryrunnerservice = require("../../../api/common/common-query-runners/common-delete-one-query-runner.service");
const _commondestroyonequeryrunnerservice = require("../../../api/common/common-query-runners/common-destroy-one-query-runner.service");
const _recordcrudexception = require("../exceptions/record-crud.exception");
const _commonapicontextbuilderservice = require("./common-api-context-builder.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteRecordService = class DeleteRecordService {
    async execute(params) {
        const { objectName, objectRecordId, authContext, soft = true } = params;
        if (!(0, _utils.isDefined)(objectRecordId) || !(0, _utils.isValidUuid)(objectRecordId)) {
            return {
                success: false,
                message: 'Failed to delete: Object record ID must be a valid UUID',
                error: 'Invalid object record ID'
            };
        }
        try {
            const { queryRunnerContext, selectedFields, flatObjectMetadata } = await this.commonApiContextBuilder.build({
                authContext,
                objectName
            });
            if (!(0, _workflow.canObjectBeManagedByAutomation)({
                nameSingular: flatObjectMetadata.nameSingular
            })) {
                throw new _recordcrudexception.RecordCrudException('Failed to delete: Object cannot be deleted by automation', _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
            }
            if (soft) {
                const { results: deletedRecord } = await this.commonDeleteOneRunner.execute({
                    id: objectRecordId,
                    selectedFields
                }, queryRunnerContext);
                this.logger.log(`Record soft deleted successfully from ${objectName}`);
                return {
                    success: true,
                    message: `Record soft deleted successfully from ${objectName}`,
                    result: deletedRecord
                };
            } else {
                const { results: destroyedRecord } = await this.commonDestroyOneRunner.execute({
                    id: objectRecordId,
                    selectedFields
                }, queryRunnerContext);
                this.logger.log(`Record permanently deleted successfully from ${objectName}`);
                return {
                    success: true,
                    message: `Record permanently deleted successfully from ${objectName}`,
                    result: destroyedRecord
                };
            }
        } catch (error) {
            if (error instanceof _recordcrudexception.RecordCrudException) {
                return {
                    success: false,
                    message: `Failed to delete record from ${objectName}`,
                    error: error.message
                };
            }
            this.logger.error(`Failed to delete record: ${error}`);
            return {
                success: false,
                message: `Failed to delete record from ${objectName}`,
                error: error instanceof Error ? error.message : 'Failed to delete record'
            };
        }
    }
    constructor(commonDeleteOneRunner, commonDestroyOneRunner, commonApiContextBuilder){
        this.commonDeleteOneRunner = commonDeleteOneRunner;
        this.commonDestroyOneRunner = commonDestroyOneRunner;
        this.commonApiContextBuilder = commonApiContextBuilder;
        this.logger = new _common.Logger(DeleteRecordService.name);
    }
};
DeleteRecordService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commondeleteonequeryrunnerservice.CommonDeleteOneQueryRunnerService === "undefined" ? Object : _commondeleteonequeryrunnerservice.CommonDeleteOneQueryRunnerService,
        typeof _commondestroyonequeryrunnerservice.CommonDestroyOneQueryRunnerService === "undefined" ? Object : _commondestroyonequeryrunnerservice.CommonDestroyOneQueryRunnerService,
        typeof _commonapicontextbuilderservice.CommonApiContextBuilderService === "undefined" ? Object : _commonapicontextbuilderservice.CommonApiContextBuilderService
    ])
], DeleteRecordService);

//# sourceMappingURL=delete-record.service.js.map