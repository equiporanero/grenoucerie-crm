"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "eventStreamIdToChannelId", {
    enumerable: true,
    get: function() {
        return eventStreamIdToChannelId;
    }
});
const _uuid = require("uuid");
const EVENT_STREAM_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const eventStreamIdToChannelId = (eventStreamId)=>{
    return (0, _uuid.v5)(eventStreamId, EVENT_STREAM_NAMESPACE);
};

//# sourceMappingURL=get-channel-id-from-event-stream-id.js.map