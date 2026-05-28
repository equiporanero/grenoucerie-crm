"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFlatRoleTargetAssignationAvailability", {
    enumerable: true,
    get: function() {
        return validateFlatRoleTargetAssignationAvailability;
    }
});
const _core = require("@lingui/core");
const _classvalidator = require("class-validator");
const _roletargetexception = require("../../../../../metadata-modules/role/exceptions/role-target.exception");
const validateFlatRoleTargetAssignationAvailability = ({ flatRole, flatRoleTarget })=>{
    const errors = [];
    const roleLabel = flatRole.label;
    if ((0, _classvalidator.isDefined)(flatRoleTarget.agentId)) {
        if (!flatRole.canBeAssignedToAgents) {
            errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_ENTITY,
                message: _core.i18n._(/*i18n*/ {
                    id: "QbW1ho",
                    message: 'Role "{roleLabel}" cannot be assigned to agents',
                    values: {
                        roleLabel: roleLabel
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "QbW1ho",
                    message: 'Role "{roleLabel}" cannot be assigned to agents',
                    values: {
                        roleLabel: roleLabel
                    }
                }
            });
        }
    } else if ((0, _classvalidator.isDefined)(flatRoleTarget.userWorkspaceId)) {
        if (!flatRole.canBeAssignedToUsers) {
            errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_ENTITY,
                message: _core.i18n._(/*i18n*/ {
                    id: "9ZQkou",
                    message: 'Role "{roleLabel}" cannot be assigned to users',
                    values: {
                        roleLabel: roleLabel
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "9ZQkou",
                    message: 'Role "{roleLabel}" cannot be assigned to users',
                    values: {
                        roleLabel: roleLabel
                    }
                }
            });
        }
    } else if ((0, _classvalidator.isDefined)(flatRoleTarget.apiKeyId)) {
        if (!flatRole.canBeAssignedToApiKeys) {
            errors.push({
                code: _roletargetexception.RoleTargetExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_ENTITY,
                message: _core.i18n._(/*i18n*/ {
                    id: "u1Fm8i",
                    message: 'Role "{roleLabel}" cannot be assigned to API keys',
                    values: {
                        roleLabel: roleLabel
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "u1Fm8i",
                    message: 'Role "{roleLabel}" cannot be assigned to API keys',
                    values: {
                        roleLabel: roleLabel
                    }
                }
            });
        }
    }
    return errors;
};

//# sourceMappingURL=validate-flat-role-target-assignation-availability.util.js.map