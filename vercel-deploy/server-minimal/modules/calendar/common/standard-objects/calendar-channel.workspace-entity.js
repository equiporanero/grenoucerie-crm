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
    get CalendarChannelContactAutoCreationPolicy () {
        return _types.CalendarChannelContactAutoCreationPolicy;
    },
    get CalendarChannelSyncStage () {
        return _types.CalendarChannelSyncStage;
    },
    get CalendarChannelSyncStatus () {
        return _types.CalendarChannelSyncStatus;
    },
    get CalendarChannelVisibility () {
        return _types.CalendarChannelVisibility;
    },
    get CalendarChannelWorkspaceEntity () {
        return CalendarChannelWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_CALENDAR_CHANNEL () {
        return SEARCH_FIELDS_FOR_CALENDAR_CHANNEL;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
(0, _graphql.registerEnumType)(_types.CalendarChannelVisibility, {
    name: 'CalendarChannelVisibility'
});
(0, _graphql.registerEnumType)(_types.CalendarChannelSyncStatus, {
    name: 'CalendarChannelSyncStatus'
});
(0, _graphql.registerEnumType)(_types.CalendarChannelSyncStage, {
    name: 'CalendarChannelSyncStage'
});
(0, _graphql.registerEnumType)(_types.CalendarChannelContactAutoCreationPolicy, {
    name: 'CalendarChannelContactAutoCreationPolicy'
});
const HANDLE_FIELD_NAME = 'handle';
const SEARCH_FIELDS_FOR_CALENDAR_CHANNEL = [
    {
        name: HANDLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let CalendarChannelWorkspaceEntity = class CalendarChannelWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=calendar-channel.workspace-entity.js.map