"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileDeletionJob", {
    enumerable: true,
    get: function() {
        return FileDeletionJob;
    }
});
const _filestorageservice = require("../../file-storage/file-storage.service");
const _processdecorator = require("../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FileDeletionJob = class FileDeletionJob {
    async handle({ workspaceId, fileId, fileFolder }) {
        try {
            await this.fileStorageService.deleteByFileId({
                fileId,
                workspaceId,
                fileFolder
            });
        } catch  {
            throw new Error(`[${FileDeletionJob.name}] Cannot delete file - ${fileId} in folder ${fileFolder}`);
        }
    }
    constructor(fileStorageService){
        this.fileStorageService = fileStorageService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(FileDeletionJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof FileDeletionJobData === "undefined" ? Object : FileDeletionJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], FileDeletionJob.prototype, "handle", null);
FileDeletionJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.deleteCascadeQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService
    ])
], FileDeletionJob);

//# sourceMappingURL=file-deletion.job.js.map