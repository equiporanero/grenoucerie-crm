"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortByManualOrder", {
    enumerable: true,
    get: function() {
        return sortByManualOrder;
    }
});
const _utils = require("twenty-shared/utils");
const sortByManualOrder = ({ items, manualSortOrder, getRawValue })=>{
    if (manualSortOrder.length === 0) {
        return items;
    }
    const orderMap = new Map(manualSortOrder.map((value, index)=>[
            value,
            index
        ]));
    return [
        ...items
    ].sort((a, b)=>{
        const rawValueA = getRawValue(a) ?? '';
        const rawValueB = getRawValue(b) ?? '';
        const indexA = orderMap.get(rawValueA);
        const indexB = orderMap.get(rawValueB);
        if (!(0, _utils.isDefined)(indexA) && !(0, _utils.isDefined)(indexB)) {
            return 0;
        }
        if (!(0, _utils.isDefined)(indexA)) {
            return 1;
        }
        if (!(0, _utils.isDefined)(indexB)) {
            return -1;
        }
        return indexA - indexB;
    });
};

//# sourceMappingURL=sort-by-manual-order.util.js.map