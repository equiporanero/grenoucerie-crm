/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingPriceEntity", {
    enumerable: true,
    get: function() {
        return BillingPriceEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _billingmeterentity = require("./billing-meter.entity");
const _billingproductentity = require("./billing-product.entity");
const _billingpricebillingschemeenum = require("../enums/billing-price-billing-scheme.enum");
const _billingpricetaxbehaviorenum = require("../enums/billing-price-tax-behavior.enum");
const _billingpricetypeenum = require("../enums/billing-price-type.enum");
const _billingsubscriptionintervalenum = require("../enums/billing-subscription-interval.enum");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
const _billingpricemetadatatype = require("../types/billing-price-metadata.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingPriceEntity = class BillingPriceEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], BillingPriceEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingPriceEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingPriceEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingPriceEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        unique: true
    }),
    _ts_metadata("design:type", String)
], BillingPriceEntity.prototype, "stripePriceId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], BillingPriceEntity.prototype, "active", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingPriceEntity.prototype, "stripeProductId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingPriceEntity.prototype, "currency", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "nickname", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_billingpricetaxbehaviorenum.BillingPriceTaxBehavior)
    }),
    _ts_metadata("design:type", typeof _billingpricetaxbehaviorenum.BillingPriceTaxBehavior === "undefined" ? Object : _billingpricetaxbehaviorenum.BillingPriceTaxBehavior)
], BillingPriceEntity.prototype, "taxBehavior", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_billingpricetypeenum.BillingPriceType)
    }),
    _ts_metadata("design:type", typeof _billingpricetypeenum.BillingPriceType === "undefined" ? Object : _billingpricetypeenum.BillingPriceType)
], BillingPriceEntity.prototype, "type", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_billingpricebillingschemeenum.BillingPriceBillingScheme)
    }),
    _ts_metadata("design:type", typeof _billingpricebillingschemeenum.BillingPriceBillingScheme === "undefined" ? Object : _billingpricebillingschemeenum.BillingPriceBillingScheme)
], BillingPriceEntity.prototype, "billingScheme", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "currencyOptions", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "tiers", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "recurring", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "transformQuantity", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "unitAmountDecimal", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'numeric'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "unitAmount", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "stripeMeterId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb',
        default: {}
    }),
    _ts_metadata("design:type", typeof _billingpricemetadatatype.BillingPriceMetadata === "undefined" ? Object : _billingpricemetadatatype.BillingPriceMetadata)
], BillingPriceEntity.prototype, "metadata", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingusagetypeenum.BillingUsageType),
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_billingusagetypeenum.BillingUsageType),
        nullable: false
    }),
    _ts_metadata("design:type", typeof _billingusagetypeenum.BillingUsageType === "undefined" ? Object : _billingusagetypeenum.BillingUsageType)
], BillingPriceEntity.prototype, "usageType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionintervalenum.SubscriptionInterval),
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_billingsubscriptionintervalenum.SubscriptionInterval)
    }),
    _ts_metadata("design:type", typeof _billingsubscriptionintervalenum.SubscriptionInterval === "undefined" ? Object : _billingsubscriptionintervalenum.SubscriptionInterval)
], BillingPriceEntity.prototype, "interval", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_billingproductentity.BillingProductEntity, (billingProduct)=>billingProduct.billingPrices, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        referencedColumnName: 'stripeProductId',
        name: 'stripeProductId'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "billingProduct", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_billingmeterentity.BillingMeterEntity, (billingMeter)=>billingMeter.billingPrices, {
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        referencedColumnName: 'stripeMeterId',
        name: 'stripeMeterId'
    }),
    _ts_metadata("design:type", Object)
], BillingPriceEntity.prototype, "billingMeter", void 0);
BillingPriceEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'billingPrice',
        schema: 'core'
    })
], BillingPriceEntity);

//# sourceMappingURL=billing-price.entity.js.map