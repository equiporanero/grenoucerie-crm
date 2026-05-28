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
    get BlocklistWorkspaceEntity () {
        return BlocklistWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_BLOCKLIST () {
        return SEARCH_FIELDS_FOR_BLOCKLIST;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../engine/twenty-orm/base.workspace-entity");
const HANDLE_FIELD_NAME = 'handle';
const SEARCH_FIELDS_FOR_BLOCKLIST = [
    {
        name: HANDLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let BlocklistWorkspaceEntity = class BlocklistWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=blocklist.workspace-entity.js.map