"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthUser", {
    enumerable: true,
    get: function() {
        return AuthUser;
    }
});
const _common = require("@nestjs/common");
const _extractrequest = require("../../../utils/extract-request");
const AuthUser = (0, _common.createParamDecorator)((options, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    if (!options?.allowUndefined && !request.user) {
        throw new _common.ForbiddenException("You're not authorized to do this. " + "Note: This endpoint requires a user and won't work with just an API key.");
    }
    return request.user;
});

//# sourceMappingURL=auth-user.decorator.js.map