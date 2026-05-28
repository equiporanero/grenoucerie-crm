"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatThreadParticipant", {
    enumerable: true,
    get: function() {
        return formatThreadParticipant;
    }
});
const _utils = require("twenty-shared/utils");
const formatThreadParticipant = (threadParticipant)=>{
    if (!(0, _utils.isDefined)(threadParticipant.handle)) {
        throw new Error(`Thread participant ${threadParticipant.id} has an empty handle`);
    }
    return {
        personId: threadParticipant.personId,
        workspaceMemberId: threadParticipant.workspaceMemberId,
        firstName: threadParticipant.person?.name?.firstName || threadParticipant.workspaceMember?.name.firstName || '',
        lastName: threadParticipant.person?.name?.lastName || threadParticipant.workspaceMember?.name.lastName || '',
        displayName: threadParticipant.person?.name?.firstName || threadParticipant.person?.name?.lastName || threadParticipant.workspaceMember?.name.firstName || threadParticipant.workspaceMember?.name.lastName || threadParticipant.displayName || threadParticipant.handle || '',
        avatarUrl: threadParticipant.person?.avatarUrl || threadParticipant.workspaceMember?.avatarUrl || '',
        handle: threadParticipant.handle
    };
};

//# sourceMappingURL=format-thread-participant.util.js.map