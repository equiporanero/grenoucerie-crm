"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthApiKey", {
    enumerable: true,
    get: function() {
        return AuthApiKey;
    }
});
const _common = require("@nestjs/common");
const _extractrequest = require("../../../utils/extract-request");
const AuthApiKey = (0, _common.createParamDecorator)((_data, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    return request.apiKey;
});

//# sourceMappingURL=auth-api-key.decorator.js.map