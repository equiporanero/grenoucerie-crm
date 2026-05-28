"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateRoleInputToFlatRoleToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateRoleInputToFlatRoleToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _permissionsexception = require("../../permissions/permissions.exception");
const fromUpdateRoleInputToFlatRoleToUpdateOrThrow = ({ flatRoleMaps, updateRoleInput })=>{
    const existingFlatRole = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updateRoleInput.id,
        flatEntityMaps: flatRoleMaps
    });
    if (!(0, _utils.isDefined)(existingFlatRole)) {
        throw new _permissionsexception.PermissionsException('Role not found', _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND, {
            userFriendlyMessage: /*i18n*/ {
                id: "Zi9X+u",
                message: "The role you are looking for could not be found. It may have been deleted or you may not have access to it."
            }
        });
    }
    return {
        ...existingFlatRole,
        ...updateRoleInput.update
    };
};

//# sourceMappingURL=from-update-role-input-to-flat-role-to-update-or-throw.util.js.map