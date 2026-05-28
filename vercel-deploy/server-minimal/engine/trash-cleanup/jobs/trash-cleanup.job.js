"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TrashCleanupJob", {
    enumerable: true,
    get: function() {
        return TrashCleanupJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../core-modules/message-queue/message-queue.constants");
const _trashcleanupservice = require("../services/trash-cleanup.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TrashCleanupJob = class TrashCleanupJob {
    async handle(data) {
        const { workspaceId, trashRetentionDays } = data;
        try {
            await this.trashCleanupService.cleanupWorkspaceTrash({
                workspaceId,
                trashRetentionDays
            });
        } catch (error) {
            this.logger.error(`Trash cleanup failed for workspace ${workspaceId}`, error instanceof Error ? error.stack : String(error));
            throw error;
        }
    }
    constructor(trashCleanupService){
        this.trashCleanupService = trashCleanupService;
        this.logger = new _common.Logger(TrashCleanupJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(TrashCleanupJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof TrashCleanupJobData === "undefined" ? Object : TrashCleanupJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], TrashCleanupJob.prototype, "handle", null);
TrashCleanupJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.workspaceQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _trashcleanupservice.TrashCleanupService === "undefined" ? Object : _trashcleanupservice.TrashCleanupService
    ])
], TrashCleanupJob);

//# sourceMappingURL=trash-cleanup.job.js.map