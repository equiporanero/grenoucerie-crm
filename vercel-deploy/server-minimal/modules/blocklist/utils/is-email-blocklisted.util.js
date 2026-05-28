"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isEmailBlocklisted", {
    enumerable: true,
    get: function() {
        return isEmailBlocklisted;
    }
});
const isEmailBlocklisted = (channelHandle, email, blocklist)=>{
    if (!email || channelHandle.includes(email)) {
        return false;
    }
    return blocklist.some((item)=>{
        if (item.startsWith('@')) {
            const domain = email.split('@')[1];
            return domain === item.slice(1) || domain.endsWith(`.${item.slice(1)}`);
        }
        return email === item;
    });
};

//# sourceMappingURL=is-email-blocklisted.util.js.map