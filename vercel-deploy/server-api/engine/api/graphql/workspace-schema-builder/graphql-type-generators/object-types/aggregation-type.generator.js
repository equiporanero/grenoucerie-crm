"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AggregationObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return AggregationObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _getavailableaggregationsfromobjectfieldsutil = require("../../utils/get-available-aggregations-from-object-fields.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AggregationObjectTypeGenerator = class AggregationObjectTypeGenerator {
    generate(flatFields) {
        const availableAggregations = (0, _getavailableaggregationsfromobjectfieldsutil.getAvailableAggregationsFromObjectFields)(flatFields);
        return Object.entries(availableAggregations).reduce((acc, [key, agg])=>{
            acc[key] = {
                type: agg.type,
                description: agg.description
            };
            return acc;
        }, {});
    }
};
AggregationObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)()
], AggregationObjectTypeGenerator);

//# sourceMappingURL=aggregation-type.generator.js.map