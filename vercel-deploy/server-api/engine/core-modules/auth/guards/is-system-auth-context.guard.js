"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSystemAuthContext", {
    enumerable: true,
    get: function() {
        return isSystemAuthContext;
    }
});
const isSystemAuthContext = (context)=>{
    return context.type === 'system';
};

//# sourceMappingURL=is-system-auth-context.guard.js.map