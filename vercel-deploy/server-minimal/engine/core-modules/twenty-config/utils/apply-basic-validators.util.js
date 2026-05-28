"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyBasicValidators", {
    enumerable: true,
    get: function() {
        return applyBasicValidators;
    }
});
const _twentyconfigexception = require("../twenty-config.exception");
const _typetransformersregistry = require("./type-transformers.registry");
function applyBasicValidators(type, target, propertyKey, options) {
    const transformer = _typetransformersregistry.typeTransformers[type];
    if (!transformer) {
        throw new _twentyconfigexception.ConfigVariableException(`Unsupported config variable type: ${type}`, _twentyconfigexception.ConfigVariableExceptionCode.UNSUPPORTED_CONFIG_TYPE);
    }
    transformer.getTransformers().forEach((decorator)=>decorator(target, propertyKey));
    transformer.getValidators(options).forEach((decorator)=>decorator(target, propertyKey));
}

//# sourceMappingURL=apply-basic-validators.util.js.map