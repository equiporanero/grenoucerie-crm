"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceCatalogSyncCronJob", {
    enumerable: true,
    get: function() {
        return MarketplaceCatalogSyncCronJob;
    }
});
const _common = require("@nestjs/common");
const _sentrycronmonitordecorator = require("../../../cron/sentry-cron-monitor.decorator");
const _marketplacecatalogsynccronpatternconstant = require("./constants/marketplace-catalog-sync-cron-pattern.constant");
const _marketplacecatalogsyncservice = require("../marketplace-catalog-sync.service");
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
let MarketplaceCatalogSyncCronJob = class MarketplaceCatalogSyncCronJob {
    async handle() {
        this.logger.log('Starting marketplace catalog sync...');
        try {
            await this.marketplaceCatalogSyncService.syncCatalog();
            this.logger.log('Marketplace catalog sync completed successfully');
        } catch (error) {
            this.logger.error(`Marketplace catalog sync failed: ${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
    }
    constructor(marketplaceCatalogSyncService){
        this.marketplaceCatalogSyncService = marketplaceCatalogSyncService;
        this.logger = new _common.Logger(MarketplaceCatalogSyncCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MarketplaceCatalogSyncCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(MarketplaceCatalogSyncCronJob.name, _marketplacecatalogsynccronpatternconstant.MARKETPLACE_CATALOG_SYNC_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], MarketplaceCatalogSyncCronJob.prototype, "handle", null);
MarketplaceCatalogSyncCronJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _marketplacecatalogsyncservice.MarketplaceCatalogSyncService === "undefined" ? Object : _marketplacecatalogsyncservice.MarketplaceCatalogSyncService
    ])
], MarketplaceCatalogSyncCronJob);

//# sourceMappingURL=marketplace-catalog-sync.cron.job.js.map