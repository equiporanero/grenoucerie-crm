"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NoImpersonationGuard", {
    enumerable: true,
    get: function() {
        return NoImpersonationGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let NoImpersonationGuard = class NoImpersonationGuard {
    canActivate(context) {
        const ctx = _graphql.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const isCurrentlyImpersonating = Boolean(request?.impersonationContext?.impersonatorUserWorkspaceId && request?.impersonationContext?.impersonatedUserWorkspaceId);
        if (isCurrentlyImpersonating) {
            throw new _common.ForbiddenException("Can't access this resource while impersonating");
        }
        return true;
    }
};
NoImpersonationGuard = _ts_decorate([
    (0, _common.Injectable)()
], NoImpersonationGuard);

//# sourceMappingURL=no-impersonation.guard.js.map