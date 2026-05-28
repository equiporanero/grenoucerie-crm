/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingMeterEntity", {
    enumerable: true,
    get: function() {
        return BillingMeterEntity;
    }
});
const _stripe = /*#__PURE__*/ _interop_require_default(require("stripe"));
const _typeorm = require("typeorm");
const _billingpriceentity = require("./billing-price.entity");
const _billingmetereventtimewindowenum = require("../enums/billing-meter-event-time-window.enum");
const _billingmeterstatusenum = require("../enums/billing-meter-status.enum");
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
let BillingMeterEntity = class BillingMeterEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], BillingMeterEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingMeterEntity.prototype, "deletedAt", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingMeterEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingMeterEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        unique: true
    }),
    _ts_metadata("design:type", String)
], BillingMeterEntity.prototype, "stripeMeterId", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingMeterEntity.prototype, "displayName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], BillingMeterEntity.prototype, "eventName", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'enum',
        enum: Object.values(_billingmeterstatusenum.BillingMeterStatus)
    }),
    _ts_metadata("design:type", typeof _billingmeterstatusenum.BillingMeterStatus === "undefined" ? Object : _billingmeterstatusenum.BillingMeterStatus)
], BillingMeterEntity.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", typeof _stripe.default === "undefined" || typeof _stripe.default.Billing === "undefined" || typeof _stripe.default.Billing.Meter === "undefined" || typeof _stripe.default.Billing.Meter.CustomerMapping === "undefined" ? Object : _stripe.default.Billing.Meter.CustomerMapping)
], BillingMeterEntity.prototype, "customerMapping", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: true,
        type: 'enum',
        enum: Object.values(_billingmetereventtimewindowenum.BillingMeterEventTimeWindow)
    }),
    _ts_metadata("design:type", Object)
], BillingMeterEntity.prototype, "eventTimeWindow", void 0);
_ts_decorate([
    (0, _typeorm.OneToMany)(()=>_billingpriceentity.BillingPriceEntity, (billingPrice)=>billingPrice.billingMeter),
    _ts_metadata("design:type", typeof _typeorm.Relation === "undefined" ? Object : _typeorm.Relation)
], BillingMeterEntity.prototype, "billingPrices", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'jsonb'
    }),
    _ts_metadata("design:type", typeof _stripe.default === "undefined" || typeof _stripe.default.Billing === "undefined" || typeof _stripe.default.Billing.Meter === "undefined" || typeof _stripe.default.Billing.Meter.ValueSettings === "undefined" ? Object : _stripe.default.Billing.Meter.ValueSettings)
], BillingMeterEntity.prototype, "valueSettings", void 0);
BillingMeterEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'billingMeter',
        schema: 'core'
    })
], BillingMeterEntity);

//# sourceMappingURL=billing-meter.entity.js.map