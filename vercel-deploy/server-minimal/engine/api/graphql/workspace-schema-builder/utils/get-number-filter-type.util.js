"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNumberFilterType", {
    enumerable: true,
    get: function() {
        return getNumberFilterType;
    }
});
const _types = require("twenty-shared/types");
const _input = require("../graphql-types/input");
const getNumberFilterType = (subType)=>{
    switch(subType){
        case _types.NumberDataType.FLOAT:
            return _input.FloatFilterType;
        case _types.NumberDataType.BIGINT:
            return _input.BigIntFilterType;
        case _types.NumberDataType.INT:
            return _input.IntFilterType;
        default:
            return _input.FloatFilterType;
    }
};

//# sourceMappingURL=get-number-filter-type.util.js.map