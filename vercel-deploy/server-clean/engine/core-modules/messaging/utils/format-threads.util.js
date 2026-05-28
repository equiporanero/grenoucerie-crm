"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatThreads", {
    enumerable: true,
    get: function() {
        return formatThreads;
    }
});
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _types = require("twenty-shared/types");
const _extractparticipantsummaryutil = require("./extract-participant-summary.util");
const formatThreads = (threads, threadParticipantsByThreadId, threadVisibilityByThreadId)=>{
    return threads.filter((thread)=>(0, _utils.isDefined)(threadParticipantsByThreadId[thread.id])).map((thread)=>{
        const visibility = threadVisibilityByThreadId[thread.id];
        return {
            ...thread,
            subject: visibility === _types.MessageChannelVisibility.SHARE_EVERYTHING || visibility === _types.MessageChannelVisibility.SUBJECT ? thread.subject : _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
            lastMessageBody: visibility === _types.MessageChannelVisibility.SHARE_EVERYTHING ? thread.lastMessageBody : _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
            ...(0, _extractparticipantsummaryutil.extractParticipantSummary)(threadParticipantsByThreadId[thread.id]),
            visibility,
            read: true
        };
    });
};

//# sourceMappingURL=format-threads.util.js.map