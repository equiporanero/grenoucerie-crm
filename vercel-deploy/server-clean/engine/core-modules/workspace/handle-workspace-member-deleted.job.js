"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HandleWorkspaceMemberDeletedJob", {
    enumerable: true,
    get: function() {
        return HandleWorkspaceMemberDeletedJob;
    }
});
const _workspaceservice = require("./services/workspace.service");
const _processordecorator = require("../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../message-queue/message-queue.constants");
const _processdecorator = require("../message-queue/decorators/process.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let HandleWorkspaceMemberDeletedJob = class HandleWorkspaceMemberDeletedJob {
    async handle(data) {
        const { workspaceId, userId } = data;
        await this.workspaceService.handleRemoveWorkspaceMember(workspaceId, userId);
    }
    constructor(workspaceService){
        this.workspaceService = workspaceService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(HandleWorkspaceMemberDeletedJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof HandleWorkspaceMemberDeletedJobData === "undefined" ? Object : HandleWorkspaceMemberDeletedJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], HandleWorkspaceMemberDeletedJob.prototype, "handle", null);
HandleWorkspaceMemberDeletedJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.workspaceQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceservice.WorkspaceService === "undefined" ? Object : _workspaceservice.WorkspaceService
    ])
], HandleWorkspaceMemberDeletedJob);

//# sourceMappingURL=handle-workspace-member-deleted.job.js.map