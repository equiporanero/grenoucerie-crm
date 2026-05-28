/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookEntitlementService", {
    enumerable: true,
    get: function() {
        return BillingWebhookEntitlementService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _transformstripeentitlementupdatedeventtodatabaseentitlementutil = require("../utils/transform-stripe-entitlement-updated-event-to-database-entitlement.util");
const _billingexception = require("../../billing/billing.exception");
const _billingcustomerentity = require("../../billing/entities/billing-customer.entity");
const _billingentitlemententity = require("../../billing/entities/billing-entitlement.entity");
const _billingentitlementkeyenum = require("../../billing/enums/billing-entitlement-key.enum");
const _rowlevelpermissionpredicategroupservice = require("../../../metadata-modules/row-level-permission-predicate/services/row-level-permission-predicate-group.service");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
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
let BillingWebhookEntitlementService = class BillingWebhookEntitlementService {
    async processStripeEvent(data) {
        const billingCustomer = await this.billingCustomerRepository.findOne({
            where: {
                stripeCustomerId: data.object.customer
            }
        });
        if (!billingCustomer) {
            throw new _billingexception.BillingException('Billing customer not found', _billingexception.BillingExceptionCode.BILLING_CUSTOMER_NOT_FOUND);
        }
        const workspaceId = billingCustomer.workspaceId;
        const billingEntitlements = (0, _transformstripeentitlementupdatedeventtodatabaseentitlementutil.transformStripeEntitlementUpdatedEventToDatabaseEntitlement)(workspaceId, data);
        await this.billingEntitlementRepository.upsert(workspaceId, billingEntitlements, {
            conflictPaths: [
                'workspaceId',
                'key'
            ],
            skipUpdateIfNoValuesChanged: true
        });
        const isRowLevelPermissionDisabled = billingEntitlements.some((entitlement)=>entitlement.workspaceId === workspaceId && entitlement.key === _billingentitlementkeyenum.BillingEntitlementKey.RLS && entitlement.value === false);
        if (isRowLevelPermissionDisabled) {
            await this.rowLevelPermissionPredicateGroupService.deleteAllRowLevelPermissionPredicateGroups(workspaceId);
        }
        return {
            stripeEntitlementCustomerId: data.object.customer
        };
    }
    constructor(// Stripe webhook: workspace discovered from BillingCustomer by stripeCustomerId.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    billingCustomerRepository, billingEntitlementRepository, rowLevelPermissionPredicateGroupService){
        this.billingCustomerRepository = billingCustomerRepository;
        this.billingEntitlementRepository = billingEntitlementRepository;
        this.rowLevelPermissionPredicateGroupService = rowLevelPermissionPredicateGroupService;
    }
};
BillingWebhookEntitlementService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingentitlemententity.BillingEntitlementEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _rowlevelpermissionpredicategroupservice.RowLevelPermissionPredicateGroupService === "undefined" ? Object : _rowlevelpermissionpredicategroupservice.RowLevelPermissionPredicateGroupService
    ])
], BillingWebhookEntitlementService);

//# sourceMappingURL=billing-webhook-entitlement.service.js.map