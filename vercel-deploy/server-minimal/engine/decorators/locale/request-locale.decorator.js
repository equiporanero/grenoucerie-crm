"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RequestLocale", {
    enumerable: true,
    get: function() {
        return RequestLocale;
    }
});
const _common = require("@nestjs/common");
const _extractrequest = require("../../../utils/extract-request");
const RequestLocale = (0, _common.createParamDecorator)((_data, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    return request.locale;
});

//# sourceMappingURL=request-locale.decorator.js.map