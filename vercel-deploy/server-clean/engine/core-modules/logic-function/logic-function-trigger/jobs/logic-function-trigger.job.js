"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionTriggerJob", {
    enumerable: true,
    get: function() {
        return LogicFunctionTriggerJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _logicfunctionexecutorservice = require("../../logic-function-executor/logic-function-executor.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionTriggerJob = class LogicFunctionTriggerJob {
    async handle(logicFunctionPayloads) {
        await Promise.all(logicFunctionPayloads.map(async (logicFunctionPayload)=>await this.logicFunctionExecutorService.execute({
                logicFunctionId: logicFunctionPayload.logicFunctionId,
                workspaceId: logicFunctionPayload.workspaceId,
                payload: logicFunctionPayload.payload ?? {},
                userId: logicFunctionPayload.userId,
                userWorkspaceId: logicFunctionPayload.userWorkspaceId
            })));
    }
    constructor(logicFunctionExecutorService){
        this.logicFunctionExecutorService = logicFunctionExecutorService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(LogicFunctionTriggerJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], LogicFunctionTriggerJob.prototype, "handle", null);
LogicFunctionTriggerJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.logicFunctionQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionexecutorservice.LogicFunctionExecutorService === "undefined" ? Object : _logicfunctionexecutorservice.LogicFunctionExecutorService
    ])
], LogicFunctionTriggerJob);

//# sourceMappingURL=logic-function-trigger.job.js.map