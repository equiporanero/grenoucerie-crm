"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeletePermissionFlagInputToFlatPermissionFlagOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeletePermissionFlagInputToFlatPermissionFlagOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _permissionflagexception = require("../../permission-flag/permission-flag.exception");
const fromDeletePermissionFlagInputToFlatPermissionFlagOrThrow = ({ flatPermissionFlagMaps, permissionFlagId })=>{
    const existing = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: permissionFlagId,
        flatEntityMaps: flatPermissionFlagMaps
    });
    if (!(0, _utils.isDefined)(existing)) {
        throw new _permissionflagexception.PermissionFlagException('Permission flag not found', _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_NOT_FOUND);
    }
    return existing;
};

//# sourceMappingURL=from-delete-permission-flag-input-to-flat-permission-flag-or-throw.util.js.map