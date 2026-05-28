"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mapPartStatToResponseStatus", {
    enumerable: true,
    get: function() {
        return mapPartStatToResponseStatus;
    }
});
const _calendareventparticipantworkspaceentity = require("../../../../common/standard-objects/calendar-event-participant.workspace-entity");
const mapPartStatToResponseStatus = (partStat)=>{
    switch(partStat){
        case 'ACCEPTED':
            return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.ACCEPTED;
        case 'DECLINED':
            return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.DECLINED;
        case 'TENTATIVE':
            return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.TENTATIVE;
        case 'DELEGATED':
        case 'NEEDS-ACTION':
        default:
            return _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.NEEDS_ACTION;
    }
};

//# sourceMappingURL=map-partstat-to-response-status.util.js.map