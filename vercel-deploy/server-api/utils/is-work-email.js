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
    get isWorkDomain () {
        return isWorkDomain;
    },
    get isWorkEmail () {
        return isWorkEmail;
    }
});
const _emailproviders = require("./email-providers");
const _getdomainnamebyemail = require("./get-domain-name-by-email");
const isWorkEmail = (email)=>{
    try {
        return !_emailproviders.emailProvidersSet.has((0, _getdomainnamebyemail.getDomainNameByEmail)(email));
    } catch  {
        return false;
    }
};
const isWorkDomain = (domain)=>{
    return !_emailproviders.emailProvidersSet.has(domain);
};

//# sourceMappingURL=is-work-email.js.map