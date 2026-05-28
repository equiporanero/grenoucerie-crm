"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "convertChartFilterToGqlOperationFilter", {
    enumerable: true,
    get: function() {
        return convertChartFilterToGqlOperationFilter;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const convertChartFilterToGqlOperationFilter = ({ filter, flatFieldMetadataMaps, userTimezone })=>{
    if (!(0, _utils.isDefined)(filter)) {
        return {};
    }
    const recordFilters = filter.recordFilters ?? [];
    const recordFilterGroups = filter.recordFilterGroups ?? [];
    if (recordFilters.length === 0 && recordFilterGroups.length === 0) {
        return {};
    }
    const convertedRecordFilters = recordFilters.map((recordFilter)=>{
        const field = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: recordFilter.fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        return {
            fieldMetadataId: recordFilter.fieldMetadataId,
            value: recordFilter.value ?? '',
            type: field?.type ?? recordFilter.type ?? '',
            recordFilterGroupId: recordFilter.recordFilterGroupId ?? undefined,
            operand: recordFilter.operand,
            subFieldName: recordFilter.subFieldName ?? undefined,
            relationTargetFieldMetadataId: recordFilter.relationTargetFieldMetadataId ?? null
        };
    });
    const convertedRecordFilterGroups = recordFilterGroups.map((recordFilterGroup)=>({
            id: recordFilterGroup.id,
            parentRecordFilterGroupId: recordFilterGroup.parentRecordFilterGroupId ?? undefined,
            logicalOperator: recordFilterGroup.logicalOperator
        }));
    return (0, _utils.computeRecordGqlOperationFilter)({
        fieldMetadataItems: Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined),
        recordFilters: convertedRecordFilters,
        recordFilterGroups: convertedRecordFilterGroups,
        filterValueDependencies: {
            timeZone: userTimezone
        }
    });
};

//# sourceMappingURL=convert-chart-filter-to-gql-operation-filter.util.js.map