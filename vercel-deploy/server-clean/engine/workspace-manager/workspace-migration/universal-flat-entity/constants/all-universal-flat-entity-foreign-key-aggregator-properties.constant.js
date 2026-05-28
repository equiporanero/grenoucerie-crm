"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ALL_UNIVERSAL_FLAT_ENTITY_FOREIGN_KEY_AGGREGATOR_PROPERTIES", {
    enumerable: true,
    get: function() {
        return ALL_UNIVERSAL_FLAT_ENTITY_FOREIGN_KEY_AGGREGATOR_PROPERTIES;
    }
});
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _allonetomanymetadatarelationsconstant = require("../../../../metadata-modules/flat-entity/constant/all-one-to-many-metadata-relations.constant");
const computeForeignKeyAggregatorProperties = (metadataName)=>{
    const oneToManyRelations = _allonetomanymetadatarelationsconstant.ALL_ONE_TO_MANY_METADATA_RELATIONS[metadataName];
    const aggregatorProperties = [];
    for (const relation of Object.values(oneToManyRelations)){
        if (!(0, _utils.isDefined)(relation)) {
            continue;
        }
        if ((0, _utils.isDefined)(relation.universalFlatEntityForeignKeyAggregator)) {
            aggregatorProperties.push(relation.universalFlatEntityForeignKeyAggregator);
        }
    }
    return aggregatorProperties;
};
const ALL_UNIVERSAL_FLAT_ENTITY_FOREIGN_KEY_AGGREGATOR_PROPERTIES = Object.values(_metadata.ALL_METADATA_NAME).reduce((acc, metadataName)=>({
        ...acc,
        [metadataName]: computeForeignKeyAggregatorProperties(metadataName)
    }), {});

//# sourceMappingURL=all-universal-flat-entity-foreign-key-aggregator-properties.constant.js.map