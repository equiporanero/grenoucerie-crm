"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateViewFilterInputToFlatViewFilterToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateViewFilterInputToFlatViewFilterToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _flatviewfiltereditablepropertiesconstant = require("../constants/flat-view-filter-editable-properties.constant");
const _viewfilterexception = require("../../view-filter/exceptions/view-filter.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateViewFilterInputToFlatViewFilterToUpdateOrThrow = ({ updateViewFilterInput: rawUpdateViewFilterInput, flatViewFilterMaps, flatFieldMetadataMaps, flatViewFilterGroupMaps })=>{
    const { id: viewFilterToUpdateId } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawUpdateViewFilterInput, [
        'id'
    ]);
    const existingFlatViewFilterToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFilterToUpdateId,
        flatEntityMaps: flatViewFilterMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFilterToUpdate)) {
        throw new _viewfilterexception.ViewFilterException(_core.i18n._(/*i18n*/ {
            id: "GzthLy",
            message: "View filter to update not found"
        }), _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND);
    }
    const updatedEditableFieldProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdateViewFilterInput.update, _flatviewfiltereditablepropertiesconstant.FLAT_VIEW_FILTER_EDITABLE_PROPERTIES);
    const flatViewFilterToUpdate = (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
        existing: existingFlatViewFilterToUpdate,
        properties: _flatviewfiltereditablepropertiesconstant.FLAT_VIEW_FILTER_EDITABLE_PROPERTIES,
        update: updatedEditableFieldProperties
    });
    if (updatedEditableFieldProperties.fieldMetadataId !== undefined) {
        const { fieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'viewFilter',
            foreignKeyValues: {
                fieldMetadataId: flatViewFilterToUpdate.fieldMetadataId
            },
            flatEntityMaps: {
                flatFieldMetadataMaps
            }
        });
        flatViewFilterToUpdate.fieldMetadataUniversalIdentifier = fieldMetadataUniversalIdentifier;
    }
    if (updatedEditableFieldProperties.viewFilterGroupId !== undefined) {
        const { viewFilterGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'viewFilter',
            foreignKeyValues: {
                viewFilterGroupId: flatViewFilterToUpdate.viewFilterGroupId
            },
            flatEntityMaps: {
                flatViewFilterGroupMaps
            }
        });
        flatViewFilterToUpdate.viewFilterGroupUniversalIdentifier = viewFilterGroupUniversalIdentifier;
    }
    if (updatedEditableFieldProperties.relationTargetFieldMetadataId !== undefined) {
        const { relationTargetFieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'viewFilter',
            foreignKeyValues: {
                relationTargetFieldMetadataId: flatViewFilterToUpdate.relationTargetFieldMetadataId
            },
            flatEntityMaps: {
                flatFieldMetadataMaps
            }
        });
        flatViewFilterToUpdate.relationTargetFieldMetadataUniversalIdentifier = relationTargetFieldMetadataUniversalIdentifier;
    }
    return flatViewFilterToUpdate;
};

//# sourceMappingURL=from-update-view-filter-input-to-flat-view-filter-to-update-or-throw.util.js.map