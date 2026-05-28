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
    get CHECK_PUBLIC_DOMAINS_VALID_RECORDS_CRON_PATTERN () {
        return CHECK_PUBLIC_DOMAINS_VALID_RECORDS_CRON_PATTERN;
    },
    get CheckPublicDomainsValidRecordsCronJob () {
        return CheckPublicDomainsValidRecordsCronJob;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _publicdomainservice = require("../../public-domain.service");
const _sentrycronmonitordecorator = require("../../../cron/sentry-cron-monitor.decorator");
const _publicdomainentity = require("../../public-domain.entity");
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
const CHECK_PUBLIC_DOMAINS_VALID_RECORDS_CRON_PATTERN = '0 * * * *';
let CheckPublicDomainsValidRecordsCronJob = class CheckPublicDomainsValidRecordsCronJob {
    async handle() {
        const publicDomains = await this.publicDomainRepository.find({
            where: {
                isValidated: false,
                createdAt: (0, _typeorm1.Raw)((alias)=>`EXTRACT(HOUR FROM ${alias}) = EXTRACT(HOUR FROM NOW())`)
            }
        });
        for (const publicDomain of publicDomains){
            try {
                await this.publicDomainService.checkPublicDomainValidRecords(publicDomain);
            } catch (error) {
                throw new Error(`[${CheckPublicDomainsValidRecordsCronJob.name}] Cannot check public domain: ${error.message}`);
            }
        }
    }
    constructor(// Cron sweeps unvalidated domains across every workspace.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    publicDomainRepository, publicDomainService){
        this.publicDomainRepository = publicDomainRepository;
        this.publicDomainService = publicDomainService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CheckPublicDomainsValidRecordsCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(CheckPublicDomainsValidRecordsCronJob.name, CHECK_PUBLIC_DOMAINS_VALID_RECORDS_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CheckPublicDomainsValidRecordsCronJob.prototype, "handle", null);
CheckPublicDomainsValidRecordsCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_publicdomainentity.PublicDomainEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _publicdomainservice.PublicDomainService === "undefined" ? Object : _publicdomainservice.PublicDomainService
    ])
], CheckPublicDomainsValidRecordsCronJob);

//# sourceMappingURL=check-public-domains-valid-records.cron.job.js.map