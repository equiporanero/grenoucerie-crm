"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isApplicationAuthContext", {
    enumerable: true,
    get: function() {
        return isApplicationAuthContext;
    }
});
const isApplicationAuthContext = (context)=>{
    return context.type === 'application';
};

//# sourceMappingURL=is-application-auth-context.guard.js.map