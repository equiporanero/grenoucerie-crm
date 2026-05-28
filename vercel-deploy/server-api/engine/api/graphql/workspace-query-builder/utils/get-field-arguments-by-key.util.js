"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFieldArgumentsByKey", {
    enumerable: true,
    get: function() {
        return getFieldArgumentsByKey;
    }
});
const _graphql = require("graphql");
const isFieldNode = (node)=>node.kind === _graphql.Kind.FIELD;
const isInlineFragmentNode = (node)=>node.kind === _graphql.Kind.INLINE_FRAGMENT;
const findFieldNode = (selectionSet, key)=>{
    if (!selectionSet) return null;
    let field = null;
    for (const selection of selectionSet.selections){
        // We've found the field
        if (isFieldNode(selection) && selection.name.value === key) {
            return selection;
        }
        // Recursively search for the field in nested selections
        if ((isFieldNode(selection) || isInlineFragmentNode(selection)) && selection.selectionSet) {
            field = findFieldNode(selection.selectionSet, key);
            // If we find the field in a nested selection, stop searching
            if (field) break;
        }
    }
    return field;
};
// @ts-expect-error legacy noImplicitAny
const parseValueNode = (valueNode, variables)=>{
    switch(valueNode.kind){
        case _graphql.Kind.VARIABLE:
            return variables[valueNode.name.value];
        case _graphql.Kind.INT:
        case _graphql.Kind.FLOAT:
            return Number(valueNode.value);
        case _graphql.Kind.STRING:
        case _graphql.Kind.BOOLEAN:
        case _graphql.Kind.ENUM:
            return valueNode.value;
        case _graphql.Kind.LIST:
            // @ts-expect-error legacy noImplicitAny
            return valueNode.values.map((value)=>parseValueNode(value, variables));
        case _graphql.Kind.OBJECT:
            return valueNode.fields.reduce((obj, field)=>{
                // @ts-expect-error legacy noImplicitAny
                obj[field.name.value] = parseValueNode(field.value, variables);
                return obj;
            }, {});
        default:
            return null;
    }
};
const getFieldArgumentsByKey = (info, fieldKey)=>{
    // Start from the first top-level field node and search recursively
    const targetField = findFieldNode(info.fieldNodes[0].selectionSet, fieldKey);
    // If the field is not found, throw an error
    if (!targetField) {
        throw new Error(`Field "${fieldKey}" not found.`);
    }
    // Extract the arguments from the field we've found
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    const args = {};
    if (targetField.arguments && targetField.arguments.length) {
        for (const arg of targetField.arguments){
            args[arg.name.value] = parseValueNode(arg.value, info.variableValues);
        }
    }
    return args;
};

//# sourceMappingURL=get-field-arguments-by-key.util.js.map