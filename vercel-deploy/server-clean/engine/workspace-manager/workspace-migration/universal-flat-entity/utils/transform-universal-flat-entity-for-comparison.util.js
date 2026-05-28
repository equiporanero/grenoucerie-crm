"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformUniversalFlatEntityForComparison", {
    enumerable: true,
    get: function() {
        return transformUniversalFlatEntityForComparison;
    }
});
const _orderobjectpropertiesutil = require("../../../../metadata-modules/flat-entity/utils/order-object-properties.util");
function transformUniversalFlatEntityForComparison({ metadataName, universalFlatEntity, propertiesToCompare, propertiesToStringify }) {
    return propertiesToCompare.reduce((flatEntityAccumulator, propertyToCompare)=>{
        const currentValue = universalFlatEntity[propertyToCompare];
        // TODO remove once https://github.com/twentyhq/core-team-issues/issues/2227 has been resolved
        if (metadataName === 'index' && propertyToCompare === 'universalFlatIndexFieldMetadatas' && Array.isArray(currentValue)) {
            for (const item of currentValue){
                delete item['createdAt'];
                delete item['updatedAt'];
            }
        }
        if (propertiesToStringify.includes(propertyToCompare)) {
            const orderedValue = (0, _orderobjectpropertiesutil.orderObjectProperties)(currentValue);
            return {
                ...flatEntityAccumulator,
                [propertyToCompare]: JSON.stringify(orderedValue)
            };
        }
        return {
            ...flatEntityAccumulator,
            [propertyToCompare]: currentValue
        };
    }, {});
}

//# sourceMappingURL=transform-universal-flat-entity-for-comparison.util.js.map