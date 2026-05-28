"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseArrayEnvVar", {
    enumerable: true,
    get: function() {
        return parseArrayEnvVar;
    }
});
const parseArrayEnvVar = (envVar, expectedValues, defaultValues)=>{
    if (!envVar) return defaultValues;
    const values = envVar.split(',').filter((item)=>expectedValues.includes(item));
    return values.length > 0 ? values : defaultValues;
};

//# sourceMappingURL=parse-array-env-var.js.map