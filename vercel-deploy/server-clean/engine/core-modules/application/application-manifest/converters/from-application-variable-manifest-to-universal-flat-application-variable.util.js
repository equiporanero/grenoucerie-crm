"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromApplicationVariableManifestToUniversalFlatApplicationVariable", {
    enumerable: true,
    get: function() {
        return fromApplicationVariableManifestToUniversalFlatApplicationVariable;
    }
});
const fromApplicationVariableManifestToUniversalFlatApplicationVariable = ({ key, universalIdentifier, description, value, isSecret, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier,
        applicationUniversalIdentifier,
        key,
        value: isSecret ? '' : value ?? '',
        description: description ?? '',
        isSecret: isSecret ?? false,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-application-variable-manifest-to-universal-flat-application-variable.util.js.map