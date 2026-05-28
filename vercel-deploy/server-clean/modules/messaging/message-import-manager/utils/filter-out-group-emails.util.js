"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterOutGroupEmails", {
    enumerable: true,
    get: function() {
        return filterOutGroupEmails;
    }
});
const _types = require("twenty-shared/types");
const _isgroupemail = require("./is-group-email");
const filterOutGroupEmails = (messages)=>{
    return messages.filter((message)=>{
        if (!message.participants) {
            return true;
        }
        const fromParticipant = message.participants.find((participant)=>participant.role === _types.MessageParticipantRole.FROM);
        if (!fromParticipant || !fromParticipant.handle) {
            return true;
        }
        return !(0, _isgroupemail.isGroupEmail)(fromParticipant.handle);
    });
};

//# sourceMappingURL=filter-out-group-emails.util.js.map