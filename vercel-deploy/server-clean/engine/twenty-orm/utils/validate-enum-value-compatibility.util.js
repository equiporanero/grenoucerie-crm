"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateEnumValueCompatibility", {
    enumerable: true,
    get: function() {
        return validateEnumValueCompatibility;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const validateEnumValueCompatibility = ({ workspaceMemberFieldMetadata, targetFieldMetadata, predicateValue })=>{
    const isWorkspaceMemberFieldEnum = workspaceMemberFieldMetadata.type === _types.FieldMetadataType.SELECT || workspaceMemberFieldMetadata.type === _types.FieldMetadataType.MULTI_SELECT;
    const isTargetFieldEnum = targetFieldMetadata.type === _types.FieldMetadataType.SELECT || targetFieldMetadata.type === _types.FieldMetadataType.MULTI_SELECT;
    if (!isWorkspaceMemberFieldEnum || !isTargetFieldEnum) {
        return true;
    }
    const targetFieldOptions = targetFieldMetadata.options || [];
    const validTargetValues = new Set(targetFieldOptions.map((option)=>option.value));
    if (validTargetValues.size === 0) {
        return true;
    }
    const valuesToCheck = Array.isArray(predicateValue) ? predicateValue : [
        predicateValue
    ];
    const allValuesAreValid = valuesToCheck.every((value)=>(0, _utils.isDefined)(value) && validTargetValues.has(String(value)));
    return allValuesAreValid;
};

//# sourceMappingURL=validate-enum-value-compatibility.util.js.map