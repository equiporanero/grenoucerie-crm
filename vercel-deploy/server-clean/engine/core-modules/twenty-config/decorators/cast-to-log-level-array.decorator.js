"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CastToLogLevelArray", {
    enumerable: true,
    get: function() {
        return CastToLogLevelArray;
    }
});
const _classtransformer = require("class-transformer");
const VALID_LOG_LEVELS = [
    'log',
    'error',
    'warn',
    'debug',
    'verbose'
];
const CastToLogLevelArray = ()=>(0, _classtransformer.Transform)(({ value })=>toLogLevelArray(value));
// oxlint-disable-next-line @typescripttypescript/no-explicit-any
const toLogLevelArray = (value)=>{
    if (typeof value === 'string') {
        const rawLogLevels = value.split(',').map((level)=>level.trim());
        const invalidLevels = rawLogLevels.filter((level)=>!VALID_LOG_LEVELS.includes(level));
        if (invalidLevels.length > 0) {
            throw new Error(`Invalid log level(s): ${invalidLevels.join(', ')}. Valid levels are: ${VALID_LOG_LEVELS.join(', ')}`);
        }
        return rawLogLevels;
    }
    return undefined;
};

//# sourceMappingURL=cast-to-log-level-array.decorator.js.map