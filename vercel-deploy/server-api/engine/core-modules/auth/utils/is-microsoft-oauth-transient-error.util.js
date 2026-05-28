"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isMicrosoftOAuthTransientError", {
    enumerable: true,
    get: function() {
        return isMicrosoftOAuthTransientError;
    }
});
const isMicrosoftOAuthTransientError = (error)=>{
    if (!(error instanceof Error)) {
        return false;
    }
    return error.message.includes('AADSTS650051');
};

//# sourceMappingURL=is-microsoft-oauth-transient-error.util.js.map