/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogsGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return EventLogsGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _eventlogsexception = require("../event-logs.exception");
const _eventlogsgraphqlapiexceptionhandlerutil = require("../utils/event-logs-graphql-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EventLogsGraphqlApiExceptionFilter = class EventLogsGraphqlApiExceptionFilter {
    catch(exception) {
        return (0, _eventlogsgraphqlapiexceptionhandlerutil.eventLogsGraphqlApiExceptionHandler)(exception);
    }
};
EventLogsGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_eventlogsexception.EventLogsException)
], EventLogsGraphqlApiExceptionFilter);

//# sourceMappingURL=event-logs-graphql-api-exception.filter.js.map