"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthWorkspaceMemberId", {
    enumerable: true,
    get: function() {
        return AuthWorkspaceMemberId;
    }
});
const _common = require("@nestjs/common");
const _extractrequest = require("../../../utils/extract-request");
const AuthWorkspaceMemberId = (0, _common.createParamDecorator)((_data, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    return request.workspaceMemberId;
});

//# sourceMappingURL=auth-workspace-member-id.decorator.js.map