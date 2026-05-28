"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserAuthGuard", {
    enumerable: true,
    get: function() {
        return UserAuthGuard;
    }
});
const _graphql = require("@nestjs/graphql");
let UserAuthGuard = class UserAuthGuard {
    canActivate(context) {
        const ctx = _graphql.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request.user !== undefined;
    }
};

//# sourceMappingURL=user-auth.guard.js.map