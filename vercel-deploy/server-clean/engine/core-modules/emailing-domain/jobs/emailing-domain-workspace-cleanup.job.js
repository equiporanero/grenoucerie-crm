"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainWorkspaceCleanupJob", {
    enumerable: true,
    get: function() {
        return EmailingDomainWorkspaceCleanupJob;
    }
});
const _emailingdomainservice = require("../services/emailing-domain.service");
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
let EmailingDomainWorkspaceCleanupJob = class EmailingDomainWorkspaceCleanupJob {
    async handle(data) {
        const { workspaceId } = data;
        try {
            await this.emailingDomainService.cleanupAllEmailingDomainsForWorkspace(workspaceId);
        } catch (error) {
            throw new Error(`[${EmailingDomainWorkspaceCleanupJob.name}] Cannot cleanup emailing domains - ${workspaceId} - ${error?.message || error}`);
        }
    }
    constructor(emailingDomainService){
        this.emailingDomainService = emailingDomainService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(EmailingDomainWorkspaceCleanupJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof EmailingDomainWorkspaceCleanupJobData === "undefined" ? Object : EmailingDomainWorkspaceCleanupJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailingDomainWorkspaceCleanupJob.prototype, "handle", null);
EmailingDomainWorkspaceCleanupJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.deleteCascadeQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailingdomainservice.EmailingDomainService === "undefined" ? Object : _emailingdomainservice.EmailingDomainService
    ])
], EmailingDomainWorkspaceCleanupJob);

//# sourceMappingURL=emailing-domain-workspace-cleanup.job.js.map