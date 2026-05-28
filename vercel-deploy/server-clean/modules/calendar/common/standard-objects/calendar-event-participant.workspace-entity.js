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
    get CalendarEventParticipantResponseStatus () {
        return CalendarEventParticipantResponseStatus;
    },
    get CalendarEventParticipantWorkspaceEntity () {
        return CalendarEventParticipantWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_CALENDAR_EVENT_PARTICIPANT () {
        return SEARCH_FIELDS_FOR_CALENDAR_EVENT_PARTICIPANT;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
const HANDLE_FIELD_NAME = 'handle';
const SEARCH_FIELDS_FOR_CALENDAR_EVENT_PARTICIPANT = [
    {
        name: HANDLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
var CalendarEventParticipantResponseStatus = /*#__PURE__*/ function(CalendarEventParticipantResponseStatus) {
    CalendarEventParticipantResponseStatus["NEEDS_ACTION"] = "NEEDS_ACTION";
    CalendarEventParticipantResponseStatus["DECLINED"] = "DECLINED";
    CalendarEventParticipantResponseStatus["TENTATIVE"] = "TENTATIVE";
    CalendarEventParticipantResponseStatus["ACCEPTED"] = "ACCEPTED";
    return CalendarEventParticipantResponseStatus;
}({});
let CalendarEventParticipantWorkspaceEntity = class CalendarEventParticipantWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=calendar-event-participant.workspace-entity.js.map