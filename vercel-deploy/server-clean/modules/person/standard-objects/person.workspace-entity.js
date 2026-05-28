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
    get PersonWorkspaceEntity () {
        return PersonWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_PERSON () {
        return SEARCH_FIELDS_FOR_PERSON;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../engine/twenty-orm/base.workspace-entity");
const NAME_FIELD_NAME = 'name';
const EMAILS_FIELD_NAME = 'emails';
const PHONES_FIELD_NAME = 'phones';
const JOB_TITLE_FIELD_NAME = 'jobTitle';
const SEARCH_FIELDS_FOR_PERSON = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.FULL_NAME
    },
    {
        name: EMAILS_FIELD_NAME,
        type: _types.FieldMetadataType.EMAILS
    },
    {
        name: PHONES_FIELD_NAME,
        type: _types.FieldMetadataType.PHONES
    },
    {
        name: JOB_TITLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let PersonWorkspaceEntity = class PersonWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=person.workspace-entity.js.map