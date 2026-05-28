"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatFieldPermissionToFieldPermissionDto", {
    enumerable: true,
    get: function() {
        return fromFlatFieldPermissionToFieldPermissionDto;
    }
});
const fromFlatFieldPermissionToFieldPermissionDto = (flatFieldPermission)=>({
        id: flatFieldPermission.id,
        objectMetadataId: flatFieldPermission.objectMetadataId,
        fieldMetadataId: flatFieldPermission.fieldMetadataId,
        roleId: flatFieldPermission.roleId,
        canReadFieldValue: flatFieldPermission.canReadFieldValue ?? null,
        canUpdateFieldValue: flatFieldPermission.canUpdateFieldValue ?? null
    });

//# sourceMappingURL=from-flat-field-permission-to-field-permission-dto.util.js.map