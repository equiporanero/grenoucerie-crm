"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthWorkspace", {
    enumerable: true,
    get: function() {
        return AuthWorkspace;
    }
});
const _common = require("@nestjs/common");
const _extractrequest = require("../../../utils/extract-request");
const AuthWorkspace = (0, _common.createParamDecorator)((options, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    if (!options?.allowUndefined && !request.workspace) {
        // We're throwing an internal error and not a ForbiddenException
        // because this should never happen, this is an extra security measure
        // but Auth should be handled through the guards not the decorator
        throw new _common.InternalServerErrorException("You're not authorized to do this. This should not ever happen.");
    }
    return request.workspace;
});

//# sourceMappingURL=auth-workspace.decorator.js.map