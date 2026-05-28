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
    get getUniversalFlatEntityEmptyForeignKeyAggregators () {
        return getUniversalFlatEntityEmptyForeignKeyAggregators;
    },
    get resetUniversalFlatEntityForeignKeyAggregators () {
        return resetUniversalFlatEntityForeignKeyAggregators;
    }
});
const _alluniversalflatentityforeignkeyaggregatorpropertiesconstant = require("../constants/all-universal-flat-entity-foreign-key-aggregator-properties.constant");
const getUniversalFlatEntityEmptyForeignKeyAggregators = ({ metadataName })=>{
    const aggregatorProperties = _alluniversalflatentityforeignkeyaggregatorpropertiesconstant.ALL_UNIVERSAL_FLAT_ENTITY_FOREIGN_KEY_AGGREGATOR_PROPERTIES[metadataName];
    const emptyAggregatorsRecord = {};
    for (const aggregatorProperty of aggregatorProperties){
        emptyAggregatorsRecord[aggregatorProperty] = [];
    }
    return emptyAggregatorsRecord;
};
const resetUniversalFlatEntityForeignKeyAggregators = ({ universalFlatEntity, metadataName })=>{
    const overrides = getUniversalFlatEntityEmptyForeignKeyAggregators({
        metadataName
    });
    return {
        ...universalFlatEntity,
        ...overrides
    };
};

//# sourceMappingURL=reset-universal-flat-entity-foreign-key-aggregators.util.js.map