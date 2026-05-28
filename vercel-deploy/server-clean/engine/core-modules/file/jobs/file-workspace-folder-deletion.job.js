"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileWorkspaceFolderDeletionJob", {
    enumerable: true,
    get: function() {
        return FileWorkspaceFolderDeletionJob;
    }
});
const _fileservice = require("../services/file.service");
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
let FileWorkspaceFolderDeletionJob = class FileWorkspaceFolderDeletionJob {
    async handle(data) {
        const { workspaceId } = data;
        try {
            await this.fileService.deleteWorkspaceFolder(workspaceId);
        } catch (error) {
            throw new Error(`[${FileWorkspaceFolderDeletionJob.name}] Cannot delete workspace folder - ${workspaceId} - ${error?.message || error}`);
        }
    }
    constructor(fileService){
        this.fileService = fileService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(FileWorkspaceFolderDeletionJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof FileWorkspaceFolderDeletionJobData === "undefined" ? Object : FileWorkspaceFolderDeletionJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], FileWorkspaceFolderDeletionJob.prototype, "handle", null);
FileWorkspaceFolderDeletionJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.deleteCascadeQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fileservice.FileService === "undefined" ? Object : _fileservice.FileService
    ])
], FileWorkspaceFolderDeletionJob);

//# sourceMappingURL=file-workspace-folder-deletion.job.js.map