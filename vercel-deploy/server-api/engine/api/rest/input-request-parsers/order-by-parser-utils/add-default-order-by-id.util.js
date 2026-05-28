"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addDefaultOrderById", {
    enumerable: true,
    get: function() {
        return addDefaultOrderById;
    }
});
const _types = require("twenty-shared/types");
const addDefaultOrderById = (orderBy)=>{
    const hasIdOrder = orderBy.some((o)=>Object.keys(o).includes('id'));
    return hasIdOrder ? orderBy : [
        ...orderBy,
        {
            id: _types.OrderByDirection.AscNullsFirst
        }
    ];
};

//# sourceMappingURL=add-default-order-by-id.util.js.map