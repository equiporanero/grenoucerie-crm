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
    get MessageChannelMessageAssociationWorkspaceEntity () {
        return MessageChannelMessageAssociationWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION () {
        return SEARCH_FIELDS_FOR_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
const MESSAGE_EXTERNAL_ID_FIELD_NAME = 'messageExternalId';
const SEARCH_FIELDS_FOR_MESSAGE_CHANNEL_MESSAGE_ASSOCIATION = [
    {
        name: MESSAGE_EXTERNAL_ID_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let MessageChannelMessageAssociationWorkspaceEntity = class MessageChannelMessageAssociationWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=message-channel-message-association.workspace-entity.js.map