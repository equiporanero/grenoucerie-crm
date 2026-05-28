"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdatePageLayoutInputToFlatPageLayoutToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdatePageLayoutInputToFlatPageLayoutToUpdateOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _flatpagelayouteditablepropertiesconstant = require("../constants/flat-page-layout-editable-properties.constant");
const _pagelayoutexception = require("../../page-layout/exceptions/page-layout.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdatePageLayoutInputToFlatPageLayoutToUpdateOrThrow = ({ updatePageLayoutInput: rawUpdatePageLayoutInput, flatPageLayoutMaps, flatObjectMetadataMaps })=>{
    const { id: pageLayoutToUpdateId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdatePageLayoutInput, [
        'id'
    ]);
    const existingFlatPageLayoutToUpdate = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: pageLayoutToUpdateId,
        flatEntityMaps: flatPageLayoutMaps
    });
    if (!(0, _utils.isDefined)(existingFlatPageLayoutToUpdate)) {
        throw new _pagelayoutexception.PageLayoutException(_core.i18n._(/*i18n*/ {
            id: "/5c/t7",
            message: "Page layout to update not found"
        }), _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND);
    }
    const updatedEditableFieldProperties = (0, _utils.extractAndSanitizeObjectStringFields)(rawUpdatePageLayoutInput.update, _flatpagelayouteditablepropertiesconstant.FLAT_PAGE_LAYOUT_EDITABLE_PROPERTIES);
    const flatPageLayoutToUpdate = (0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
        existing: existingFlatPageLayoutToUpdate,
        properties: _flatpagelayouteditablepropertiesconstant.FLAT_PAGE_LAYOUT_EDITABLE_PROPERTIES,
        update: updatedEditableFieldProperties
    });
    if (updatedEditableFieldProperties.objectMetadataId !== undefined) {
        const { objectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'pageLayout',
            foreignKeyValues: {
                objectMetadataId: flatPageLayoutToUpdate.objectMetadataId
            },
            flatEntityMaps: {
                flatObjectMetadataMaps
            }
        });
        flatPageLayoutToUpdate.objectMetadataUniversalIdentifier = objectMetadataUniversalIdentifier;
    }
    return flatPageLayoutToUpdate;
};

//# sourceMappingURL=from-update-page-layout-input-to-flat-page-layout-to-update-or-throw.util.js.map