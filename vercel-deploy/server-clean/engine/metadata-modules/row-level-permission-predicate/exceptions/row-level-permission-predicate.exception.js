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
    get RowLevelPermissionPredicateException () {
        return RowLevelPermissionPredicateException;
    },
    get RowLevelPermissionPredicateExceptionCode () {
        return RowLevelPermissionPredicateExceptionCode;
    }
});
const _customexception = require("../../../../utils/custom-exception");
const RowLevelPermissionPredicateExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND: 'ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND',
    INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA: 'INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA',
    FIELD_METADATA_NOT_FOUND: 'FIELD_METADATA_NOT_FOUND',
    OBJECT_METADATA_NOT_FOUND: 'OBJECT_METADATA_NOT_FOUND',
    ROLE_NOT_FOUND: 'ROLE_NOT_FOUND',
    UNAUTHORIZED_ROLE_MODIFICATION: 'UNAUTHORIZED_ROLE_MODIFICATION',
    UNAUTHORIZED_OBJECT_MODIFICATION: 'UNAUTHORIZED_OBJECT_MODIFICATION',
    ROW_LEVEL_PERMISSION_FEATURE_DISABLED: 'ROW_LEVEL_PERMISSION_FEATURE_DISABLED'
});
const rowLevelPermissionPredicateExceptionUserFriendlyMessages = {
    ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND: /*i18n*/ {
        id: "fEazMl",
        message: "Row level permission predicate not found."
    },
    INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA: /*i18n*/ {
        id: "ppA1Aq",
        message: "Invalid row level permission predicate data."
    },
    FIELD_METADATA_NOT_FOUND: /*i18n*/ {
        id: "JrAl/I",
        message: "Field metadata not found."
    },
    OBJECT_METADATA_NOT_FOUND: /*i18n*/ {
        id: "rHce90",
        message: "Object metadata not found."
    },
    ROLE_NOT_FOUND: /*i18n*/ {
        id: "/BTyf+",
        message: "Role not found."
    },
    UNAUTHORIZED_ROLE_MODIFICATION: /*i18n*/ {
        id: "xO923u",
        message: "Cannot modify predicate belonging to a different role."
    },
    UNAUTHORIZED_OBJECT_MODIFICATION: /*i18n*/ {
        id: "DAGexD",
        message: "Cannot modify predicate belonging to a different object."
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
let RowLevelPermissionPredicateException = class RowLevelPermissionPredicateException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? rowLevelPermissionPredicateExceptionUserFriendlyMessages[code]
        });
    }
};

//# sourceMappingURL=row-level-permission-predicate.exception.js.map