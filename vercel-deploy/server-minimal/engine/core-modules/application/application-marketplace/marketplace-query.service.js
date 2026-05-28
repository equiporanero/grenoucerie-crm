"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceQueryService", {
    enumerable: true,
    get: function() {
        return MarketplaceQueryService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationregistrationexception = require("../application-registration/application-registration.exception");
const _applicationregistrationvariableservice = require("../application-registration-variable/application-registration-variable.service");
const _applicationregistrationservice = require("../application-registration/application-registration.service");
const _marketplacecatalogsynccronjob = require("./crons/marketplace-catalog-sync.cron.job");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
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
let MarketplaceQueryService = class MarketplaceQueryService {
    async findManyMarketplaceApps() {
        const registrations = await this.applicationRegistrationService.findManyListed();
        if (registrations.length === 0) {
            if (!this.hasSyncBeenEnqueued) {
                this.hasSyncBeenEnqueued = true;
                this.logger.log('No marketplace registrations found, enqueuing one-time sync job');
                await this.messageQueueService.add(_marketplacecatalogsynccronjob.MarketplaceCatalogSyncCronJob.name, {}, {
                    id: 'marketplace-catalog-sync'
                });
            }
            return [];
        }
        const configuredStatuses = await this.applicationRegistrationVariableService.isConfiguredBatch(registrations.map((registration)=>registration.id));
        return registrations.filter((registration)=>configuredStatuses.get(registration.id) ?? true).map((registration)=>this.toMarketplaceAppDTO(registration));
    }
    async findMarketplaceAppDetail(universalIdentifier) {
        const registration = await this.findRegistrationByUniversalIdentifier(universalIdentifier);
        return this.toMarketplaceAppDetailDTO(registration);
    }
    async findRegistrationByUniversalIdentifier(universalIdentifier) {
        const registration = await this.applicationRegistrationService.findOneByUniversalIdentifier(universalIdentifier);
        if (!(0, _utils.isDefined)(registration)) {
            throw new _applicationregistrationexception.ApplicationRegistrationException(`No application registration found for identifier "${universalIdentifier}"`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.APPLICATION_REGISTRATION_NOT_FOUND);
        }
        return registration;
    }
    toMarketplaceAppDTO(registration) {
        const app = registration.manifest?.application;
        return {
            id: registration.universalIdentifier,
            name: app?.displayName ?? registration.name,
            description: app?.description ?? '',
            author: `${app?.author ?? 'Unknown'}`,
            category: app?.category ?? '',
            logo: app?.logoUrl ?? undefined,
            sourcePackage: registration.sourcePackage ?? undefined,
            isFeatured: registration.isFeatured
        };
    }
    toMarketplaceAppDetailDTO(registration) {
        return {
            id: registration.id,
            universalIdentifier: registration.universalIdentifier,
            name: registration.name,
            sourceType: registration.sourceType,
            sourcePackage: registration.sourcePackage ?? undefined,
            latestAvailableVersion: registration.latestAvailableVersion ?? undefined,
            isListed: registration.isListed,
            isFeatured: registration.isFeatured,
            manifest: registration.manifest ?? undefined
        };
    }
    constructor(applicationRegistrationService, applicationRegistrationVariableService, messageQueueService){
        this.applicationRegistrationService = applicationRegistrationService;
        this.applicationRegistrationVariableService = applicationRegistrationVariableService;
        this.messageQueueService = messageQueueService;
        this.logger = new _common.Logger(MarketplaceQueryService.name);
        this.hasSyncBeenEnqueued = false;
    }
};
MarketplaceQueryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationregistrationservice.ApplicationRegistrationService === "undefined" ? Object : _applicationregistrationservice.ApplicationRegistrationService,
        typeof _applicationregistrationvariableservice.ApplicationRegistrationVariableService === "undefined" ? Object : _applicationregistrationvariableservice.ApplicationRegistrationVariableService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], MarketplaceQueryService);

//# sourceMappingURL=marketplace-query.service.js.map