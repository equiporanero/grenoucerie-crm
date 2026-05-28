"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OnCustomBatchEvent", {
    enumerable: true,
    get: function() {
        return OnCustomBatchEvent;
    }
});
const _eventemitter = require("@nestjs/event-emitter");
function OnCustomBatchEvent(event) {
    return (target, propertyKey, descriptor)=>{
        (0, _eventemitter.OnEvent)(event)(target, propertyKey, descriptor);
    };
}

//# sourceMappingURL=on-custom-batch-event.decorator.js.map