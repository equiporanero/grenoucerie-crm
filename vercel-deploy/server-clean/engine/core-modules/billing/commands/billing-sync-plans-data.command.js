/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSyncPlansDataCommand", {
    enumerable: true,
    get: function() {
        return BillingSyncPlansDataCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _migrationcommandrunner = require("../../../../database/commands/command-runners/migration.command-runner");
const _billingmeterentity = require("../entities/billing-meter.entity");
const _billingpriceentity = require("../entities/billing-price.entity");
const _billingproductentity = require("../entities/billing-product.entity");
const _stripebillingmeterservice = require("../stripe/services/stripe-billing-meter.service");
const _stripepriceservice = require("../stripe/services/stripe-price.service");
const _stripeproductservice = require("../stripe/services/stripe-product.service");
const _isstripevalidproductmetadatautil = require("../utils/is-stripe-valid-product-metadata.util");
const _transformstripemetertodatabasemeterutil = require("../utils/transform-stripe-meter-to-database-meter.util");
const _transformstripepricetodatabasepriceutil = require("../utils/transform-stripe-price-to-database-price.util");
const _transformstripeproducttodatabaseproductutil = require("../utils/transform-stripe-product-to-database-product.util");
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
let BillingSyncPlansDataCommand = class BillingSyncPlansDataCommand extends _migrationcommandrunner.MigrationCommandRunner {
    async upsertMetersRepositoryData(meters, options) {
        await Promise.all(meters.map(async (meter)=>{
            try {
                if (!options.dryRun) {
                    await this.billingMeterRepository.upsert((0, _transformstripemetertodatabasemeterutil.transformStripeMeterToDatabaseMeter)(meter), {
                        conflictPaths: [
                            'stripeMeterId'
                        ]
                    });
                }
                this.logger.log(`Upserted meter: ${meter.id}`);
            } catch (error) {
                this.logger.error(`Error upserting meter ${meter.id}: ${error}`);
            }
        }));
    }
    async upsertProductRepositoryData(product, options) {
        try {
            if (!options.dryRun) {
                await this.billingProductRepository.upsert((0, _transformstripeproducttodatabaseproductutil.transformStripeProductToDatabaseProduct)(product), {
                    conflictPaths: [
                        'stripeProductId'
                    ]
                });
            }
            this.logger.log(`Upserted product: ${product.id}`);
        } catch (error) {
            this.logger.error(`Error upserting product ${product.id}: ${error}`);
        }
    }
    async getBillingPrices(products, options) {
        return await Promise.all(products.map(async (product)=>{
            if (!(0, _isstripevalidproductmetadatautil.isStripeValidProductMetadata)(product.metadata)) {
                this.logger.log(`Product: ${product.id} purposefully not inserted, invalid metadata format: ${JSON.stringify(product.metadata)}`);
                return [];
            }
            await this.upsertProductRepositoryData(product, options);
            const prices = await this.stripePriceService.getPricesByProductId(product.id);
            this.logger.log(`${prices.length} prices found for product: ${product.id}`);
            return prices;
        }));
    }
    async processBillingPricesByProductBatches(products, options) {
        const prices = [];
        for(let start = 0; start < products.length; start += this.batchSize){
            const end = start + this.batchSize > products.length ? products.length : start + this.batchSize;
            const batch = products.slice(start, end);
            const batchPrices = await this.getBillingPrices(batch, options);
            prices.push(...batchPrices);
            this.logger.log(`Processed batch ${start / this.batchSize + 1} of products`);
        }
        return prices;
    }
    async runMigrationCommand(_passedParams, options) {
        const billingMeters = await this.stripeBillingMeterService.getAllMeters();
        await this.upsertMetersRepositoryData(billingMeters, options);
        const billingProducts = await this.stripeProductService.getAllProducts();
        const billingPrices = await this.processBillingPricesByProductBatches(billingProducts, options);
        const transformedPrices = billingPrices.flatMap((prices)=>prices.map((price)=>(0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(price)));
        this.logger.log(`Upserting ${transformedPrices.length} transformed prices`);
        if (!options.dryRun) {
            await this.billingPriceRepository.upsert(transformedPrices, {
                conflictPaths: [
                    'stripePriceId'
                ]
            });
        }
    }
    constructor(billingPriceRepository, billingProductRepository, billingMeterRepository, stripeBillingMeterService, stripeProductService, stripePriceService){
        super(), this.billingPriceRepository = billingPriceRepository, this.billingProductRepository = billingProductRepository, this.billingMeterRepository = billingMeterRepository, this.stripeBillingMeterService = stripeBillingMeterService, this.stripeProductService = stripeProductService, this.stripePriceService = stripePriceService, this.batchSize = 5;
    }
};
BillingSyncPlansDataCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'billing:sync-plans-data',
        description: 'Fetches from stripe the plans data (meter, product and price) and upserts it into the database'
    }),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingpriceentity.BillingPriceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_billingproductentity.BillingProductEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_billingmeterentity.BillingMeterEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _stripebillingmeterservice.StripeBillingMeterService === "undefined" ? Object : _stripebillingmeterservice.StripeBillingMeterService,
        typeof _stripeproductservice.StripeProductService === "undefined" ? Object : _stripeproductservice.StripeProductService,
        typeof _stripepriceservice.StripePriceService === "undefined" ? Object : _stripepriceservice.StripePriceService
    ])
], BillingSyncPlansDataCommand);

//# sourceMappingURL=billing-sync-plans-data.command.js.map