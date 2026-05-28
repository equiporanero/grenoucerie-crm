"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelGraphqlApiExceptionInterceptor", {
    enumerable: true,
    get: function() {
        return CalendarChannelGraphqlApiExceptionInterceptor;
    }
});
const _common = require("@nestjs/common");
const _rxjs = require("rxjs");
const _calendarchannelgraphqlapiexceptionhandlerutil = require("../utils/calendar-channel-graphql-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarChannelGraphqlApiExceptionInterceptor = class CalendarChannelGraphqlApiExceptionInterceptor {
    intercept(_context, next) {
        return next.handle().pipe((0, _rxjs.catchError)(_calendarchannelgraphqlapiexceptionhandlerutil.calendarChannelGraphqlApiExceptionHandler));
    }
};
CalendarChannelGraphqlApiExceptionInterceptor = _ts_decorate([
    (0, _common.Injectable)()
], CalendarChannelGraphqlApiExceptionInterceptor);

//# sourceMappingURL=calendar-channel-graphql-api-exception.interceptor.js.map