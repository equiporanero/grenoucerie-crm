/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingCustomerEntity", {
    enumerable: true,
    get: function() {
        return BillingCustomerEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _billingentitlemententity = require("./billing-entitlement.entity");
const _billingsubscriptionentity = require("./billing-subscription.entity");
const _workspacerelatedentity = require("../../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingCustomerEntity = class BillingCustomerEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], BillingCustomerEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingCustomerEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingCustomerEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingCustomerEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        unique: true
    }),
    _ts_metadata("design:type", String)
], BillingCustomerEntity.prototype, "stripeCustomerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'bigint',
        nullable: false,
        default: 0,
        transformer: {
            to: (value)=>value,
            from: (value)=>typeof value === 'string' ? Number(value) : value ?? 0
        }
    }),
    _ts_metadata("design:type", Number)
], BillingCustomerEntity.prototype, "creditBalanceMicro", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_billingsubscriptionentity.BillingSubscriptionEntity, (billingSubscription)=>billingSubscription.billingCustomer),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], BillingCustomerEntity.prototype, "billingSubscriptions", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_billingentitlemententity.BillingEntitlementEntity, (billingEntitlement)=>billingEntitlement.billingCustomer),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], BillingCustomerEntity.prototype, "billingEntitlements", void 0);
BillingCustomerEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'billingCustomer',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('BillingCustomer'),
    (0, _typeorm.Index)('IDX_BILLING_CUSTOMER_WORKSPACE_ID_UNIQUE', [
        'workspaceId'
    ], {
        unique: true
    })
], BillingCustomerEntity);

//# sourceMappingURL=billing-customer.entity.js.map