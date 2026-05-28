"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CastToTypeORMLogLevelArray", {
    enumerable: true,
    get: function() {
        return CastToTypeORMLogLevelArray;
    }
});
const _classtransformer = require("class-transformer");
const _guards = require("@sniptt/guards");
const CastToTypeORMLogLevelArray = ()=>(0, _classtransformer.Transform)(({ value })=>toTypeORMLogLevelArray(value));
// oxlint-disable-next-line @typescripttypescript/no-explicit-any
const toTypeORMLogLevelArray = (value)=>{
    if ((0, _guards.isNonEmptyString)(value)) {
        const rawLogLevels = value.split(',').map((level)=>level.trim());
        const validLevels = [
            'query',
            'schema',
            'error',
            'warn',
            'info',
            'log',
            'migration'
        ];
        const isInvalid = rawLogLevels.some((level)=>!validLevels.includes(level));
        if (!isInvalid) {
            return rawLogLevels;
        }
    }
    return undefined;
};

//# sourceMappingURL=cast-to-typeorm-log-level-array.decorator.js.map