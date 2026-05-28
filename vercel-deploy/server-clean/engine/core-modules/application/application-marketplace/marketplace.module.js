"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceModule", {
    enumerable: true,
    get: function() {
        return MarketplaceModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../application.module");
const _applicationregistrationmodule = require("../application-registration/application-registration.module");
const _applicationinstallmodule = require("../application-install/application-install.module");
const _marketplacecatalogsynccroncommand = require("./crons/commands/marketplace-catalog-sync.cron.command");
const _marketplacecatalogsynccronjob = require("./crons/marketplace-catalog-sync.cron.job");
const _marketplacecatalogsyncservice = require("./marketplace-catalog-sync.service");
const _marketplacequeryservice = require("./marketplace-query.service");
const _marketplaceresolver = require("./marketplace.resolver");
const _marketplaceservice = require("./marketplace.service");
const _featureflagmodule = require("../../feature-flag/feature-flag.module");
const _twentyconfigmodule = require("../../twenty-config/twenty-config.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _marketplacecatalogsynccommand = require("./crons/commands/marketplace-catalog-sync.command");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MarketplaceModule = class MarketplaceModule {
};
MarketplaceModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _applicationregistrationmodule.ApplicationRegistrationModule,
            _applicationinstallmodule.ApplicationInstallModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _twentyconfigmodule.TwentyConfigModule
        ],
        providers: [
            _marketplaceservice.MarketplaceService,
            _marketplacecatalogsyncservice.MarketplaceCatalogSyncService,
            _marketplacequeryservice.MarketplaceQueryService,
            _marketplacecatalogsynccronjob.MarketplaceCatalogSyncCronJob,
            _marketplacecatalogsynccroncommand.MarketplaceCatalogSyncCronCommand,
            _marketplacecatalogsynccommand.MarketplaceCatalogSyncCommand,
            _marketplaceresolver.MarketplaceResolver
        ],
        exports: [
            _marketplacecatalogsyncservice.MarketplaceCatalogSyncService,
            _marketplacequeryservice.MarketplaceQueryService,
            _marketplacecatalogsynccroncommand.MarketplaceCatalogSyncCronCommand,
            _marketplaceservice.MarketplaceService
        ]
    })
], MarketplaceModule);

//# sourceMappingURL=marketplace.module.js.map