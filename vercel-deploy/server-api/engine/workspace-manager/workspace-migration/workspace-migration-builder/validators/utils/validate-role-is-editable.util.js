"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRoleIsEditable", {
    enumerable: true,
    get: function() {
        return validateRoleIsEditable;
    }
});
const _permissionsexception = require("../../../../../metadata-modules/permissions/permissions.exception");
const validateRoleIsEditable = ({ flatRole, buildOptions })=>{
    const errors = [];
    if (!buildOptions.isSystemBuild && !flatRole.isEditable) {
        errors.push({
            code: _permissionsexception.PermissionsExceptionCode.ROLE_NOT_EDITABLE,
            message: _permissionsexception.PermissionsExceptionMessage.ROLE_NOT_EDITABLE,
            userFriendlyMessage: /*i18n*/ {
                id: "KoDdqN",
                message: "This role cannot be modified because it is a system role. Only custom roles can be edited."
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-role-is-editable.util.js.map