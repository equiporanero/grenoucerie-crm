"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCalendarEventParticipantViews", {
    enumerable: true,
    get: function() {
        return computeStandardCalendarEventParticipantViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardCalendarEventParticipantViews = (args)=>{
    return {
        allCalendarEventParticipants: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'allCalendarEventParticipants',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        calendarEventParticipantRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                name: 'Calendar Event Participant Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-calendar-event-participant-views.util.js.map