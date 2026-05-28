/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingUsageType", {
    enumerable: true,
    get: function() {
        return BillingUsageType;
    }
});
const _graphql = require("@nestjs/graphql");
var BillingUsageType = /*#__PURE__*/ function(BillingUsageType) {
    BillingUsageType["METERED"] = "METERED";
    BillingUsageType["LICENSED"] = "LICENSED";
    return BillingUsageType;
}({});
(0, _graphql.registerEnumType)(BillingUsageType, {
    name: 'BillingUsageType',
    description: 'The different billing usage types'
});

//# sourceMappingURL=billing-usage-type.enum.js.map