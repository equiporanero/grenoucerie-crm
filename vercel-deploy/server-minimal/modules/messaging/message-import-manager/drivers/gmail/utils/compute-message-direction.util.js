"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeMessageDirection", {
    enumerable: true,
    get: function() {
        return computeMessageDirection;
    }
});
const _messagedirectionenum = require("../../../../common/enums/message-direction.enum");
const computeMessageDirection = (fromHandle, connectedAccount)=>connectedAccount.handle === fromHandle || connectedAccount.handleAliases?.includes(fromHandle) ? _messagedirectionenum.MessageDirection.OUTGOING : _messagedirectionenum.MessageDirection.INCOMING;

//# sourceMappingURL=compute-message-direction.util.js.map