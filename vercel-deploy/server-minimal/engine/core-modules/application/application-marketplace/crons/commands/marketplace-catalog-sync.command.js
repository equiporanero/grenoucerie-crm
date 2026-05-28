"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceCatalogSyncCommand", {
    enumerable: true,
    get: function() {
        return MarketplaceCatalogSyncCommand;
    }
});
const _nestcommander = require("nest-commander");
const _marketplacecatalogsyncservice = require("../../marketplace-catalog-sync.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MarketplaceCatalogSyncCommand = class MarketplaceCatalogSyncCommand extends _nestcommander.CommandRunner {
    async run() {
        await this.marketplaceCatalogSyncService.syncCatalog();
    }
    constructor(marketplaceCatalogSyncService){
        super(), this.marketplaceCatalogSyncService = marketplaceCatalogSyncService;
    }
};
MarketplaceCatalogSyncCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'marketplace:catalog-sync',
        description: 'Sync the marketplace catalog into ApplicationRegistration'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _marketplacecatalogsyncservice.MarketplaceCatalogSyncService === "undefined" ? Object : _marketplacecatalogsyncservice.MarketplaceCatalogSyncService
    ])
], MarketplaceCatalogSyncCommand);

//# sourceMappingURL=marketplace-catalog-sync.command.js.map