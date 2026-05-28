"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardCalendarChannelEventAssociationViews", {
    enumerable: true,
    get: function() {
        return computeStandardCalendarChannelEventAssociationViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardCalendarChannelEventAssociationViews = (args)=>{
    return {
        allCalendarChannelEventAssociations: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'allCalendarChannelEventAssociations',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        }),
        calendarChannelEventAssociationRecordPageFields: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'calendarChannelEventAssociation',
            context: {
                viewName: 'calendarChannelEventAssociationRecordPageFields',
                name: 'Calendar Channel Event Association Record Page Fields',
                type: _types.ViewType.FIELDS_WIDGET,
                key: null,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-calendar-channel-event-association-views.util.js.map