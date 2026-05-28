"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFakeArrayItem", {
    enumerable: true,
    get: function() {
        return generateFakeArrayItem;
    }
});
const _guards = require("@sniptt/guards");
const _classvalidator = require("class-validator");
const _generatefakevalue = require("../../../../../engine/utils/generate-fake-value");
const _defaultiteratorcurrentitemconst = require("../constants/default-iterator-current-item.const");
const generateFakeArrayItem = ({ items })=>{
    let parsedItems;
    try {
        parsedItems = (0, _classvalidator.isString)(items) ? JSON.parse(items) : items;
    } catch  {
        return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
    }
    if ((0, _guards.isArray)(parsedItems) && parsedItems.length > 0) {
        const type = typeof parsedItems[0];
        return {
            label: 'Current Item',
            isLeaf: true,
            type: type,
            value: (0, _generatefakevalue.generateFakeValue)(type)
        };
    }
    return _defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM;
};

//# sourceMappingURL=generate-fake-array-item.js.map