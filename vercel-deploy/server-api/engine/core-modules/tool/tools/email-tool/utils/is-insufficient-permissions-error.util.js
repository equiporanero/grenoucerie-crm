// Detects permission/scope errors from email provider APIs (Google, Microsoft).
// These typically occur when the OAuth consent didn't include the required
// scope for the operation (e.g., gmail.compose for drafts).
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isInsufficientPermissionsError", {
    enumerable: true,
    get: function() {
        return isInsufficientPermissionsError;
    }
});
const isInsufficientPermissionsError = (error)=>{
    if (!(error instanceof Error)) {
        return false;
    }
    const message = error.message.toLowerCase();
    if (message.includes('insufficient permission') || message.includes('insufficient authentication scopes') || message.includes('access denied') || message.includes('forbidden')) {
        return true;
    }
    const response = error.response;
    return response?.status === 401 || response?.status === 403;
};

//# sourceMappingURL=is-insufficient-permissions-error.util.js.map