"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "stripSecretFromApplicationVariables", {
    enumerable: true,
    get: function() {
        return stripSecretFromApplicationVariables;
    }
});
const stripSecretFromApplicationVariables = (flatApplicationVariables)=>{
    return flatApplicationVariables.reduce((acc, flatApplicationVariable)=>{
        if (flatApplicationVariable.isSecret) {
            return acc;
        }
        acc[flatApplicationVariable.key] = String(flatApplicationVariable.value ?? '');
        return acc;
    }, {});
};

//# sourceMappingURL=strip-secret-from-application-variables.js.map