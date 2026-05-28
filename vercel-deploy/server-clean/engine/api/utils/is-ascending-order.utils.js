"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isAscendingOrder", {
    enumerable: true,
    get: function() {
        return isAscendingOrder;
    }
});
const _types = require("twenty-shared/types");
const isAscendingOrder = (direction)=>direction === _types.OrderByDirection.AscNullsFirst || direction === _types.OrderByDirection.AscNullsLast;

//# sourceMappingURL=is-ascending-order.utils.js.map