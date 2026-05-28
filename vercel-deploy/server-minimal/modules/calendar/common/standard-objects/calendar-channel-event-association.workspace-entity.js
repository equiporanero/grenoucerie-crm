"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CalendarChannelEventAssociationWorkspaceEntity () {
        return CalendarChannelEventAssociationWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_CALENDAR_CHANNEL_EVENT_ASSOCIATION () {
        return SEARCH_FIELDS_FOR_CALENDAR_CHANNEL_EVENT_ASSOCIATION;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
const EVENT_EXTERNAL_ID_FIELD_NAME = 'eventExternalId';
const SEARCH_FIELDS_FOR_CALENDAR_CHANNEL_EVENT_ASSOCIATION = [
    {
        name: EVENT_EXTERNAL_ID_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let CalendarChannelEventAssociationWorkspaceEntity = class CalendarChannelEventAssociationWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=calendar-channel-event-association.workspace-entity.js.map