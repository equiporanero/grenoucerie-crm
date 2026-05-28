"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "throttlerToRestApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return throttlerToRestApiExceptionHandler;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _throttlerexception = require("../throttler.exception");
const throttlerToRestApiExceptionHandler = (error)=>{
    switch(error.code){
        case _throttlerexception.ThrottlerExceptionCode.LIMIT_REACHED:
            throw new _common.HttpException(error.message, _common.HttpStatus.TOO_MANY_REQUESTS);
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=throttler-to-rest-api-exception-handler.util.js.map