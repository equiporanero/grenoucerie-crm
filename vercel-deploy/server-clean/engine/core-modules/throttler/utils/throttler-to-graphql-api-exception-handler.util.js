"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "throttlerToGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return throttlerToGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _throttlerexception = require("../throttler.exception");
const throttlerToGraphqlApiExceptionHandler = (error)=>{
    switch(error.code){
        case _throttlerexception.ThrottlerExceptionCode.LIMIT_REACHED:
            throw new _graphqlerrorsutil.UserInputError(error);
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=throttler-to-graphql-api-exception-handler.util.js.map