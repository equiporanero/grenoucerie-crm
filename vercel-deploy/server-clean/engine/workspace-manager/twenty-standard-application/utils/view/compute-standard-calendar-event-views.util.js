"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCalendarEventViews", {
    enumerable: true,
    get: function() {
        return computeStandardCalendarEventViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardCalendarEventViews = (args)=>{
    return {
        allCalendarEvents: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'calendarEvent',
            context: {
                viewName: 'allCalendarEvents',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList',
                calendarFieldName: 'startsAt'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-calendar-event-views.util.js.map