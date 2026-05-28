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
    get MessageThreadWorkspaceEntity () {
        return MessageThreadWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_MESSAGE_THREAD () {
        return SEARCH_FIELDS_FOR_MESSAGE_THREAD;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
const SUBJECT_FIELD_NAME = 'subject';
const SEARCH_FIELDS_FOR_MESSAGE_THREAD = [
    {
        name: SUBJECT_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let MessageThreadWorkspaceEntity = class MessageThreadWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=message-thread.workspace-entity.js.map