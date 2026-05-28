/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSubscriptionEntity", {
    enumerable: true,
    get: function() {
        return BillingSubscriptionEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _typeorm = require("typeorm");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _billingsubscriptionschedulephasedto = require("../dtos/billing-subscription-schedule-phase.dto");
const _billingsubscriptionitemdto = require("../dtos/billing-subscription-item.dto");
const _billingcustomerentity = require("./billing-customer.entity");
const _billingsubscriptionitementity = require("./billing-subscription-item.entity");
const _billingsubscriptioncollectionmethodenum = require("../enums/billing-subscription-collection-method.enum");
const _billingsubscriptionintervalenum = require("../enums/billing-subscription-interval.enum");
const _billingsubscriptionstatusenum = require("../enums/billing-subscription-status.enum");
const _workspacerelatedentity = require("../../../workspace-manager/types/workspace-related-entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_billingsubscriptionstatusenum.SubscriptionStatus, {
    name: 'SubscriptionStatus'
});
(0, _graphql.registerEnumType)(_billingsubscriptionintervalenum.SubscriptionInterval, {
    name: 'SubscriptionInterval'
});
let BillingSubscriptionEntity = class BillingSubscriptionEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], BillingSubscriptionEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionEntity.prototype, "stripeCustomerId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        unique: true,
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionEntity.prototype, "stripeSubscriptionId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionstatusenum.SubscriptionStatus),
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_billingsubscriptionstatusenum.SubscriptionStatus),
        nullable: false
    }),
    _ts_metadata("design:type", typeof _billingsubscriptionstatusenum.SubscriptionStatus === "undefined" ? Object : _billingsubscriptionstatusenum.SubscriptionStatus)
], BillingSubscriptionEntity.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionintervalenum.SubscriptionInterval, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_billingsubscriptionintervalenum.SubscriptionInterval),
        nullable: true
    }),
    _ts_metadata("design:type", typeof _billingsubscriptionintervalenum.SubscriptionInterval === "undefined" ? Object : _billingsubscriptionintervalenum.SubscriptionInterval)
], BillingSubscriptionEntity.prototype, "interval", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingsubscriptionitemdto.BillingSubscriptionItemDTO
        ], {
        nullable: true
    }),
    (0, _typeorm.OneToMany)(()=>_billingsubscriptionitementity.BillingSubscriptionItemEntity, (billingSubscriptionItem)=>billingSubscriptionItem.billingSubscription),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], BillingSubscriptionEntity.prototype, "billingSubscriptionItems", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_billingcustomerentity.BillingCustomerEntity, (billingCustomer)=>billingCustomer.billingSubscriptions, {
        nullable: false,
        onDelete: 'CASCADE',
        createForeignKeyConstraints: false
    }),
    (0, _typeorm.JoinColumn)({
        referencedColumnName: 'stripeCustomerId',
        name: 'stripeCustomerId'
    }),
    _ts_metadata("design:type", typeof Relation === "undefined" ? Object : Relation)
], BillingSubscriptionEntity.prototype, "billingCustomer", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], BillingSubscriptionEntity.prototype, "cancelAtPeriodEnd", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        default: 'USD'
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionEntity.prototype, "currency", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'timestamptz',
        default: ()=>'CURRENT_TIMESTAMP'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionEntity.prototype, "currentPeriodEnd", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'timestamptz',
        default: ()=>'CURRENT_TIMESTAMP'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionEntity.prototype, "currentPeriodStart", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb',
        default: {}
    }),
    _ts_metadata("design:type", typeof Stripe === "undefined" || typeof Stripe.Metadata === "undefined" ? Object : Stripe.Metadata)
], BillingSubscriptionEntity.prototype, "metadata", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingsubscriptionschedulephasedto.BillingSubscriptionSchedulePhaseDTO
        ]),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb',
        default: []
    }),
    _ts_metadata("design:type", typeof Array === "undefined" ? Object : Array)
], BillingSubscriptionEntity.prototype, "phases", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionEntity.prototype, "cancelAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionEntity.prototype, "canceledAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionEntity.prototype, "automaticTax", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionEntity.prototype, "cancellationDetails", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_billingsubscriptioncollectionmethodenum.BillingSubscriptionCollectionMethod),
        default: _billingsubscriptioncollectionmethodenum.BillingSubscriptionCollectionMethod.CHARGE_AUTOMATICALLY
    }),
    _ts_metadata("design:type", typeof _billingsubscriptioncollectionmethodenum.BillingSubscriptionCollectionMethod === "undefined" ? Object : _billingsubscriptioncollectionmethodenum.BillingSubscriptionCollectionMethod)
], BillingSubscriptionEntity.prototype, "collectionMethod", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionEntity.prototype, "endedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionEntity.prototype, "trialStart", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionEntity.prototype, "trialEnd", void 0);
BillingSubscriptionEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'billingSubscription',
        schema: 'core'
    }),
    (0, _typeorm.Index)('IDX_BILLING_SUBSCRIPTION_WORKSPACE_ID_UNIQUE', [
        'workspaceId'
    ], {
        unique: true,
        where: `status IN ('trialing', 'active', 'past_due')`
    }),
    (0, _graphql.ObjectType)('BillingSubscription')
], BillingSubscriptionEntity);

//# sourceMappingURL=billing-subscription.entity.js.map