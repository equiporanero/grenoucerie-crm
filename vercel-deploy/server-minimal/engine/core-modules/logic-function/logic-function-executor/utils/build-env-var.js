"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildEnvVar", {
    enumerable: true,
    get: function() {
        return buildEnvVar;
    }
});
const _guards = require("@sniptt/guards");
const buildEnvVar = (flatApplicationVariables, secretEncryptionService)=>{
    return flatApplicationVariables.reduce((acc, flatApplicationVariable)=>{
        const value = String(flatApplicationVariable.value ?? '');
        acc[flatApplicationVariable.key] = flatApplicationVariable.isSecret && (0, _guards.isNonEmptyString)(value) ? secretEncryptionService.decryptVersioned(value, {
            workspaceId: flatApplicationVariable.workspaceId
        }) : value;
        return acc;
    }, {});
};

//# sourceMappingURL=build-env-var.js.map