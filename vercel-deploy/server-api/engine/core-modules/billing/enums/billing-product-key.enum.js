/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingProductKey", {
    enumerable: true,
    get: function() {
        return BillingProductKey;
    }
});
const _graphql = require("@nestjs/graphql");
var BillingProductKey = /*#__PURE__*/ function(BillingProductKey) {
    BillingProductKey["BASE_PRODUCT"] = "BASE_PRODUCT";
    BillingProductKey["RESOURCE_CREDIT"] = "RESOURCE_CREDIT";
    return BillingProductKey;
}({});
(0, _graphql.registerEnumType)(BillingProductKey, {
    name: 'BillingProductKey',
    description: 'The different billing products available'
});

//# sourceMappingURL=billing-product-key.enum.js.map