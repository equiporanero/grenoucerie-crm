"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthUserWorkspaceId", {
    enumerable: true,
    get: function() {
        return AuthUserWorkspaceId;
    }
});
const _common = require("@nestjs/common");
const _extractrequest = require("../../../utils/extract-request");
const AuthUserWorkspaceId = (0, _common.createParamDecorator)((options, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    if (!options?.allowUndefined && !request.userWorkspaceId) {
        throw new _common.ForbiddenException('This endpoint requires a user context. API keys are not supported.');
    }
    return request.userWorkspaceId;
});

//# sourceMappingURL=auth-user-workspace-id.decorator.js.map