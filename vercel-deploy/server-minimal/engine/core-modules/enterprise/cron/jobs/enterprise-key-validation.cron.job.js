/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnterpriseKeyValidationCronJob", {
    enumerable: true,
    get: function() {
        return EnterpriseKeyValidationCronJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _sentrycronmonitordecorator = require("../../../cron/sentry-cron-monitor.decorator");
const _enterprisekeyvalidationcronpatternconstant = require("../../constants/enterprise-key-validation-cron-pattern.constant");
const _enterpriseplanservice = require("../../services/enterprise-plan.service");
const _processdecorator = require("../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _userworkspaceentity = require("../../../user-workspace/user-workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let EnterpriseKeyValidationCronJob = class EnterpriseKeyValidationCronJob {
    async handle() {
        this.logger.log('Starting enterprise validity token refresh and seat report...');
        const refreshSuccess = await this.enterprisePlanService.refreshValidityToken();
        if (refreshSuccess) {
            this.logger.log('Enterprise validity token refreshed successfully');
        } else {
            this.logger.warn('Enterprise validity token refresh did not succeed. ' + 'Existing validity token will continue to work until expiration.');
        }
        try {
            const seatCount = await this.getActiveUserWorkspaceCount();
            const reportSuccess = await this.enterprisePlanService.reportSeats(seatCount);
            if (reportSuccess) {
                this.logger.log(`Reported ${seatCount} seats to enterprise API`);
            } else {
                this.logger.warn('Seat report did not succeed');
            }
        } catch (error) {
            this.logger.warn(`Failed to get seat count or report: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    async getActiveUserWorkspaceCount() {
        const count = await this.userWorkspaceRepository.count({
            where: {
                deletedAt: (0, _typeorm1.IsNull)()
            }
        });
        return Math.max(1, count);
    }
    constructor(enterprisePlanService, userWorkspaceRepository){
        this.enterprisePlanService = enterprisePlanService;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.logger = new _common.Logger(EnterpriseKeyValidationCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(EnterpriseKeyValidationCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(EnterpriseKeyValidationCronJob.name, _enterprisekeyvalidationcronpatternconstant.ENTERPRISE_KEY_VALIDATION_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], EnterpriseKeyValidationCronJob.prototype, "handle", null);
EnterpriseKeyValidationCronJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _enterpriseplanservice.EnterprisePlanService === "undefined" ? Object : _enterpriseplanservice.EnterprisePlanService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], EnterpriseKeyValidationCronJob);

//# sourceMappingURL=enterprise-key-validation.cron.job.js.map