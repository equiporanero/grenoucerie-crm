"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDefaultViewFilterOperand", {
    enumerable: true,
    get: function() {
        return getDefaultViewFilterOperand;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const getDefaultViewFilterOperand = ({ fieldType, subFieldName, relationTargetFieldType })=>{
    const effectiveFieldType = fieldType === _types.FieldMetadataType.RELATION && (0, _utils.isDefined)(relationTargetFieldType) ? relationTargetFieldType : fieldType;
    if (!(effectiveFieldType in _utils.FILTER_OPERANDS_MAP)) {
        return undefined;
    }
    return (0, _utils.getFilterOperandsForFilterableFieldType)({
        filterType: effectiveFieldType,
        subFieldName
    })[0];
};

//# sourceMappingURL=get-default-view-filter-operand.util.js.map