"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthProvider", {
    enumerable: true,
    get: function() {
        return AuthProvider;
    }
});
const _common = require("@nestjs/common");
const _extractrequest = require("../../../utils/extract-request");
const AuthProvider = (0, _common.createParamDecorator)((_, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    return request.authProvider;
});

//# sourceMappingURL=auth-provider.decorator.js.map