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
    get SEARCH_FIELDS_FOR_WORKSPACE_MEMBER () {
        return SEARCH_FIELDS_FOR_WORKSPACE_MEMBER;
    },
    get WorkspaceMemberDateFormatEnum () {
        return WorkspaceMemberDateFormatEnum;
    },
    get WorkspaceMemberNumberFormatEnum () {
        return WorkspaceMemberNumberFormatEnum;
    },
    get WorkspaceMemberTimeFormatEnum () {
        return WorkspaceMemberTimeFormatEnum;
    },
    get WorkspaceMemberWorkspaceEntity () {
        return WorkspaceMemberWorkspaceEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _baseworkspaceentity = require("../../../engine/twenty-orm/base.workspace-entity");
var WorkspaceMemberDateFormatEnum = /*#__PURE__*/ function(WorkspaceMemberDateFormatEnum) {
    WorkspaceMemberDateFormatEnum["SYSTEM"] = "SYSTEM";
    WorkspaceMemberDateFormatEnum["MONTH_FIRST"] = "MONTH_FIRST";
    WorkspaceMemberDateFormatEnum["DAY_FIRST"] = "DAY_FIRST";
    WorkspaceMemberDateFormatEnum["YEAR_FIRST"] = "YEAR_FIRST";
    return WorkspaceMemberDateFormatEnum;
}({});
var WorkspaceMemberTimeFormatEnum = /*#__PURE__*/ function(WorkspaceMemberTimeFormatEnum) {
    WorkspaceMemberTimeFormatEnum["SYSTEM"] = "SYSTEM";
    WorkspaceMemberTimeFormatEnum["HOUR_12"] = "HOUR_12";
    WorkspaceMemberTimeFormatEnum["HOUR_24"] = "HOUR_24";
    return WorkspaceMemberTimeFormatEnum;
}({});
var WorkspaceMemberNumberFormatEnum = /*#__PURE__*/ function(WorkspaceMemberNumberFormatEnum) {
    WorkspaceMemberNumberFormatEnum["SYSTEM"] = "SYSTEM";
    WorkspaceMemberNumberFormatEnum["COMMAS_AND_DOT"] = "COMMAS_AND_DOT";
    WorkspaceMemberNumberFormatEnum["SPACES_AND_COMMA"] = "SPACES_AND_COMMA";
    WorkspaceMemberNumberFormatEnum["DOTS_AND_COMMA"] = "DOTS_AND_COMMA";
    WorkspaceMemberNumberFormatEnum["APOSTROPHE_AND_DOT"] = "APOSTROPHE_AND_DOT";
    return WorkspaceMemberNumberFormatEnum;
}({});
(0, _graphql.registerEnumType)(WorkspaceMemberNumberFormatEnum, {
    name: 'WorkspaceMemberNumberFormatEnum',
    description: 'Number format for displaying numbers'
});
(0, _graphql.registerEnumType)(WorkspaceMemberTimeFormatEnum, {
    name: 'WorkspaceMemberTimeFormatEnum',
    description: 'Time time as Military, Standard or system as default'
});
(0, _graphql.registerEnumType)(WorkspaceMemberDateFormatEnum, {
    name: 'WorkspaceMemberDateFormatEnum',
    description: 'Date format as Month first, Day first, Year first or system as default'
});
const NAME_FIELD_NAME = 'name';
const USER_EMAIL_FIELD_NAME = 'userEmail';
const SEARCH_FIELDS_FOR_WORKSPACE_MEMBER = [
    {
        name: NAME_FIELD_NAME,
        type: _types.FieldMetadataType.FULL_NAME
    },
    {
        name: USER_EMAIL_FIELD_NAME,
        type: _types.FieldMetadataType.TEXT
    }
];
let WorkspaceMemberWorkspaceEntity = class WorkspaceMemberWorkspaceEntity extends _baseworkspaceentity.BaseWorkspaceEntity {
};

//# sourceMappingURL=workspace-member.workspace-entity.js.map