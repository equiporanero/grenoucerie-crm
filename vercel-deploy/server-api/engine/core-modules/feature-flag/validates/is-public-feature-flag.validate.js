"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "publicFeatureFlagValidator", {
    enumerable: true,
    get: function() {
        return publicFeatureFlagValidator;
    }
});
const _ispublicfeatureflagutil = require("../../lab/utils/is-public-feature-flag.util");
const assertIsPublicFeatureFlag = (key, exceptionToThrow)=>{
    if (!(0, _ispublicfeatureflagutil.isPublicFeatureFlag)(key)) {
        throw exceptionToThrow;
    }
};
const publicFeatureFlagValidator = {
    assertIsPublicFeatureFlag: assertIsPublicFeatureFlag
};

//# sourceMappingURL=is-public-feature-flag.validate.js.map