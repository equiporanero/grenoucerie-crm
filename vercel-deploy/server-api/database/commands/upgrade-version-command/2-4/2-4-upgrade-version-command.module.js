"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V2_4_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V2_4_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _24workspacecommand1797000001000migratetobillingv2command = require("./2-4-workspace-command-1797000001000-migrate-to-billing-v2.command");
const _billingmodule = require("../../../../engine/core-modules/billing/billing.module");
const _billingpriceentity = require("../../../../engine/core-modules/billing/entities/billing-price.entity");
const _stripemodule = require("../../../../engine/core-modules/billing/stripe/stripe.module");
const _featureflagmodule = require("../../../../engine/core-modules/feature-flag/feature-flag.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V2_4_UpgradeVersionCommandModule = class V2_4_UpgradeVersionCommandModule {
};
V2_4_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _billingmodule.BillingModule,
            _featureflagmodule.FeatureFlagModule,
            _stripemodule.StripeModule,
            _typeorm.TypeOrmModule.forFeature([
                _billingpriceentity.BillingPriceEntity
            ]),
            _workspaceiteratormodule.WorkspaceIteratorModule
        ],
        providers: [
            _24workspacecommand1797000001000migratetobillingv2command.MigrateToBillingV2Command
        ]
    })
], V2_4_UpgradeVersionCommandModule);

//# sourceMappingURL=2-4-upgrade-version-command.module.js.map