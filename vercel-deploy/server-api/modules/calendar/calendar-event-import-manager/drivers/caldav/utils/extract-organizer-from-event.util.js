"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractOrganizerFromEvent", {
    enumerable: true,
    get: function() {
        return extractOrganizerFromEvent;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _calendareventparticipantworkspaceentity = require("../../../../common/standard-objects/calendar-event-participant.workspace-entity");
const extractOrganizerFromEvent = (event)=>{
    const organizer = event.organizer;
    if (!(0, _utils.isDefined)(organizer)) return null;
    const rawValue = (0, _guards.isString)(organizer) ? organizer : organizer.val;
    const commonName = (0, _guards.isString)(organizer) ? undefined : organizer.params?.CN;
    const handle = rawValue.replace(/^mailto:/i, '');
    return {
        displayName: commonName || handle || 'Unknown',
        responseStatus: _calendareventparticipantworkspaceentity.CalendarEventParticipantResponseStatus.ACCEPTED,
        handle,
        isOrganizer: true
    };
};

//# sourceMappingURL=extract-organizer-from-event.util.js.map