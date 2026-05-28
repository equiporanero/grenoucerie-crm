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
    get CalendarEventWorkspaceEntity () {
        return CalendarEventWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_CALENDAR_EVENT () {
        return SEARCH_FIELDS_FOR_CALENDAR_EVENT;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
const TITLE_FIELD_NAME = 'title';
const SEARCH_FIELDS_FOR_CALENDAR_EVENT = [
    {
        name: TITLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let CalendarEventWorkspaceEntity = class CalendarEventWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=calendar-event.workspace-entity.js.map