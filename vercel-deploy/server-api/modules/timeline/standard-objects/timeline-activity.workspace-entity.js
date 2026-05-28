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
    get SEARCH_FIELDS_FOR_TIMELINE_ACTIVITY () {
        return SEARCH_FIELDS_FOR_TIMELINE_ACTIVITY;
    },
    get TimelineActivityWorkspaceEntity () {
        return TimelineActivityWorkspaceEntity;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../engine/twenty-orm/base.workspace-entity");
const NAME_FIELD_NAME = 'name';
const SEARCH_FIELDS_FOR_TIMELINE_ACTIVITY = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let TimelineActivityWorkspaceEntity = class TimelineActivityWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=timeline-activity.workspace-entity.js.map