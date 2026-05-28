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
    get MessageFolderPendingSyncAction () {
        return _types.MessageFolderPendingSyncAction;
    },
    get MessageFolderWorkspaceEntity () {
        return MessageFolderWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_MESSAGE_FOLDER () {
        return SEARCH_FIELDS_FOR_MESSAGE_FOLDER;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../../engine/twenty-orm/base.workspace-entity");
(0, _graphql.registerEnumType)(_types.MessageFolderPendingSyncAction, {
    name: 'MessageFolderPendingSyncAction'
});
const NAME_FIELD_NAME = 'name';
const SEARCH_FIELDS_FOR_MESSAGE_FOLDER = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let MessageFolderWorkspaceEntity = class MessageFolderWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=message-folder.workspace-entity.js.map