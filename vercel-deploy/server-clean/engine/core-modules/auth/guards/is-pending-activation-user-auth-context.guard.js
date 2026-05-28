"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPendingActivationUserAuthContext", {
    enumerable: true,
    get: function() {
        return isPendingActivationUserAuthContext;
    }
});
const isPendingActivationUserAuthContext = (context)=>{
    return context.type === 'pendingActivationUser';
};

//# sourceMappingURL=is-pending-activation-user-auth-context.guard.js.map