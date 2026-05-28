"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isEnvOnlyConfigVar", {
    enumerable: true,
    get: function() {
        return isEnvOnlyConfigVar;
    }
});
const _configvariables = require("../config-variables");
const _typedreflect = require("../../../../utils/typed-reflect");
const isEnvOnlyConfigVar = (key)=>{
    const metadata = _typedreflect.TypedReflect.getMetadata('config-variables', _configvariables.ConfigVariables) ?? {};
    const envMetadata = metadata[key];
    return !!envMetadata?.isEnvOnly;
};

//# sourceMappingURL=is-env-only-config-var.util.js.map