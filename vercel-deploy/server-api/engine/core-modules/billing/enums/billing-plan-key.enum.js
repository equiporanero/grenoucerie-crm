/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingPlanKey", {
    enumerable: true,
    get: function() {
        return BillingPlanKey;
    }
});
const _graphql = require("@nestjs/graphql");
var BillingPlanKey = /*#__PURE__*/ function(BillingPlanKey) {
    BillingPlanKey["PRO"] = "PRO";
    BillingPlanKey["ENTERPRISE"] = "ENTERPRISE";
    return BillingPlanKey;
}({});
(0, _graphql.registerEnumType)(BillingPlanKey, {
    name: 'BillingPlanKey',
    description: 'The different billing plans available'
});

//# sourceMappingURL=billing-plan-key.enum.js.map