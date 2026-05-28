"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelGuard", {
    enumerable: true,
    get: function() {
        return AdminPanelGuard;
    }
});
const _graphql = require("@nestjs/graphql");
let AdminPanelGuard = class AdminPanelGuard {
    canActivate(context) {
        const ctx = _graphql.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        return request.user.canAccessFullAdminPanel === true;
    }
};

//# sourceMappingURL=admin-panel-guard.js.map