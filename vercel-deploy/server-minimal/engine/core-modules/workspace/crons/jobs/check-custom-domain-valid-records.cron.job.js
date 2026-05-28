"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CHECK_CUSTOM_DOMAIN_VALID_RECORDS_CRON_PATTERN () {
        return CHECK_CUSTOM_DOMAIN_VALID_RECORDS_CRON_PATTERN;
    },
    get CheckCustomDomainValidRecordsCronJob () {
        return CheckCustomDomainValidRecordsCronJob;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _sentrycronmonitordecorator = require("../../../cron/sentry-cron-monitor.decorator");
const _customdomainmanagerservice = require("../../../domain/custom-domain-manager/services/custom-domain-manager.service");
const _processdecorator = require("../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _workspaceentity = require("../../workspace.entity");
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
const CHECK_CUSTOM_DOMAIN_VALID_RECORDS_CRON_PATTERN = '0 * * * *';
let CheckCustomDomainValidRecordsCronJob = class CheckCustomDomainValidRecordsCronJob {
    async handle() {
        const workspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE,
                customDomain: (0, _typeorm1.Not)((0, _typeorm1.IsNull)()),
                createdAt: (0, _typeorm1.Raw)((alias)=>`EXTRACT(HOUR FROM ${alias}) = EXTRACT(HOUR FROM NOW())`)
            },
            select: [
                'id',
                'customDomain',
                'isCustomDomainEnabled'
            ]
        });
        for (const workspace of workspaces){
            try {
                await this.customDomainManagerService.checkCustomDomainValidRecords(workspace);
            } catch (error) {
                throw new Error(`[${CheckCustomDomainValidRecordsCronJob.name}] Cannot check custom domain for workspaces: ${error.message}`);
            }
        }
    }
    constructor(workspaceRepository, customDomainManagerService){
        this.workspaceRepository = workspaceRepository;
        this.customDomainManagerService = customDomainManagerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CheckCustomDomainValidRecordsCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(CheckCustomDomainValidRecordsCronJob.name, CHECK_CUSTOM_DOMAIN_VALID_RECORDS_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CheckCustomDomainValidRecordsCronJob.prototype, "handle", null);
CheckCustomDomainValidRecordsCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _customdomainmanagerservice.CustomDomainManagerService === "undefined" ? Object : _customdomainmanagerservice.CustomDomainManagerService
    ])
], CheckCustomDomainValidRecordsCronJob);

//# sourceMappingURL=check-custom-domain-valid-records.cron.job.js.map