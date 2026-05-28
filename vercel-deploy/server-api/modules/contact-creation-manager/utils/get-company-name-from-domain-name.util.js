"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCompanyNameFromDomainName", {
    enumerable: true,
    get: function() {
        return getCompanyNameFromDomainName;
    }
});
const _psl = /*#__PURE__*/ _interop_require_default(require("psl"));
const _utils = require("twenty-shared/utils");
const _ispslparseddomaintype = require("../types/is-psl-parsed-domain.type");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getCompanyNameFromDomainName = (domainName)=>{
    const result = _psl.default.parse(domainName);
    if (!(0, _ispslparseddomaintype.isParsedDomain)(result)) {
        return '';
    }
    return result.sld ? (0, _utils.capitalize)(result.sld) : '';
};

//# sourceMappingURL=get-company-name-from-domain-name.util.js.map