"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recomputeViewFiltersOnFlatFieldMetadataOptionsUpdate", {
    enumerable: true,
    get: function() {
        return recomputeViewFiltersOnFlatFieldMetadataOptionsUpdate;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _comparetwoflatfieldmetadataenumoptionsutil = require("./compare-two-flat-field-metadata-enum-options.util");
const recomputeViewFiltersOnFlatFieldMetadataOptionsUpdate = ({ flatViewFilterMaps, fromFlatFieldMetadata, toOptions })=>{
    const flatViewFiltersToCreateAndUpdate = {
        flatViewFiltersToDelete: [],
        flatViewFiltersToUpdate: []
    };
    const { deleted: deletedFieldMetadataOptions, updated: updatedFieldMetadataOptions } = (0, _comparetwoflatfieldmetadataenumoptionsutil.compareTwoFlatFieldMetadataEnumOptions)({
        compareLabel: false,
        fromOptions: fromFlatFieldMetadata.options,
        toOptions
    });
    if (deletedFieldMetadataOptions.length === 0 && updatedFieldMetadataOptions.length === 0) {
        return flatViewFiltersToCreateAndUpdate;
    }
    const flatViewFilters = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityIds: fromFlatFieldMetadata.viewFilterIds,
        flatEntityMaps: flatViewFilterMaps
    });
    for (const viewFilter of flatViewFilters){
        const rawViewFilterValue = viewFilter.value;
        if (!(0, _utils.isDefined)(rawViewFilterValue)) {
            continue;
        }
        // TODO: all view filter value should be stored as JSON, this is ongoing work (we are missing a command to migrate the data)
        const viewFilterValue = (0, _guards.isNonEmptyString)(rawViewFilterValue) ? (0, _utils.parseJson)(rawViewFilterValue) : rawViewFilterValue;
        if (!(0, _utils.isDefined)(viewFilterValue) || !Array.isArray(viewFilterValue)) {
            throw new _fieldmetadataexception.FieldMetadataException(`Unexpected invalid view filter value for filter ${viewFilter.id}`, _fieldmetadataexception.FieldMetadataExceptionCode.INTERNAL_SERVER_ERROR);
        }
        const viewFilterOptions = viewFilterValue.flatMap((value)=>{
            if (!(0, _utils.isDefined)(fromFlatFieldMetadata.options)) {
                return undefined;
            }
            return fromFlatFieldMetadata.options.find((option)=>option.value === value);
        }).filter(_utils.isDefined);
        const afterDeleteViewFilterOptions = viewFilterOptions.filter((viewFilterOption)=>!deletedFieldMetadataOptions.some((option)=>option.value === viewFilterOption.value));
        if (afterDeleteViewFilterOptions.length === 0) {
            flatViewFiltersToCreateAndUpdate.flatViewFiltersToDelete.push(viewFilter);
            continue;
        }
        const afterUpdateAndDeleteViewFilterOptions = afterDeleteViewFilterOptions.map((viewFilterOption)=>{
            const updatedOption = updatedFieldMetadataOptions.find(({ from })=>viewFilterOption.value === from.value);
            return (0, _utils.isDefined)(updatedOption) ? updatedOption.to : viewFilterOption;
        });
        const optionsValues = afterUpdateAndDeleteViewFilterOptions.map((option)=>option.value);
        flatViewFiltersToCreateAndUpdate.flatViewFiltersToUpdate.push({
            ...viewFilter,
            value: optionsValues
        });
    }
    return flatViewFiltersToCreateAndUpdate;
};

//# sourceMappingURL=recompute-view-filters-on-flat-field-metadata-options-update.util.js.map