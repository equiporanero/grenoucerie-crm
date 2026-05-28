"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRoleLabelUniqueness", {
    enumerable: true,
    get: function() {
        return validateRoleLabelUniqueness;
    }
});
const _permissionsexception = require("../../../../../metadata-modules/permissions/permissions.exception");
const validateRoleLabelUniqueness = ({ label, existingFlatRoles })=>{
    const errors = [];
    if (existingFlatRoles.some((role)=>role.label === label)) {
        errors.push({
            code: _permissionsexception.PermissionsExceptionCode.ROLE_LABEL_ALREADY_EXISTS,
            message: _permissionsexception.PermissionsExceptionMessage.ROLE_LABEL_ALREADY_EXISTS,
            userFriendlyMessage: /*i18n*/ {
                id: "Q2De+v",
                message: "A role with this label already exists."
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-role-label-uniqueness.util.js.map