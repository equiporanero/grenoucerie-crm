"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterActiveParticipants", {
    enumerable: true,
    get: function() {
        return filterActiveParticipants;
    }
});
const _types = require("twenty-shared/types");
const filterActiveParticipants = (participants)=>{
    return participants.filter((participant)=>participant.role === _types.MessageParticipantRole.FROM);
};

//# sourceMappingURL=filter-active-participants.util.js.map