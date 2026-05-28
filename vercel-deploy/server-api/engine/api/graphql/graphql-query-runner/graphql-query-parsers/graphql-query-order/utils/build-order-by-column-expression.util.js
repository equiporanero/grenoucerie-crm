"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get buildOrderByColumnExpression () {
        return buildOrderByColumnExpression;
    },
    get shouldCastToText () {
        return shouldCastToText;
    },
    get shouldUseCaseInsensitiveOrder () {
        return shouldUseCaseInsensitiveOrder;
    }
});
const _types = require("twenty-shared/types");
const shouldUseCaseInsensitiveOrder = (fieldType)=>{
    return fieldType === _types.FieldMetadataType.TEXT || fieldType === _types.FieldMetadataType.SELECT || fieldType === _types.FieldMetadataType.MULTI_SELECT;
};
const shouldCastToText = (fieldType)=>{
    return fieldType === _types.FieldMetadataType.SELECT || fieldType === _types.FieldMetadataType.MULTI_SELECT;
};
const buildOrderByColumnExpression = (prefix, columnName)=>{
    return `${prefix}.${columnName}`;
};

//# sourceMappingURL=build-order-by-column-expression.util.js.map