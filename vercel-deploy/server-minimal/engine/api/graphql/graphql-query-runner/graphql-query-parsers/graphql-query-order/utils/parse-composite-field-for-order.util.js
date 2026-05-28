"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseCompositeFieldForOrder", {
    enumerable: true,
    get: function() {
        return parseCompositeFieldForOrder;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _buildorderbycolumnexpressionutil = require("./build-order-by-column-expression.util");
const _convertorderbytofindoptionsorder = require("./convert-order-by-to-find-options-order");
const _isorderbydirectionutil = require("./is-order-by-direction.util");
const parseCompositeFieldForOrder = (fieldMetadata, value, prefix, isForwardPagination = true)=>{
    const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
    if (!compositeType) {
        throw new Error(`Composite type definition not found for type: ${fieldMetadata.type}`);
    }
    return Object.entries(value).reduce((acc, [subFieldKey, subFieldValue])=>{
        const subFieldMetadata = compositeType.properties.find((property)=>property.name === subFieldKey);
        if (!subFieldMetadata) {
            throw new Error(`Sub field metadata not found for composite type: ${fieldMetadata.type}`);
        }
        const orderByKey = (0, _buildorderbycolumnexpressionutil.buildOrderByColumnExpression)(prefix, `${fieldMetadata.name}${(0, _utils.capitalize)(subFieldKey)}`);
        if (!(0, _isorderbydirectionutil.isOrderByDirection)(subFieldValue)) {
            throw new Error(`Sub field order by value must be of type OrderByDirection, but got: ${subFieldValue}`);
        }
        acc[orderByKey] = {
            ...(0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(subFieldValue, isForwardPagination),
            useLower: (0, _buildorderbycolumnexpressionutil.shouldUseCaseInsensitiveOrder)(subFieldMetadata.type),
            castToText: (0, _buildorderbycolumnexpressionutil.shouldCastToText)(subFieldMetadata.type)
        };
        return acc;
    }, {});
};

//# sourceMappingURL=parse-composite-field-for-order.util.js.map