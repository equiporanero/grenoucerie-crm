"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDuplicateConditions", {
    enumerable: true,
    get: function() {
        return buildDuplicateConditions;
    }
});
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _settings = require("../../constants/settings");
const _formatdatautil = require("../../twenty-orm/utils/format-data.util");
const _formatresultutil = require("../../twenty-orm/utils/format-result.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const buildDuplicateConditions = (flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, records, filteringByExistingRecordId)=>{
    if (!records || records.length === 0) {
        return {};
    }
    const criteriaCollection = flatObjectMetadata.duplicateCriteria || [];
    const formattedRecords = (0, _formatdatautil.formatData)(records, flatObjectMetadata, flatFieldMetadataMaps);
    const compositeFieldMetadataMap = (0, _formatresultutil.getCompositeFieldMetadataMap)(flatObjectMetadata, flatFieldMetadataMaps);
    const conditions = formattedRecords.flatMap((record)=>{
        const criteriaWithMatchingArgs = criteriaCollection.filter((criteria)=>criteria.every((columnName)=>{
                const value = record[columnName];
                return value && value.length >= _settings.settings.minLengthOfStringForDuplicateCheck;
            }));
        return criteriaWithMatchingArgs.map((criteria)=>{
            const condition = {};
            criteria.forEach((columnName)=>{
                const compositeFieldMetadata = compositeFieldMetadataMap.get(columnName);
                if (compositeFieldMetadata) {
                    // @ts-expect-error legacy noImplicitAny
                    condition[compositeFieldMetadata.parentField] = {
                        // @ts-expect-error legacy noImplicitAny
                        ...condition[compositeFieldMetadata.parentField],
                        [compositeFieldMetadata.name]: {
                            eq: record[columnName]
                        }
                    };
                } else {
                    // @ts-expect-error legacy noImplicitAny
                    condition[columnName] = {
                        eq: record[columnName]
                    };
                }
            });
            return condition;
        });
    });
    const filter = {};
    if (conditions && !(0, _lodashisempty.default)(conditions)) {
        filter.or = conditions;
        if (filteringByExistingRecordId) {
            filter.id = {
                neq: filteringByExistingRecordId
            };
        }
    }
    return filter;
};

//# sourceMappingURL=build-duplicate-conditions.utils.js.map