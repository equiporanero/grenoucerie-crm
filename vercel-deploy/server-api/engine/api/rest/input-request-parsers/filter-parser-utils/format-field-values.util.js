"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatFieldValue", {
    enumerable: true,
    get: function() {
        return formatFieldValue;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const formatFieldValue = (value, fieldType, comparator)=>{
    if ((0, _utils.isDefined)(comparator) && [
        'in',
        'containsAny'
    ].includes(comparator)) {
        if (value[0] !== '[' || value[value.length - 1] !== ']') {
            throw new _common.BadRequestException(`'filter' invalid for '${comparator}' operator. Received '${value}' but array value expected eg: 'field[${comparator}]:[value_1,value_2]'`);
        }
        const stringValues = value.substring(1, value.length - 1);
        return stringValues.split(',').map((value)=>formatFieldValue(value, fieldType));
    }
    if (comparator === 'is') {
        return value;
    }
    switch(fieldType){
        case _types.FieldMetadataType.NUMERIC:
            return parseInt(value);
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.POSITION:
            return parseFloat(value);
        case _types.FieldMetadataType.BOOLEAN:
            return value.toLowerCase() === 'true';
    }
    if ((value[0] === '"' || value[0] === "'") && (value.charAt(value.length - 1) === '"' || value.charAt(value.length - 1) === "'")) {
        return value.substring(1, value.length - 1);
    }
    return value;
};

//# sourceMappingURL=format-field-values.util.js.map