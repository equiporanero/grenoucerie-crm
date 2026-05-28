"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get BillingLicensedProduct () {
        return BillingLicensedProduct;
    },
    get BillingMeteredProduct () {
        return BillingMeteredProduct;
    },
    get BillingProductDTO () {
        return BillingProductDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _billingproductmetadatatype = require("../types/billing-product-metadata.type");
const _billingpricelicenseddto = require("./billing-price-licensed.dto");
const _billingpricemetereddto = require("./billing-price-metered.dto");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingProductDTO = class BillingProductDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BillingProductDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BillingProductDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], BillingProductDTO.prototype, "images", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingproductmetadatatype.BillingProductMetadata),
    _ts_metadata("design:type", typeof _billingproductmetadatatype.BillingProductMetadata === "undefined" ? Object : _billingproductmetadatatype.BillingProductMetadata)
], BillingProductDTO.prototype, "metadata", void 0);
BillingProductDTO = _ts_decorate([
    (0, _graphql.InterfaceType)({
        resolveType (product) {
            return product.metadata.priceUsageBased === _billingusagetypeenum.BillingUsageType.METERED ? BillingMeteredProduct : BillingLicensedProduct;
        }
    }),
    (0, _graphql.ObjectType)('BillingProduct')
], BillingProductDTO);
let BillingLicensedProduct = class BillingLicensedProduct {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingpricelicenseddto.BillingPriceLicensedDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], BillingLicensedProduct.prototype, "prices", void 0);
BillingLicensedProduct = _ts_decorate([
    (0, _graphql.ObjectType)({
        implements: BillingProductDTO
    })
], BillingLicensedProduct);
let BillingMeteredProduct = class BillingMeteredProduct {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingpricemetereddto.BillingPriceMeteredDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], BillingMeteredProduct.prototype, "prices", void 0);
BillingMeteredProduct = _ts_decorate([
    (0, _graphql.ObjectType)({
        implements: BillingProductDTO
    })
], BillingMeteredProduct);

//# sourceMappingURL=billing-product.dto.js.map