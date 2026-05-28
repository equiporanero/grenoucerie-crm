"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "compareTwoFlatEntity", {
    enumerable: true,
    get: function() {
        return compareTwoFlatEntity;
    }
});
const _microdiff = /*#__PURE__*/ _interop_require_default(require("microdiff"));
const _utils = require("twenty-shared/utils");
const _alluniversalflatentitypropertiestocompareandstringifyconstant = require("../../../../metadata-modules/flat-entity/constant/all-universal-flat-entity-properties-to-compare-and-stringify.constant");
const _transformuniversalflatentityforcomparisonutil = require("./transform-universal-flat-entity-for-comparison.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const compareTwoFlatEntity = ({ fromUniversalFlatEntity, toUniversalFlatEntity, metadataName })=>{
    const { propertiesToStringify, propertiesToCompare } = _alluniversalflatentitypropertiestocompareandstringifyconstant.ALL_UNIVERSAL_FLAT_ENTITY_PROPERTIES_TO_COMPARE_AND_STRINGIFY[metadataName];
    const [transformedFromUniversalFlatEntity, transformedToUniversalFlatEntity] = [
        fromUniversalFlatEntity,
        toUniversalFlatEntity
    ].map((universalFlatEntity)=>(0, _transformuniversalflatentityforcomparisonutil.transformUniversalFlatEntityForComparison)({
            metadataName,
            universalFlatEntity,
            propertiesToCompare,
            propertiesToStringify
        }));
    const flatEntityDifferences = (0, _microdiff.default)(transformedFromUniversalFlatEntity, transformedToUniversalFlatEntity);
    if (flatEntityDifferences.length === 0) {
        return undefined;
    }
    const initialAccumulator = {};
    return flatEntityDifferences.reduce((accumulator, difference)=>{
        switch(difference.type){
            case 'CHANGE':
                {
                    const { path, value } = difference;
                    const property = path[0];
                    const isJsonb = propertiesToStringify.includes(property);
                    if (isJsonb) {
                        return {
                            ...accumulator,
                            [property]: (0, _utils.parseJson)(value)
                        };
                    }
                    return {
                        ...accumulator,
                        [property]: value
                    };
                }
            case 'CREATE':
            case 'REMOVE':
            default:
                {
                    // Should never occur, we should only provide null never undefined and so on
                    return accumulator;
                }
        }
    }, initialAccumulator);
};

//# sourceMappingURL=compare-two-universal-flat-entity.util.js.map