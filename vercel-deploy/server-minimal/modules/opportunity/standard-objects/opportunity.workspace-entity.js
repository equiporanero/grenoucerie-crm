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
    get OpportunityWorkspaceEntity () {
        return OpportunityWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_OPPORTUNITY () {
        return SEARCH_FIELDS_FOR_OPPORTUNITY;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../engine/twenty-orm/base.workspace-entity");
const NAME_FIELD_NAME = 'name';
const SEARCH_FIELDS_FOR_OPPORTUNITY = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let OpportunityWorkspaceEntity = class OpportunityWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=opportunity.workspace-entity.js.map