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
    get MessageChannelContactAutoCreationPolicy () {
        return _types.MessageChannelContactAutoCreationPolicy;
    },
    get MessageChannelPendingGroupEmailsAction () {
        return _types.MessageChannelPendingGroupEmailsAction;
    },
    get MessageChannelSyncStage () {
        return _types.MessageChannelSyncStage;
    },
    get MessageChannelSyncStatus () {
        return _types.MessageChannelSyncStatus;
    },
    get MessageChannelType () {
        return _types.MessageChannelType;
    },
    get MessageChannelVisibility () {
        return _types.MessageChannelVisibility;
    },
    get MessageChannelWorkspaceEntity () {
        return MessageChannelWorkspaceEntity;
    },
    get MessageFolderImportPolicy () {
        return _types.MessageFolderImportPolicy;
    },
    get SEARCH_FIELDS_FOR_MESSAGE_CHANNEL () {
        return SEARCH_FIELDS_FOR_MESSAGE_CHANNEL;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
(0, _graphql.registerEnumType)(_types.MessageChannelVisibility, {
    name: 'MessageChannelVisibility'
});
(0, _graphql.registerEnumType)(_types.MessageChannelSyncStatus, {
    name: 'MessageChannelSyncStatus'
});
(0, _graphql.registerEnumType)(_types.MessageChannelSyncStage, {
    name: 'MessageChannelSyncStage'
});
(0, _graphql.registerEnumType)(_types.MessageChannelType, {
    name: 'MessageChannelType'
});
(0, _graphql.registerEnumType)(_types.MessageChannelContactAutoCreationPolicy, {
    name: 'MessageChannelContactAutoCreationPolicy'
});
(0, _graphql.registerEnumType)(_types.MessageFolderImportPolicy, {
    name: 'MessageFolderImportPolicy'
});
(0, _graphql.registerEnumType)(_types.MessageChannelPendingGroupEmailsAction, {
    name: 'MessageChannelPendingGroupEmailsAction'
});
const HANDLE_FIELD_NAME = 'handle';
const SEARCH_FIELDS_FOR_MESSAGE_CHANNEL = [
    {
        name: HANDLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let MessageChannelWorkspaceEntity = class MessageChannelWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=message-channel.workspace-entity.js.map