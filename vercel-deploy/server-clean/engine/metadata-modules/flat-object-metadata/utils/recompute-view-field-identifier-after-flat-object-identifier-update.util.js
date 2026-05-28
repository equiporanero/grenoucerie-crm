"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recomputeViewFieldIdentifierAfterFlatObjectIdentifierUpdate", {
    enumerable: true,
    get: function() {
        return recomputeViewFieldIdentifierAfterFlatObjectIdentifierUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _defaultviewfieldsizeconstant = require("../../flat-view-field/constants/default-view-field-size.constant");
const recomputeViewFieldIdentifierAfterFlatObjectIdentifierUpdate = ({ existingFlatObjectMetadata, flatViewFieldMaps, flatViewMaps, flatFieldMetadataMaps, updatedLabelIdentifierFieldMetadataId })=>{
    const flatViews = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatViewMaps,
        flatEntityIds: existingFlatObjectMetadata.viewIds
    });
    const updatedLabelIdentifierFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityId: updatedLabelIdentifierFieldMetadataId
    });
    const accumulator = {
        flatViewFieldsToCreate: [],
        flatViewFieldsToUpdate: []
    };
    for (const flatView of flatViews){
        const flatViewFields = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityIds: flatView.viewFieldIds,
            flatEntityMaps: flatViewFieldMaps
        });
        const labelMetadataIdentifierViewField = flatViewFields.find((viewField)=>viewField.fieldMetadataId === updatedLabelIdentifierFieldMetadataId);
        const ascSortedViewFieldPositions = flatViewFields.map(({ position })=>position).sort((a, b)=>a - b);
        const lowestViewFieldPosition = ascSortedViewFieldPositions.length > 0 ? ascSortedViewFieldPositions[0] : 0;
        if (!(0, _utils.isDefined)(labelMetadataIdentifierViewField)) {
            const viewFieldId = (0, _uuid.v4)();
            const createdAt = new Date().toISOString();
            const flatViewFieldToCreate = {
                fieldMetadataId: updatedLabelIdentifierFieldMetadataId,
                fieldMetadataUniversalIdentifier: updatedLabelIdentifierFieldMetadata.universalIdentifier,
                position: lowestViewFieldPosition - 1,
                isVisible: true,
                isActive: true,
                size: _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
                viewId: flatView.id,
                viewUniversalIdentifier: flatView.universalIdentifier,
                workspaceId: flatView.workspaceId,
                id: viewFieldId,
                createdAt: createdAt,
                updatedAt: createdAt,
                deletedAt: null,
                universalIdentifier: viewFieldId,
                aggregateOperation: null,
                viewFieldGroupId: null,
                viewFieldGroupUniversalIdentifier: null,
                overrides: null,
                universalOverrides: null,
                applicationId: existingFlatObjectMetadata.applicationId,
                applicationUniversalIdentifier: existingFlatObjectMetadata.applicationUniversalIdentifier
            };
            accumulator.flatViewFieldsToCreate.push(flatViewFieldToCreate);
        } else if (labelMetadataIdentifierViewField.position > lowestViewFieldPosition) {
            const updatedFlatViewField = {
                ...labelMetadataIdentifierViewField,
                position: lowestViewFieldPosition - 1
            };
            accumulator.flatViewFieldsToUpdate.push(updatedFlatViewField);
        }
    }
    return accumulator;
};

//# sourceMappingURL=recompute-view-field-identifier-after-flat-object-identifier-update.util.js.map