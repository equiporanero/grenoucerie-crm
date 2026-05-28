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
    get CompanyWorkspaceEntity () {
        return CompanyWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_COMPANY () {
        return SEARCH_FIELDS_FOR_COMPANY;
    }
});
const _types = require("twenty-shared/types");
const NAME_FIELD_NAME = 'name';
const DOMAIN_NAME_FIELD_NAME = 'domainName';
const SEARCH_FIELDS_FOR_COMPANY = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    },
    {
        name: DOMAIN_NAME_FIELD_NAME,
        type: _types.FieldMetadataType.LINKS
    }
];
let CompanyWorkspaceEntity = class CompanyWorkspaceEntity {
};

//# sourceMappingURL=company.workspace-entity.js.map