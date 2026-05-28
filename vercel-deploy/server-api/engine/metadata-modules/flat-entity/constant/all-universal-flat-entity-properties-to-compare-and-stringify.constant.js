"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY", {
    enumerable: true,
    get: function() {
        return ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY;
    }
});
const _metadata = require("twenty-shared/metadata");
const _allentitypropertiesconfigurationbymetadatanameconstant = require("./all-entity-properties-configuration-by-metadata-name.constant");
// TODO remove once https://github.com/twentyhq/core-team-issues/issues/2227 has been resolved
const EXTRA_PROPERTIES_TO_COMPARE = {
    index: {
        flatIndexFieldMetadatas: {
            toStringify: true,
            universalProperty: 'universalFlatIndexFieldMetadatas',
            toCompare: true
        }
    }
};
const computeUniversalFlatEntityPropertiesToCompareAndStringify = (metadataName)=>{
    const entries = Object.entries({
        ..._allentitypropertiesconfigurationbymetadatanameconstant.ALL_ENTITY_PROPERTIES_CONFIGURATION_BY_METADATA_NAME[metadataName],
        ...EXTRA_PROPERTIES_TO_COMPARE[metadataName]
    });
    const accumulator = {
        propertiesToCompare: [],
        propertiesToStringify: []
    };
    for (const [property, configuration] of entries){
        if (!configuration.toCompare) {
            continue;
        }
        const comparedProperty = configuration.universalProperty ?? property;
        accumulator.propertiesToCompare.push(comparedProperty);
        if (configuration.toStringify === true) {
            accumulator.propertiesToStringify.push(comparedProperty);
        }
    }
    return accumulator;
};
const ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY = Object.values(_metadata.ALL_METADATA_NAME).reduce((acc, metadataName)=>({
        ...acc,
        [metadataName]: computeUniversalFlatEntityPropertiesToCompareAndStringify(metadataName)
    }), {});

//# sourceMappingURL=all-universal-flat-entity-properties-to-compare-and-stringify.constant.js.map