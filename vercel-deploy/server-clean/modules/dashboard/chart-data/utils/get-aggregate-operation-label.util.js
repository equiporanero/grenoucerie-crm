"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAggregateOperationLabel", {
    enumerable: true,
    get: function() {
        return getAggregateOperationLabel;
    }
});
const _types = require("twenty-shared/types");
const getAggregateOperationLabel = (operation)=>{
    switch(operation){
        case _types.AggregateOperations.MIN:
            return 'Min';
        case _types.AggregateOperations.MAX:
            return 'Max';
        case _types.AggregateOperations.AVG:
            return 'Average';
        case _types.AggregateOperations.SUM:
            return 'Sum';
        case _types.AggregateOperations.COUNT:
            return 'Count all';
        case _types.AggregateOperations.COUNT_EMPTY:
            return 'Count empty';
        case _types.AggregateOperations.COUNT_NOT_EMPTY:
            return 'Count not empty';
        case _types.AggregateOperations.COUNT_UNIQUE_VALUES:
            return 'Count unique values';
        case _types.AggregateOperations.PERCENTAGE_EMPTY:
            return 'Percent empty';
        case _types.AggregateOperations.PERCENTAGE_NOT_EMPTY:
            return 'Percent not empty';
        case _types.AggregateOperations.COUNT_TRUE:
            return 'Count true';
        case _types.AggregateOperations.COUNT_FALSE:
            return 'Count false';
        default:
            return 'Count';
    }
};

//# sourceMappingURL=get-aggregate-operation-label.util.js.map