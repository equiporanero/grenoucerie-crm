"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCancelChannel", {
    enumerable: true,
    get: function() {
        return getCancelChannel;
    }
});
const getCancelChannel = (threadId)=>`ai-stream:cancel:${threadId}`;

//# sourceMappingURL=get-cancel-channel.util.js.map