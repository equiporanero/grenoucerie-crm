"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCancelledCalDavEvent", {
    enumerable: true,
    get: function() {
        return buildCancelledCalDavEvent;
    }
});
const buildCancelledCalDavEvent = (href)=>({
        id: href,
        title: '',
        iCalUid: '',
        description: '',
        startsAt: '',
        endsAt: '',
        location: '',
        isFullDay: false,
        isCanceled: true,
        conferenceLinkLabel: '',
        conferenceLinkUrl: '',
        externalCreatedAt: '',
        externalUpdatedAt: '',
        conferenceSolution: '',
        participants: [],
        status: 'CANCELLED'
    });

//# sourceMappingURL=build-cancelled-event.util.js.map