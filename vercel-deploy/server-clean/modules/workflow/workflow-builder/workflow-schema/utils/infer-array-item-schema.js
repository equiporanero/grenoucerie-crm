"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "inferArrayItemSchema", {
    enumerable: true,
    get: function() {
        return inferArrayItemSchema;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _logicfunction = require("twenty-shared/logic-function");
const _defaultiteratorcurrentitemconst = require("../constants/default-iterator-current-item.const");
const inferArrayItemSchema = ({ schemaNode })=>{
    if (!schemaNode.isLeaf || schemaNode.type !== 'array') {
        return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
    }
    const arrayValue = schemaNode.value;
    if (!Array.isArray(arrayValue) || arrayValue.length === 0) {
        return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
    }
    const firstItem = arrayValue[0];
    if (!(0, _utils.isDefined)(firstItem)) {
        return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
    }
    if ((0, _guards.isObject)(firstItem)) {
        const itemSchema = (0, _logicfunction.getOutputSchemaFromValue)(firstItem);
        return {
            isLeaf: false,
            type: 'object',
            label: 'Current Item',
            value: itemSchema
        };
    }
    const getValueType = (value)=>{
        if ((0, _guards.isString)(value)) return 'string';
        if ((0, _guards.isNumber)(value)) return 'number';
        if ((0, _guards.isBoolean)(value)) return 'boolean';
        if ((0, _guards.isArray)(value)) return 'array';
        return 'unknown';
    };
    return {
        isLeaf: true,
        type: getValueType(firstItem),
        label: 'Current Item',
        value: firstItem
    };
};

//# sourceMappingURL=infer-array-item-schema.js.map