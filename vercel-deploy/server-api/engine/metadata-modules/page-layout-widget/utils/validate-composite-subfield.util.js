"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateCompositeSubfield", {
    enumerable: true,
    get: function() {
        return validateCompositeSubfield;
    }
});
const _utils = require("twenty-shared/utils");
const _getcompositesubfieldnamesutil = require("./get-composite-subfield-names.util");
const validateCompositeSubfield = ({ field, subFieldName, paramName })=>{
    const allowedSubFields = (0, _getcompositesubfieldnamesutil.getCompositeSubfieldNames)(field.type);
    if (!(0, _utils.isDefined)(subFieldName)) {
        throw new Error(`Composite field "${paramName}" requires a subfield. Allowed: ${allowedSubFields.join(', ')}`);
    }
    if (subFieldName.includes('.')) {
        throw new Error(`Composite subfield "${subFieldName}" is invalid.`);
    }
    if (!allowedSubFields.includes(subFieldName)) {
        throw new Error(`Invalid subfield "${subFieldName}" for "${paramName}". Allowed: ${allowedSubFields.join(', ')}`);
    }
};

//# sourceMappingURL=validate-composite-subfield.util.js.map