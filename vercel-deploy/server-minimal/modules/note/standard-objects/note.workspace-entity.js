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
    get NoteWorkspaceEntity () {
        return NoteWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_NOTES () {
        return SEARCH_FIELDS_FOR_NOTES;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../engine/twenty-orm/base.workspace-entity");
const TITLE_FIELD_NAME = 'title';
const BODY_V2_FIELD_NAME = 'bodyV2';
const SEARCH_FIELDS_FOR_NOTES = [
    {
        name: TITLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    },
    {
        name: BODY_V2_FIELD_NAME,
        type: _types.FieldMetadataType.RICH_TEXT
    }
];
let NoteWorkspaceEntity = class NoteWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=note.workspace-entity.js.map