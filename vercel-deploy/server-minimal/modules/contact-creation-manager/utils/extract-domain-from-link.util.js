"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractDomainFromLink", {
    enumerable: true,
    get: function() {
        return extractDomainFromLink;
    }
});
const extractDomainFromLink = (link)=>{
    const domain = link.replace(/^(https?:\/\/)?(www\.)?/i, '').split('/')[0];
    return domain;
};

//# sourceMappingURL=extract-domain-from-link.util.js.map