"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteUniversalFlatEntityForeignKeyAggregators", {
    enumerable: true,
    get: function() {
        return deleteUniversalFlatEntityForeignKeyAggregators;
    }
});
const _alluniversalflatentityforeignkeyaggregatorpropertiesconstant = require("../constants/all-universal-flat-entity-foreign-key-aggregator-properties.constant");
const deleteUniversalFlatEntityForeignKeyAggregators = ({ universalFlatEntity, metadataName })=>{
    const aggregatorProperties = _alluniversalflatentityforeignkeyaggregatorpropertiesconstant.ALL_UNIVERSAL_FLAT_ENTITY_FOREIGN_KEY_AGGREGATOR_PROPERTIES[metadataName];
    if (aggregatorProperties.length === 0) {
        return universalFlatEntity;
    }
    const result = {
        ...universalFlatEntity
    };
    for (const aggregatorProperty of aggregatorProperties){
        delete result[aggregatorProperty];
    }
    return result;
};

//# sourceMappingURL=delete-universal-flat-entity-foreign-key-aggregators.util.js.map