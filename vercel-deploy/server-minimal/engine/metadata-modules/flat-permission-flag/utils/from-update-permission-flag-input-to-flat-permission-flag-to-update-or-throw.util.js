"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdatePermissionFlagInputToFlatPermissionFlagToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdatePermissionFlagInputToFlatPermissionFlagToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _flatpermissionflageditablepropertiesconstant = require("../constants/flat-permission-flag-editable-properties.constant");
const _permissionflagexception = require("../../permission-flag/permission-flag.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdatePermissionFlagInputToFlatPermissionFlagToUpdateOrThrow = ({ flatPermissionFlagMaps, updatePermissionFlagInput })=>{
    const existing = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updatePermissionFlagInput.id,
        flatEntityMaps: flatPermissionFlagMaps
    });
    if (!(0, _utils.isDefined)(existing)) {
        throw new _permissionflagexception.PermissionFlagException('Permission flag not found', _permissionflagexception.PermissionFlagExceptionCode.PERMISSION_FLAG_NOT_FOUND);
    }
    return {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing,
            properties: [
                ..._flatpermissionflageditablepropertiesconstant.FLAT_PERMISSION_FLAG_EDITABLE_PROPERTIES
            ],
            update: updatePermissionFlagInput.update
        }),
        updatedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-update-permission-flag-input-to-flat-permission-flag-to-update-or-throw.util.js.map