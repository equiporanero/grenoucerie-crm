"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ServerLevelImpersonateGuard", {
    enumerable: true,
    get: function() {
        return ServerLevelImpersonateGuard;
    }
});
const _graphql = require("@nestjs/graphql");
let ServerLevelImpersonateGuard = class ServerLevelImpersonateGuard {
    canActivate(context) {
        const ctx = _graphql.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request.user.canImpersonate === true;
    }
};

//# sourceMappingURL=server-level-impersonate.guard.js.map