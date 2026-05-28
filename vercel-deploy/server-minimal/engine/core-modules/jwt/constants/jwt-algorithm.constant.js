"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get JWT_ASYMMETRIC_ALGORITHM () {
        return JWT_ASYMMETRIC_ALGORITHM;
    },
    get JWT_LEGACY_ALGORITHM () {
        return JWT_LEGACY_ALGORITHM;
    },
    get JWT_SUPPORTED_VERIFY_ALGORITHMS () {
        return JWT_SUPPORTED_VERIFY_ALGORITHMS;
    }
});
const JWT_LEGACY_ALGORITHM = 'HS256';
const JWT_ASYMMETRIC_ALGORITHM = 'ES256';
const JWT_SUPPORTED_VERIFY_ALGORITHMS = [
    JWT_LEGACY_ALGORITHM,
    JWT_ASYMMETRIC_ALGORITHM
];

//# sourceMappingURL=jwt-algorithm.constant.js.map