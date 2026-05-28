"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventStreamExceptionFilter", {
    enumerable: true,
    get: function() {
        return EventStreamExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../core-modules/graphql/utils/graphql-errors.util");
const _eventstreamexception = require("./event-stream.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EventStreamExceptionFilter = class EventStreamExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _eventstreamexception.EventStreamExceptionCode.EVENT_STREAM_ALREADY_EXISTS:
            case _eventstreamexception.EventStreamExceptionCode.NOT_AUTHORIZED:
                throw new _graphqlerrorsutil.InternalServerError(exception.message, {
                    subCode: exception.code,
                    userFriendlyMessage: exception.userFriendlyMessage
                });
            default:
                {
                    throw (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
EventStreamExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_eventstreamexception.EventStreamException)
], EventStreamExceptionFilter);

//# sourceMappingURL=event-stream-exception.filter.js.map