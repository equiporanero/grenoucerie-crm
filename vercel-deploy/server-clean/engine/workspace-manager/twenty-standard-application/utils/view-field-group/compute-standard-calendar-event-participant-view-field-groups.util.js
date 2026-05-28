"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCalendarEventParticipantViewFieldGroups", {
    enumerable: true,
    get: function() {
        return computeStandardCalendarEventParticipantViewFieldGroups;
    }
});
const _createstandardviewfieldgroupflatmetadatautil = require("./create-standard-view-field-group-flat-metadata.util");
const computeStandardCalendarEventParticipantViewFieldGroups = (args)=>{
    return {
        calendarEventParticipantRecordPageFieldsGeneral: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldGroupName: 'general',
                name: 'General',
                position: 0,
                isVisible: true
            }
        }),
        calendarEventParticipantRecordPageFieldsSystem: (0, _createstandardviewfieldgroupflatmetadatautil.createStandardViewFieldGroupFlatMetadata)({
            ...args,
            objectName: 'calendarEventParticipant',
            context: {
                viewName: 'calendarEventParticipantRecordPageFields',
                viewFieldGroupName: 'system',
                name: 'System',
                position: 1,
                isVisible: true
            }
        })
    };
};

//# sourceMappingURL=compute-standard-calendar-event-participant-view-field-groups.util.js.map