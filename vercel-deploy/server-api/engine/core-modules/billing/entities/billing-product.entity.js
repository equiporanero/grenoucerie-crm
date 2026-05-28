/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingProductEntity", {
    enumerable: true,
    get: function() {
        return BillingProductEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _billingpriceentity = require("./billing-price.entity");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
const _billingproductmetadatatype = require("../types/billing-product-metadata.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_billingusagetypeenum.BillingUsageType, {
    name: 'BillingUsageType'
});
let BillingProductEntity = class BillingProductEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], BillingProductEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", Object)
], BillingProductEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingProductEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingProductEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], BillingProductEntity.prototype, "active", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text',
        default: ''
    }),
    _ts_metadata("design:type", String)
], BillingProductEntity.prototype, "description", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingProductEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], BillingProductEntity.prototype, "taxCode", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb',
        default: []
    }),
    _ts_metadata("design:type", Array)
], BillingProductEntity.prototype, "images", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb',
        default: []
    }),
    _ts_metadata("design:type", Array)
], BillingProductEntity.prototype, "marketingFeatures", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        unique: true
    }),
    _ts_metadata("design:type", String)
], BillingProductEntity.prototype, "stripeProductId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], BillingProductEntity.prototype, "defaultStripePriceId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb',
        default: {}
    }),
    _ts_metadata("design:type", typeof _billingproductmetadatatype.BillingProductMetadata === "undefined" ? Object : _billingproductmetadatatype.BillingProductMetadata)
], BillingProductEntity.prototype, "metadata", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_billingpriceentity.BillingPriceEntity, (billingPrice)=>billingPrice.billingProduct),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], BillingProductEntity.prototype, "billingPrices", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], BillingProductEntity.prototype, "unitLabel", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'text'
    }),
    _ts_metadata("design:type", Object)
], BillingProductEntity.prototype, "url", void 0);
BillingProductEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'billingProduct',
        schema: 'core'
    })
], BillingProductEntity);

//# sourceMappingURL=billing-product.entity.js.map