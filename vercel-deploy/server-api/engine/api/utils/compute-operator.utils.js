"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeOperator", {
    enumerable: true,
    get: function() {
        return computeOperator;
    }
});
const computeOperator = (isAscending, isForwardPagination)=>{
    return isAscending ? isForwardPagination ? 'gt' : 'lt' : isForwardPagination ? 'lt' : 'gt';
};

//# sourceMappingURL=compute-operator.utils.js.map