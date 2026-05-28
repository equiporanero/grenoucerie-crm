/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "eventLogsGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return eventLogsGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _eventlogsexception = require("../event-logs.exception");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const eventLogsGraphqlApiExceptionHandler = (exception)=>{
    switch(exception.code){
        case _eventlogsexception.EventLogsExceptionCode.CLICKHOUSE_NOT_CONFIGURED:
        case _eventlogsexception.EventLogsExceptionCode.NO_ENTITLEMENT:
            throw new _graphqlerrorsutil.ForbiddenError(exception);
        default:
            {
                (0, _utils.assertUnreachable)(exception.code);
            }
    }
};

//# sourceMappingURL=event-logs-graphql-api-exception-handler.util.js.map