"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubdomainFromEmail", {
    enumerable: true,
    get: function() {
        return getSubdomainFromEmail;
    }
});
const _utils = require("twenty-shared/utils");
const _getdomainnamebyemail = require("../../../../../utils/get-domain-name-by-email");
const _isworkemail = require("../../../../../utils/is-work-email");
const getSubdomainFromEmail = (email)=>{
    if (!(0, _utils.isDefined)(email) || !(0, _isworkemail.isWorkEmail)(email)) return;
    const domain = (0, _getdomainnamebyemail.getDomainNameByEmail)(email);
    return domain.split('.')[0].toLowerCase();
};

//# sourceMappingURL=get-subdomain-from-email.util.js.map