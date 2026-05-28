/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RotateSigningKeysCronJob", {
    enumerable: true,
    get: function() {
        return RotateSigningKeysCronJob;
    }
});
const _common = require("@nestjs/common");
const _sentrycronmonitordecorator = require("../../../cron/sentry-cron-monitor.decorator");
const _enterpriseplanservice = require("../../../enterprise/services/enterprise-plan.service");
const _rotatesigningkeyscronpatternconstant = require("../../constants/rotate-signing-keys-cron-pattern.constant");
const _signingkeyrotationservice = require("../../services/signing-key-rotation.service");
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
let RotateSigningKeysCronJob = class RotateSigningKeysCronJob {
    async handle() {
        if (!this.enterprisePlanService.isValid()) {
            this.logger.log('Enterprise plan not valid, skipping signing key rotation');
            return;
        }
        try {
            const result = await this.signingKeyRotationService.rotateIfDue();
            if (result.rotated) {
                this.logger.log(`Rotated current signing key: ${result.previousId} -> ${result.newId}`);
            }
        } catch (error) {
            this.logger.error(`Signing key rotation failed: ${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
    }
    constructor(enterprisePlanService, signingKeyRotationService){
        this.enterprisePlanService = enterprisePlanService;
        this.signingKeyRotationService = signingKeyRotationService;
        this.logger = new _common.Logger(RotateSigningKeysCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(RotateSigningKeysCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(RotateSigningKeysCronJob.name, _rotatesigningkeyscronpatternconstant.ROTATE_SIGNING_KEYS_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], RotateSigningKeysCronJob.prototype, "handle", null);
RotateSigningKeysCronJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _enterpriseplanservice.EnterprisePlanService === "undefined" ? Object : _enterpriseplanservice.EnterprisePlanService,
        typeof _signingkeyrotationservice.SigningKeyRotationService === "undefined" ? Object : _signingkeyrotationservice.SigningKeyRotationService
    ])
], RotateSigningKeysCronJob);

//# sourceMappingURL=rotate-signing-keys.cron.job.js.map