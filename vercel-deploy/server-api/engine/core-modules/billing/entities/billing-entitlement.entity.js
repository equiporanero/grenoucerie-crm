/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingEntitlementEntity", {
    enumerable: true,
    get: function() {
        return BillingEntitlementEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _billingcustomerentity = require("./billing-customer.entity");
const _billingentitlementkeyenum = require("../enums/billing-entitlement-key.enum");
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
let BillingEntitlementEntity = class BillingEntitlementEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], BillingEntitlementEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", typeof _billingentitlementkeyenum.BillingEntitlementKey === "undefined" ? Object : _billingentitlementkeyenum.BillingEntitlementKey)
], BillingEntitlementEntity.prototype, "key", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingEntitlementEntity.prototype, "stripeCustomerId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], BillingEntitlementEntity.prototype, "value", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingEntitlementEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingEntitlementEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingEntitlementEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_billingcustomerentity.BillingCustomerEntity, (billingCustomer)=>billingCustomer.billingEntitlements, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    (0, _typeorm.JoinColumn)({
        referencedColumnName: 'stripeCustomerId',
        name: 'stripeCustomerId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], BillingEntitlementEntity.prototype, "billingCustomer", void 0);
BillingEntitlementEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'billingEntitlement',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('BillingEntitlement'),
    (0, _typeorm.Unique)('IDX_BILLING_ENTITLEMENT_KEY_WORKSPACE_ID_UNIQUE', [
        'key',
        'workspaceId'
    ])
], BillingEntitlementEntity);

//# sourceMappingURL=billing-entitlement.entity.js.map