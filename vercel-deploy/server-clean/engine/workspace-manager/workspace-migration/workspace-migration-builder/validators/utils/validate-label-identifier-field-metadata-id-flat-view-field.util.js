"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateLabelIdentifierFieldMetadataIdFlatViewField", {
    enumerable: true,
    get: function() {
        return validateLabelIdentifierFieldMetadataIdFlatViewField;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _isviewfieldinlowestpositionutil = require("../../../../../metadata-modules/flat-view-field/utils/is-view-field-in-lowest-position.util");
const _viewexception = require("../../../../../metadata-modules/view/exceptions/view.exception");
const validateLabelIdentifierFieldMetadataIdFlatViewField = ({ otherFlatViewFields, flatViewFieldToValidate })=>{
    const errors = [];
    if (otherFlatViewFields.length > 0 && !(0, _isviewfieldinlowestpositionutil.isViewFieldInLowestPosition)({
        flatViewField: flatViewFieldToValidate,
        otherFlatViewFields
    })) {
        errors.push({
            code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "rI+dAx",
                message: "Label identifier view field has to be in the lowest position"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "rI+dAx",
                message: "Label identifier view field has to be in the lowest position"
            }
        });
    }
    if (flatViewFieldToValidate.isVisible === false) {
        errors.push({
            code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "PqTWJf",
                message: "Label identifier view field has to be visible"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "PqTWJf",
                message: "Label identifier view field has to be visible"
            }
        });
    }
    if ((0, _utils.isDefined)(flatViewFieldToValidate.deletedAt)) {
        errors.push({
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
    }
    return errors;
};

//# sourceMappingURL=validate-label-identifier-field-metadata-id-flat-view-field.util.js.map