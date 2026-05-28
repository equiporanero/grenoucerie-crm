"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFlatRoleTargetTargetsOnlyOneEntity", {
    enumerable: true,
    get: function() {
        return validateFlatRoleTargetTargetsOnlyOneEntity;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _roletargetexception = require("../../../../../metadata-modules/role/exceptions/role-target.exception");
const validateFlatRoleTargetTargetsOnlyOneEntity = ({ flatRoleTarget })=>{
    const errors = [];
    const definedIdentifiersCount = [
        (0, _utils.isDefined)(flatRoleTarget.apiKeyId),
        (0, _utils.isDefined)(flatRoleTarget.userWorkspaceId),
        (0, _utils.isDefined)(flatRoleTarget.agentId)
    ].filter(Boolean).length;
    if (definedIdentifiersCount !== 1) {
        errors.push({
            code: _roletargetexception.RoleTargetExceptionCode.ROLE_TARGET_MISSING_IDENTIFIER,
            message: _core.i18n._(/*i18n*/ {
                id: "oCyyzG",
                message: "Role target must have exactly one of: apiKeyId, userWorkspaceId, or agentId"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "oCyyzG",
                message: "Role target must have exactly one of: apiKeyId, userWorkspaceId, or agentId"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-flat-role-target-targets-only-one-entity.util.js.map