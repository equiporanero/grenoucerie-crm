"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractParticipantSummary", {
    enumerable: true,
    get: function() {
        return extractParticipantSummary;
    }
});
const _filteractiveparticipantsutil = require("./filter-active-participants.util");
const _formatthreadparticipantutil = require("./format-thread-participant.util");
const extractParticipantSummary = (messageParticipants)=>{
    const activeMessageParticipants = (0, _filteractiveparticipantsutil.filterActiveParticipants)(messageParticipants);
    const firstParticipant = (0, _formatthreadparticipantutil.formatThreadParticipant)(activeMessageParticipants[0]);
    const activeMessageParticipantsWithoutFirstParticipant = activeMessageParticipants.filter((threadParticipant)=>threadParticipant.handle !== firstParticipant.handle);
    const lastTwoParticipants = [];
    const lastParticipant = activeMessageParticipantsWithoutFirstParticipant.slice(-1)[0];
    if (lastParticipant) {
        lastTwoParticipants.push((0, _formatthreadparticipantutil.formatThreadParticipant)(lastParticipant));
        const activeMessageParticipantsWithoutFirstAndLastParticipants = activeMessageParticipantsWithoutFirstParticipant.filter((threadParticipant)=>threadParticipant.handle !== lastParticipant.handle);
        if (activeMessageParticipantsWithoutFirstAndLastParticipants.length > 0) {
            lastTwoParticipants.push((0, _formatthreadparticipantutil.formatThreadParticipant)(activeMessageParticipantsWithoutFirstAndLastParticipants.slice(-1)[0]));
        }
    }
    return {
        firstParticipant,
        lastTwoParticipants,
        participantCount: activeMessageParticipants.length
    };
};

//# sourceMappingURL=extract-participant-summary.util.js.map