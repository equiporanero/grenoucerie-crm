/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookProductService", {
    enumerable: true,
    get: function() {
        return BillingWebhookProductService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _transformstripeproducteventtodatabaseproductutil = require("../utils/transform-stripe-product-event-to-database-product.util");
const _billingproductentity = require("../../billing/entities/billing-product.entity");
const _isstripevalidproductmetadatautil = require("../../billing/utils/is-stripe-valid-product-metadata.util");
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
let BillingWebhookProductService = class BillingWebhookProductService {
    async processStripeEvent(data) {
        const metadata = data.object.metadata;
        const productRepositoryData = (0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(metadata) ? {
            ...(0, _transformstripeproducteventtodatabaseproductutil.transformStripeProductEventToDatabaseProduct)(data),
            metadata
        } : (0, _transformstripeproducteventtodatabaseproductutil.transformStripeProductEventToDatabaseProduct)(data);
        await this.billingProductRepository.upsert(productRepositoryData, {
            conflictPaths: [
                'stripeProductId'
            ],
            skipUpdateIfNoValuesChanged: true
        });
        return {
            stripeProductId: data.object.id
        };
    }
    constructor(billingProductRepository){
        this.billingProductRepository = billingProductRepository;
        this.logger = new _common.Logger(BillingWebhookProductService.name);
    }
};
BillingWebhookProductService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingproductentity.BillingProductEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BillingWebhookProductService);

//# sourceMappingURL=billing-webhook-product.service.js.map