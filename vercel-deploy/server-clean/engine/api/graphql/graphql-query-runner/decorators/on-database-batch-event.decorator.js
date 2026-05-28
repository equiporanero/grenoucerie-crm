"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OnDatabaseBatchEvent", {
    enumerable: true,
    get: function() {
        return OnDatabaseBatchEvent;
    }
});
const _eventemitter = require("@nestjs/event-emitter");
function OnDatabaseBatchEvent(object, action) {
    const event = `${object}.${action}`;
    return (target, propertyKey, descriptor)=>{
        (0, _eventemitter.OnEvent)(event)(target, propertyKey, descriptor);
    };
}

//# sourceMappingURL=on-database-batch-event.decorator.js.map