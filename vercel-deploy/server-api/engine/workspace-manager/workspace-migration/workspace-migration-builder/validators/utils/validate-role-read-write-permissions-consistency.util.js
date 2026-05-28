"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRoleReadWritePermissionsConsistency", {
    enumerable: true,
    get: function() {
        return validateRoleReadWritePermissionsConsistency;
    }
});
const _permissionsexception = require("../../../../../metadata-modules/permissions/permissions.exception");
const validateRoleReadWritePermissionsConsistency = ({ flatRole })=>{
    const errors = [];
    if (flatRole.canReadAllObjectRecords === false && (flatRole.canUpdateAllObjectRecords || flatRole.canSoftDeleteAllObjectRecords || flatRole.canDestroyAllObjectRecords)) {
        errors.push({
            code: _permissionsexception.PermissionsExceptionCode.CANNOT_GIVE_WRITING_PERMISSION_WITHOUT_READING_PERMISSION,
            message: _permissionsexception.PermissionsExceptionMessage.CANNOT_GIVE_WRITING_PERMISSION_WITHOUT_READING_PERMISSION,
            userFriendlyMessage: /*i18n*/ {
                id: "y5haJ4",
                message: "You cannot grant edit permissions without also granting read permissions. Please enable read access first."
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-role-read-write-permissions-consistency.util.js.map