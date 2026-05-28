"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilesFieldDeletionJob", {
    enumerable: true,
    get: function() {
        return FilesFieldDeletionJob;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _filesfieldservice = require("../services/files-field.service");
const _processdecorator = require("../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FilesFieldDeletionJob = class FilesFieldDeletionJob {
    async handle(data) {
        const { workspaceId, fileIds } = data;
        if (!(0, _utils.isDefined)(fileIds) || fileIds.length === 0) {
            return;
        }
        for (const fileId of fileIds){
            try {
                await this.filesFieldService.deleteFilesFieldFile({
                    fileId,
                    workspaceId
                });
            } catch  {
                this.logger.log(`Failed to delete file ${fileId}`);
            }
        }
    }
    constructor(filesFieldService){
        this.filesFieldService = filesFieldService;
        this.logger = new _common.Logger(FilesFieldDeletionJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(FilesFieldDeletionJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof FilesFieldDeletionJobData === "undefined" ? Object : FilesFieldDeletionJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], FilesFieldDeletionJob.prototype, "handle", null);
FilesFieldDeletionJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.deleteCascadeQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filesfieldservice.FilesFieldService === "undefined" ? Object : _filesfieldservice.FilesFieldService
    ])
], FilesFieldDeletionJob);

//# sourceMappingURL=files-field-deletion.job.js.map