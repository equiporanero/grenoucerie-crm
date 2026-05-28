"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StaleRegistrationCleanupService", {
    enumerable: true,
    get: function() {
        return StaleRegistrationCleanupService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationregistrationentity = require("../../../application-registration/application-registration.entity");
const _applicationregistrationsourcetypeenum = require("../../../application-registration/enums/application-registration-source-type.enum");
const _applicationentity = require("../../../application.entity");
const _staleregistrationcleanupbatchsizeconstant = require("../constants/stale-registration-cleanup-batch-size.constant");
const _staleregistrationgraceperioddaysconstant = require("../constants/stale-registration-grace-period-days.constant");
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
let StaleRegistrationCleanupService = class StaleRegistrationCleanupService {
    async cleanupStaleRegistrations() {
        const cutoffDate = this.calculateCutoffDate();
        let totalDeleted = 0;
        let lastCreatedAt;
        while(true){
            const staleRegistrations = await this.findStaleRegistrationBatch(cutoffDate, _staleregistrationcleanupbatchsizeconstant.STALE_REGISTRATION_CLEANUP_BATCH_SIZE, lastCreatedAt);
            if (staleRegistrations.length === 0) {
                break;
            }
            lastCreatedAt = staleRegistrations[staleRegistrations.length - 1].createdAt;
            const staleIds = staleRegistrations.map((registration)=>registration.id);
            // Filter out registrations that have active (non-deleted) installations
            const registrationsWithInstallations = await this.applicationRepository.createQueryBuilder('application').select('application.applicationRegistrationId').where('application.applicationRegistrationId IN (:...registrationIds)', {
                registrationIds: staleIds
            }).andWhere('application.deletedAt IS NULL').groupBy('application.applicationRegistrationId').getRawMany();
            const registrationIdsWithInstallations = new Set(registrationsWithInstallations.map((row)=>row.application_applicationRegistrationId));
            const idsToDelete = staleIds.filter((id)=>!registrationIdsWithInstallations.has(id));
            if (idsToDelete.length > 0) {
                await this.applicationRegistrationRepository.softDelete({
                    id: (0, _typeorm1.In)(idsToDelete)
                });
                this.logger.log(`Deleted ${idsToDelete.length} stale OAuth registration(s)`);
                totalDeleted += idsToDelete.length;
            }
            if (staleRegistrations.length < _staleregistrationcleanupbatchsizeconstant.STALE_REGISTRATION_CLEANUP_BATCH_SIZE) {
                break;
            }
        }
        return totalDeleted;
    }
    async findStaleRegistrationBatch(cutoffDate, batchSize, afterCreatedAt) {
        const queryBuilder = this.applicationRegistrationRepository.createQueryBuilder('registration').select('registration.id', 'id').addSelect('registration.createdAt', 'createdAt').where('registration.sourceType = :sourceType', {
            sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.OAUTH_ONLY
        }).andWhere('registration.createdAt < :cutoffDate', {
            cutoffDate
        }).orderBy('registration.createdAt', 'ASC').take(batchSize);
        if (afterCreatedAt) {
            queryBuilder.andWhere('registration.createdAt > :afterCreatedAt', {
                afterCreatedAt
            });
        }
        const rows = await queryBuilder.getRawMany();
        return rows.map((row)=>({
                id: row.id,
                createdAt: new Date(row.createdAt)
            }));
    }
    calculateCutoffDate() {
        const cutoffDate = new Date();
        cutoffDate.setUTCHours(0, 0, 0, 0);
        cutoffDate.setUTCDate(cutoffDate.getUTCDate() - _staleregistrationgraceperioddaysconstant.STALE_REGISTRATION_GRACE_PERIOD_DAYS);
        return cutoffDate;
    }
    constructor(applicationRegistrationRepository, applicationRepository){
        this.applicationRegistrationRepository = applicationRegistrationRepository;
        this.applicationRepository = applicationRepository;
        this.logger = new _common.Logger(StaleRegistrationCleanupService.name);
    }
};
StaleRegistrationCleanupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], StaleRegistrationCleanupService);

//# sourceMappingURL=stale-registration-cleanup.service.js.map