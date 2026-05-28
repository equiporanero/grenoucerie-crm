"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EvaluateAgentTurnJob", {
    enumerable: true,
    get: function() {
        return EvaluateAgentTurnJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../core-modules/message-queue/message-queue.constants");
const _agentturngraderservice = require("../services/agent-turn-grader.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EvaluateAgentTurnJob = class EvaluateAgentTurnJob {
    async handle(data) {
        if (!data.turnId) {
            throw new Error('Turn ID is required');
        }
        if (!data.workspaceId) {
            throw new Error('Workspace ID is required');
        }
        const evaluation = await this.graderService.evaluateTurn({
            turnId: data.turnId,
            workspaceId: data.workspaceId
        });
        this.logger.log(`Evaluation completed for turn ${data.turnId}: score=${evaluation.score}`);
    }
    constructor(graderService){
        this.graderService = graderService;
        this.logger = new _common.Logger(EvaluateAgentTurnJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(EvaluateAgentTurnJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof EvaluateAgentTurnJobData === "undefined" ? Object : EvaluateAgentTurnJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], EvaluateAgentTurnJob.prototype, "handle", null);
EvaluateAgentTurnJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.aiQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentturngraderservice.AgentTurnGraderService === "undefined" ? Object : _agentturngraderservice.AgentTurnGraderService
    ])
], EvaluateAgentTurnJob);

//# sourceMappingURL=evaluate-agent-turn.job.js.map