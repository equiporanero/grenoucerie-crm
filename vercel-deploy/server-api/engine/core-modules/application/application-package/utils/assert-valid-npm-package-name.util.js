"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertValidNpmPackageName", {
    enumerable: true,
    get: function() {
        return assertValidNpmPackageName;
    }
});
const _applicationexception = require("../../application.exception");
// NPM package names: optional @scope/ prefix, then name segment
// Rejects path traversal (..), control characters, and non-npm-valid names
const NPM_PACKAGE_NAME_REGEX = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const assertValidNpmPackageName = (name)=>{
    if (!NPM_PACKAGE_NAME_REGEX.test(name) || name.includes('..')) {
        throw new _applicationexception.ApplicationException('Invalid npm package name', _applicationexception.ApplicationExceptionCode.INVALID_INPUT);
    }
};

//# sourceMappingURL=assert-valid-npm-package-name.util.js.map