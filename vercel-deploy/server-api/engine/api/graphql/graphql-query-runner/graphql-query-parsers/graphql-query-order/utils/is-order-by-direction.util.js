"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isOrderByDirection", {
    enumerable: true,
    get: function() {
        return isOrderByDirection;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const isOrderByDirection = (value)=>{
    return (0, _guards.isNonEmptyString)(value) && Object.values(_types.OrderByDirection).includes(value);
};

//# sourceMappingURL=is-order-by-direction.util.js.map