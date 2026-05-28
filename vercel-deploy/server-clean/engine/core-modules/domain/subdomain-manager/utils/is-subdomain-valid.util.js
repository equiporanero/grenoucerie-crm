"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSubdomainValid", {
    enumerable: true,
    get: function() {
        return isSubdomainValid;
    }
});
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const isSubdomainValid = (subdomain)=>{
    return (0, _utils.isValidTwentySubdomain)(subdomain) && !_constants.RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase());
};

//# sourceMappingURL=is-subdomain-valid.util.js.map