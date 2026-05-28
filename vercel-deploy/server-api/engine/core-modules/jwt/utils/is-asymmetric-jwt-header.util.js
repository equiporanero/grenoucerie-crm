"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isAsymmetricJwtHeader", {
    enumerable: true,
    get: function() {
        return isAsymmetricJwtHeader;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _jwtalgorithmconstant = require("../constants/jwt-algorithm.constant");
const isAsymmetricJwtHeader = (header)=>(0, _utils.isDefined)(header) && (0, _guards.isNonEmptyString)(header.kid) && header.alg === _jwtalgorithmconstant.JWT_ASYMMETRIC_ALGORITHM;

//# sourceMappingURL=is-asymmetric-jwt-header.util.js.map