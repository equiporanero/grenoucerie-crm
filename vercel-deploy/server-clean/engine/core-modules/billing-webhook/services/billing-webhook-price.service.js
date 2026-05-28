/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookPriceService", {
    enumerable: true,
    get: function() {
        return BillingWebhookPriceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _transformstripepriceeventtodatabasepriceutil = require("../utils/transform-stripe-price-event-to-database-price.util");
const _billingexception = require("../../billing/billing.exception");
const _billingmeterentity = require("../../billing/entities/billing-meter.entity");
const _billingpriceentity = require("../../billing/entities/billing-price.entity");
const _billingproductentity = require("../../billing/entities/billing-product.entity");
const _stripebillingmeterservice = require("../../billing/stripe/services/stripe-billing-meter.service");
const _transformstripemetertodatabasemeterutil = require("../../billing/utils/transform-stripe-meter-to-database-meter.util");
const _stripepriceservice = require("../../billing/stripe/services/stripe-price.service");
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
let BillingWebhookPriceService = class BillingWebhookPriceService {
    async processStripeEvent(data) {
        const stripeProductId = String(data.object.product);
        const product = await this.billingProductRepository.findOne({
            where: {
                stripeProductId
            }
        });
        if (!product) {
            throw new _billingexception.BillingException('Billing product not found', _billingexception.BillingExceptionCode.BILLING_PRODUCT_NOT_FOUND);
        }
        const meterId = data.object.recurring?.meter;
        if (meterId) {
            const meterData = await this.stripeBillingMeterService.getMeter(meterId);
            await this.billingMeterRepository.upsert((0, _transformstripemetertodatabasemeterutil.transformStripeMeterToDatabaseMeter)(meterData), {
                conflictPaths: [
                    'stripeMeterId'
                ],
                skipUpdateIfNoValuesChanged: true
            });
        }
        await this.billingPriceRepository.upsert((0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(await this.stripePriceService.getPriceByPriceId(data.object.id)), {
            conflictPaths: [
                'stripePriceId'
            ],
            skipUpdateIfNoValuesChanged: true
        });
        return {
            stripePriceId: data.object.id,
            stripeMeterId: meterId
        };
    }
    constructor(stripeBillingMeterService, stripePriceService, billingPriceRepository, billingMeterRepository, billingProductRepository){
        this.stripeBillingMeterService = stripeBillingMeterService;
        this.stripePriceService = stripePriceService;
        this.billingPriceRepository = billingPriceRepository;
        this.billingMeterRepository = billingMeterRepository;
        this.billingProductRepository = billingProductRepository;
        this.logger = new _common.Logger(BillingWebhookPriceService.name);
    }
};
BillingWebhookPriceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_billingpriceentity.BillingPriceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_billingmeterentity.BillingMeterEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_billingproductentity.BillingProductEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _stripebillingmeterservice.StripeBillingMeterService === "undefined" ? Object : _stripebillingmeterservice.StripeBillingMeterService,
        typeof _stripepriceservice.StripePriceService === "undefined" ? Object : _stripepriceservice.StripePriceService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BillingWebhookPriceService);

//# sourceMappingURL=billing-webhook-price.service.js.map