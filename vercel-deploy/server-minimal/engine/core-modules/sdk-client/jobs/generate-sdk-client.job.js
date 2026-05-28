"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GenerateSdkClientJob", {
    enumerable: true,
    get: function() {
        return GenerateSdkClientJob;
    }
});
const _processordecorator = require("../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _processdecorator = require("../../message-queue/decorators/process.decorator");
const _generatesdkclientjobconstants = require("./generate-sdk-client.job-constants");
const _sdkclientgenerationservice = require("../sdk-client-generation.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GenerateSdkClientJob = class GenerateSdkClientJob {
    async handle(data) {
        await this.sdkClientGenerationService.generateSdkClientForApplication({
            workspaceId: data.workspaceId,
            applicationId: data.applicationId,
            applicationUniversalIdentifier: data.applicationUniversalIdentifier
        });
    }
    constructor(sdkClientGenerationService){
        this.sdkClientGenerationService = sdkClientGenerationService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(_generatesdkclientjobconstants.GENERATE_SDK_CLIENT_JOB_NAME),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof GenerateSdkClientJobData === "undefined" ? Object : GenerateSdkClientJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], GenerateSdkClientJob.prototype, "handle", null);
GenerateSdkClientJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.workspaceQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sdkclientgenerationservice.SdkClientGenerationService === "undefined" ? Object : _sdkclientgenerationservice.SdkClientGenerationService
    ])
], GenerateSdkClientJob);

//# sourceMappingURL=generate-sdk-client.job.js.map