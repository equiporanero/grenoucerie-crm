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
    get CustomWorkspaceEntity () {
        return CustomWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_CUSTOM_OBJECT () {
        return SEARCH_FIELDS_FOR_CUSTOM_OBJECT;
    }
});
const _types = require("twenty-shared/types");
const _objectmetadataconstants = require("../metadata-modules/object-metadata/constants/object-metadata.constants");
const _baseworkspaceentity = require("./base.workspace-entity");
const SEARCH_FIELDS_FOR_CUSTOM_OBJECT = [
    {
        name: _objectmetadataconstants.DEFAULT_LABEL_IDENTIFIER_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let CustomWorkspaceEntity = class CustomWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=custom.workspace-entity.js.map