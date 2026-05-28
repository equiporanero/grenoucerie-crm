/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSubscriptionItemEntity", {
    enumerable: true,
    get: function() {
        return BillingSubscriptionItemEntity;
    }
});
const _stripe = /*#__PURE__*/ _interop_require_default(require("stripe"));
const _typeorm = require("typeorm");
const _billingproductentity = require("./billing-product.entity");
const _billingsubscriptionentity = require("./billing-subscription.entity");
const _billingsubscriptionitemmetadatatype = require("../types/billing-subscription-item-metadata.type");
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
let BillingSubscriptionItemEntity = class BillingSubscriptionItemEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionItemEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionItemEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingSubscriptionItemEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemEntity.prototype, "billingSubscriptionId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemEntity.prototype, "stripeSubscriptionId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb',
        default: {}
    }),
    _ts_metadata("design:type", typeof _billingsubscriptionitemmetadatatype.BillingSubscriptionItemMetadata === "undefined" ? Object : _billingsubscriptionitemmetadatatype.BillingSubscriptionItemMetadata)
], BillingSubscriptionItemEntity.prototype, "metadata", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", typeof _stripe.default === "undefined" || typeof _stripe.default.SubscriptionItem === "undefined" || typeof _stripe.default.SubscriptionItem.BillingThresholds === "undefined" ? Object : _stripe.default.SubscriptionItem.BillingThresholds)
], BillingSubscriptionItemEntity.prototype, "billingThresholds", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_billingsubscriptionentity.BillingSubscriptionEntity, (billingSubscription)=>billingSubscription.billingSubscriptionItems, {
        onDelete: 'CASCADE'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], BillingSubscriptionItemEntity.prototype, "billingSubscription", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_billingproductentity.BillingProductEntity),
    (0, _typeorm.JoinColumn)({
        name: 'stripeProductId',
        referencedColumnName: 'stripeProductId'
    }),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], BillingSubscriptionItemEntity.prototype, "billingProduct", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemEntity.prototype, "stripeProductId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemEntity.prototype, "stripePriceId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        unique: true
    }),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemEntity.prototype, "stripeSubscriptionItemId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'numeric'
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionItemEntity.prototype, "quantity", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        default: false
    }),
    _ts_metadata("design:type", Boolean)
], BillingSubscriptionItemEntity.prototype, "hasReachedCurrentPeriodCap", void 0);
BillingSubscriptionItemEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'billingSubscriptionItem',
        schema: 'core'
    }),
    (0, _typeorm.Unique)('IDX_BILLING_SUBSCRIPTION_ITEM_BILLING_SUBSCRIPTION_ID_STRIPE_PRODUCT_ID_UNIQUE', [
        'billingSubscriptionId',
        'stripeProductId'
    ])
], BillingSubscriptionItemEntity);

//# sourceMappingURL=billing-subscription-item.entity.js.map