"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDomainNameFromHandle", {
    enumerable: true,
    get: function() {
        return getDomainNameFromHandle;
    }
});
const _psl = /*#__PURE__*/ _interop_require_default(require("psl"));
const _ispslparseddomaintype = require("../types/is-psl-parsed-domain.type");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getDomainNameFromHandle = (handle)=>{
    const wholeDomain = handle?.split('@')?.[1] || '';
    const result = _psl.default.parse(wholeDomain);
    if (!(0, _ispslparseddomaintype.isParsedDomain)(result)) {
        return '';
    }
    return result.domain ?? '';
};

//# sourceMappingURL=get-domain-name-from-handle.util.js.map