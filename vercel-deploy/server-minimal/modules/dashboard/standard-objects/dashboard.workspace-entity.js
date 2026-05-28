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
    get DashboardWorkspaceEntity () {
        return DashboardWorkspaceEntity;
    },
    get SEARCH_FIELDS_FOR_DASHBOARD () {
        return SEARCH_FIELDS_FOR_DASHBOARD;
    }
});
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../engine/twenty-orm/base.workspace-entity");
const TITLE_FIELD_NAME = 'title';
const SEARCH_FIELDS_FOR_DASHBOARD = [
    {
        name: TITLE_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let DashboardWorkspaceEntity = class DashboardWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=dashboard.workspace-entity.js.map