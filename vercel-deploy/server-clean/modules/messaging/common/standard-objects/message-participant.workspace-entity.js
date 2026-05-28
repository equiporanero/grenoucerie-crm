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
    get MessageParticipantWorkspaceEntity () {
        return MessageParticipantWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_MESSAGE_PARTICIPANT () {
        return SEARCH_FIELDS_FOR_MESSAGE_PARTICIPANT;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
const HANDLE_FIELD_NAME = 'handle';
const SEARCH_FIELDS_FOR_MESSAGE_PARTICIPANT = [
    {
        name: HANDLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let MessageParticipantWorkspaceEntity = class MessageParticipantWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=message-participant.workspace-entity.js.map