"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isDomain", {
    enumerable: true,
    get: function() {
        return isDomain;
    }
});
const isDomain = (url)=>!!url && /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/.test(url);

//# sourceMappingURL=is-domain.js.map