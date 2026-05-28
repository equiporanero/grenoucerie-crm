"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "featureFlagValidator", {
    enumerable: true,
    get: function() {
        return featureFlagValidator;
    }
});
const _utils = require("twenty-shared/utils");
const _types = require("twenty-shared/types");
const assertIsFeatureFlagKey = (featureFlagKey, exceptionToThrow)=>{
    // @ts-expect-error legacy noImplicitAny
    if ((0, _utils.isDefined)(_types.FeatureFlagKey[featureFlagKey])) return;
    throw exceptionToThrow;
};
const featureFlagValidator = {
    assertIsFeatureFlagKey: assertIsFeatureFlagKey
};

//# sourceMappingURL=feature-flag.validate.js.map