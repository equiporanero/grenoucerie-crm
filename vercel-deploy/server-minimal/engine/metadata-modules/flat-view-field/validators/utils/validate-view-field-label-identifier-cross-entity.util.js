"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateViewFieldLabelIdentifierCrossEntity", {
    enumerable: true,
    get: function() {
        return validateViewFieldLabelIdentifierCrossEntity;
    }
});
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _viewexception = require("../../../view/exceptions/view.exception");
const _getflatentityvalidationerrorutil = require("../../../../workspace-manager/workspace-migration/workspace-migration-builder/builders/utils/get-flat-entity-validation-error.util");
const validateViewFieldLabelIdentifierCrossEntity = ({ optimisticUniversalFlatMaps, deletedViewFieldActions, preDeletionFlatViewFieldMaps })=>{
    const validationErrors = {
        viewField: []
    };
    if (deletedViewFieldActions.length === 0) {
        return validationErrors;
    }
    const alreadyCheckedViewUniversalIdentifiers = new Set();
    for (const deleteAction of deletedViewFieldActions){
        const deletedViewField = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: deleteAction.universalIdentifier,
            flatEntityMaps: preDeletionFlatViewFieldMaps
        });
        const { viewUniversalIdentifier, fieldMetadataUniversalIdentifier } = deletedViewField;
        if (alreadyCheckedViewUniversalIdentifiers.has(viewUniversalIdentifier)) {
            continue;
        }
        const view = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: viewUniversalIdentifier,
            flatEntityMaps: optimisticUniversalFlatMaps.flatViewMaps
        });
        if (!(0, _utils.isDefined)(view) || view.type === _types.ViewType.FIELDS_WIDGET) {
            continue;
        }
        const objectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: view.objectMetadataUniversalIdentifier,
            flatEntityMaps: optimisticUniversalFlatMaps.flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(objectMetadata)) {
            continue;
        }
        const { labelIdentifierFieldMetadataUniversalIdentifier } = objectMetadata;
        if (!(0, _utils.isDefined)(labelIdentifierFieldMetadataUniversalIdentifier)) {
            continue;
        }
        if (fieldMetadataUniversalIdentifier !== labelIdentifierFieldMetadataUniversalIdentifier) {
            continue;
        }
        alreadyCheckedViewUniversalIdentifiers.add(viewUniversalIdentifier);
        const viewFieldUniversalIdentifiers = view.viewFieldUniversalIdentifiers ?? [];
        const hasLabelIdentifierViewField = viewFieldUniversalIdentifiers.some((viewFieldUniversalIdentifier)=>{
            const viewField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: viewFieldUniversalIdentifier,
                flatEntityMaps: optimisticUniversalFlatMaps.flatViewFieldMaps
            });
            return (0, _utils.isDefined)(viewField) && viewField.fieldMetadataUniversalIdentifier === labelIdentifierFieldMetadataUniversalIdentifier;
        });
        if (!hasLabelIdentifierViewField) {
            const failedValidation = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
                flatEntityMinimalInformation: {
                    universalIdentifier: deleteAction.universalIdentifier,
                    viewUniversalIdentifier,
                    fieldMetadataUniversalIdentifier
                },
                metadataName: 'viewField',
                type: 'delete'
            });
            failedValidation.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "ACUSmL",
                    message: "Label identifier view field cannot be deleted"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ACUSmL",
                    message: "Label identifier view field cannot be deleted"
                }
            });
            validationErrors.viewField.push(failedValidation);
        }
    }
    return validationErrors;
};

//# sourceMappingURL=validate-view-field-label-identifier-cross-entity.util.js.map