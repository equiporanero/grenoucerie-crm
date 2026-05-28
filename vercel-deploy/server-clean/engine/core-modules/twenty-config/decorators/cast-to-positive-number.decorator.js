"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CastToPositiveNumber", {
    enumerable: true,
    get: function() {
        return CastToPositiveNumber;
    }
});
const _classtransformer = require("class-transformer");
const CastToPositiveNumber = ()=>(0, _classtransformer.Transform)(({ value })=>toNumber(value));
const toNumber = (value)=>{
    if (typeof value === 'number') {
        return value >= 0 ? value : undefined;
    }
    if (typeof value === 'string') {
        return isNaN(+value) ? undefined : toNumber(+value);
    }
    return undefined;
};

//# sourceMappingURL=cast-to-positive-number.decorator.js.map