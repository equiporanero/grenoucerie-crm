"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRoleBelongsToCallerApplication", {
    enumerable: true,
    get: function() {
        return validateRoleBelongsToCallerApplication;
    }
});
const _core = require("@lingui/core");
const _permissionsexception = require("../../../../../metadata-modules/permissions/permissions.exception");
const validateRoleBelongsToCallerApplication = ({ referencedRole, buildOptions })=>{
    if (referencedRole.applicationUniversalIdentifier !== buildOptions.applicationUniversalIdentifier) {
        return [
            {
                code: _permissionsexception.PermissionsExceptionCode.ROLE_BELONGS_TO_ANOTHER_APPLICATION,
                message: _core.i18n._(/*i18n*/ {
                    id: "jNnzPT",
                    message: "Cannot target a role owned by another application"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "2ET75e",
                    message: "Cannot target a role owned by another application."
                }
            }
        ];
    }
    return [];
};

//# sourceMappingURL=validate-role-belongs-to-caller-application.util.js.map