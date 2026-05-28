"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookModule", {
    enumerable: true,
    get: function() {
        return BillingWebhookModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _auditmodule = require("../audit/audit.module");
const _billingwebhookcontroller = require("./billing-webhook.controller");
const _billingwebhookcustomerservice = require("./services/billing-webhook-customer.service");
const _billingwebhookentitlementservice = require("./services/billing-webhook-entitlement.service");
const _billingwebhookinvoiceservice = require("./services/billing-webhook-invoice.service");
const _billingwebhookpriceservice = require("./services/billing-webhook-price.service");
const _billingwebhookproductservice = require("./services/billing-webhook-product.service");
const _billingwebhooksubscriptionscheduleservice = require("./services/billing-webhook-subscription-schedule.service");
const _billingwebhooksubscriptionservice = require("./services/billing-webhook-subscription.service");
const _billingmodule = require("../billing/billing.module");
const _billingcustomerentity = require("../billing/entities/billing-customer.entity");
const _billingentitlemententity = require("../billing/entities/billing-entitlement.entity");
const _billingmeterentity = require("../billing/entities/billing-meter.entity");
const _billingpriceentity = require("../billing/entities/billing-price.entity");
const _billingproductentity = require("../billing/entities/billing-product.entity");
const _billingsubscriptionitementity = require("../billing/entities/billing-subscription-item.entity");
const _billingsubscriptionentity = require("../billing/entities/billing-subscription.entity");
const _stripemodule = require("../billing/stripe/stripe.module");
const _featureflagentity = require("../feature-flag/feature-flag.entity");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _messagequeuemodule = require("../message-queue/message-queue.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _workspaceentity = require("../workspace/workspace.entity");
const _workspacemodule = require("../workspace/workspace.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _rowlevelpermissionmodule = require("../../metadata-modules/row-level-permission-predicate/row-level-permission.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BillingWebhookModule = class BillingWebhookModule {
};
BillingWebhookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _auditmodule.AuditModule,
            _featureflagmodule.FeatureFlagModule,
            _stripemodule.StripeModule,
            _messagequeuemodule.MessageQueueModule,
            _permissionsmodule.PermissionsModule,
            _workspacemodule.WorkspaceModule,
            _billingmodule.BillingModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _typeorm.TypeOrmModule.forFeature([
                _billingsubscriptionentity.BillingSubscriptionEntity,
                _billingsubscriptionitementity.BillingSubscriptionItemEntity,
                _billingcustomerentity.BillingCustomerEntity,
                _billingproductentity.BillingProductEntity,
                _billingpriceentity.BillingPriceEntity,
                _billingmeterentity.BillingMeterEntity,
                _billingentitlemententity.BillingEntitlementEntity,
                _workspaceentity.WorkspaceEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _featureflagentity.FeatureFlagEntity
            ]),
            _rowlevelpermissionmodule.RowLevelPermissionModule
        ],
        controllers: [
            _billingwebhookcontroller.BillingWebhookController
        ],
        providers: [
            _billingwebhookproductservice.BillingWebhookProductService,
            _billingwebhookpriceservice.BillingWebhookPriceService,
            _billingwebhookinvoiceservice.BillingWebhookInvoiceService,
            _billingwebhookcustomerservice.BillingWebhookCustomerService,
            _billingwebhooksubscriptionservice.BillingWebhookSubscriptionService,
            _billingwebhooksubscriptionscheduleservice.BillingWebhookSubscriptionScheduleService,
            _billingwebhookentitlementservice.BillingWebhookEntitlementService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_billingentitlemententity.BillingEntitlementEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)
        ]
    })
], BillingWebhookModule);

//# sourceMappingURL=billing-webhook.module.js.map