"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPublicFeatureFlag", {
    enumerable: true,
    get: function() {
        return isPublicFeatureFlag;
    }
});
const _publicfeatureflagconst = require("../../feature-flag/constants/public-feature-flag.const");
const isPublicFeatureFlag = (key)=>{
    if (!key) {
        return false;
    }
    return _publicfeatureflagconst.PUBLIC_FEATURE_FLAGS.some((flag)=>flag.key === key);
};

//# sourceMappingURL=is-public-feature-flag.util.js.map