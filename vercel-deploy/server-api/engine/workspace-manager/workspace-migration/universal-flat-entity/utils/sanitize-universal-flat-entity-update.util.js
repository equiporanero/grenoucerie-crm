"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeUniversalFlatEntityUpdate", {
    enumerable: true,
    get: function() {
        return sanitizeUniversalFlatEntityUpdate;
    }
});
const _alluniversalflatentitypropertiestocompareandstringifyconstant = require("../../../../metadata-modules/flat-entity/constant/all-universal-flat-entity-properties-to-compare-and-stringify.constant");
const sanitizeUniversalFlatEntityUpdate = ({ flatEntityUpdate, metadataName })=>{
    const { propertiesToCompare } = _alluniversalflatentitypropertiestocompareandstringifyconstant.ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY[metadataName];
    const initialAccumulator = {};
    return propertiesToCompare.reduce((accumulator, property)=>{
        const updatedValue = flatEntityUpdate[property];
        if (updatedValue === undefined) {
            return accumulator;
        }
        return {
            ...accumulator,
            [property]: updatedValue
        };
    }, initialAccumulator);
};

//# sourceMappingURL=sanitize-universal-flat-entity-update.util.js.map