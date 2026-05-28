/* @license Enterprise */ "use strict";
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
    get RowLevelPermissionPredicateGroupException () {
        return RowLevelPermissionPredicateGroupException;
    },
    get RowLevelPermissionPredicateGroupExceptionCode () {
        return RowLevelPermissionPredicateGroupExceptionCode;
    }
});
const _customexception = require("../../../../utils/custom-exception");
const RowLevelPermissionPredicateGroupExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    ROW_LEVEL_PERMISSION_PREDICATE_GROUP_NOT_FOUND: 'ROW_LEVEL_PERMISSION_PREDICATE_GROUP_NOT_FOUND',
    INVALID_ROW_LEVEL_PERMISSION_PREDICATE_GROUP_DATA: 'INVALID_ROW_LEVEL_PERMISSION_PREDICATE_GROUP_DATA',
    ROLE_NOT_FOUND: 'ROLE_NOT_FOUND',
    OBJECT_METADATA_NOT_FOUND: 'OBJECT_METADATA_NOT_FOUND',
    UNAUTHORIZED_ROLE_MODIFICATION: 'UNAUTHORIZED_ROLE_MODIFICATION',
    UNAUTHORIZED_OBJECT_MODIFICATION: 'UNAUTHORIZED_OBJECT_MODIFICATION',
    ROW_LEVEL_PERMISSION_FEATURE_DISABLED: 'ROW_LEVEL_PERMISSION_FEATURE_DISABLED'
});
const rowLevelPermissionPredicateGroupExceptionUserFriendlyMessages = {
    ROW_LEVEL_PERMISSION_PREDICATE_GROUP_NOT_FOUND: /*i18n*/ {
        id: "HBfLro",
        message: "Row level permission predicate group not found."
    },
    INVALID_ROW_LEVEL_PERMISSION_PREDICATE_GROUP_DATA: /*i18n*/ {
        id: "nwC2sc",
        message: "Invalid row level permission predicate group data."
    },
    ROLE_NOT_FOUND: /*i18n*/ {
        id: "/BTyf+",
        message: "Role not found."
    },
    OBJECT_METADATA_NOT_FOUND: /*i18n*/ {
        id: "rHce90",
        message: "Object metadata not found."
    },
    UNAUTHORIZED_ROLE_MODIFICATION: /*i18n*/ {
        id: "3niIR5",
        message: "Cannot modify predicate group belonging to a different role."
    },
    UNAUTHORIZED_OBJECT_MODIFICATION: /*i18n*/ {
        id: "eiujBX",
        message: "Cannot modify predicate group belonging to a different object."
    },
    ROW_LEVEL_PERMISSION_FEATURE_DISABLED: /*i18n*/ {
        id: "RwBHMj",
        message: "Row level permission predicate feature is disabled."
    },
    INTERNAL_SERVER_ERROR: /*i18n*/ {
        id: "W5A0Ly",
        message: "An unexpected error occurred."
    }
};
let RowLevelPermissionPredicateGroupException = class RowLevelPermissionPredicateGroupException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? rowLevelPermissionPredicateGroupExceptionUserFriendlyMessages[code]
        });
    }
};

//# sourceMappingURL=row-level-permission-predicate-group.exception.js.map