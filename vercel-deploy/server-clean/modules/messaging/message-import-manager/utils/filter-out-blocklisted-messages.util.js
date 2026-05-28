"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterOutBlocklistedMessages", {
    enumerable: true,
    get: function() {
        return filterOutBlocklistedMessages;
    }
});
const _isemailblocklistedutil = require("../../../blocklist/utils/is-email-blocklisted.util");
const filterOutBlocklistedMessages = (messageChannelHandles, messages, blocklist)=>{
    return messages.filter((message)=>{
        if (!message.participants) {
            return true;
        }
        return message.participants.every((participant)=>!(0, _isemailblocklistedutil.isEmailBlocklisted)(messageChannelHandles, participant.handle, blocklist));
    });
};

//# sourceMappingURL=filter-out-blocklisted-messages.util.js.map