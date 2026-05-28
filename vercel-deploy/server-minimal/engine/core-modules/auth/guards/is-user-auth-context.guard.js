"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isUserAuthContext", {
    enumerable: true,
    get: function() {
        return isUserAuthContext;
    }
});
const isUserAuthContext = (context)=>{
    return context.type === 'user';
};

//# sourceMappingURL=is-user-auth-context.guard.js.map