"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatColumnNamesFromCompositeFieldAndSubfields", {
    enumerable: true,
    get: function() {
        return formatColumnNamesFromCompositeFieldAndSubfields;
    }
});
const _utils = require("twenty-shared/utils");
const formatColumnNamesFromCompositeFieldAndSubfields = (fieldName, subFieldNames)=>{
    if ((0, _utils.isDefined)(subFieldNames)) {
        return subFieldNames.map((subFieldName)=>`${fieldName}${(0, _utils.capitalize)(subFieldName)}`);
    }
    return [
        fieldName
    ];
};

//# sourceMappingURL=format-column-names-from-composite-field-and-subfield.util.js.map