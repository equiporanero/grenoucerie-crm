"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatObjectPermissionToObjectPermissionDto", {
    enumerable: true,
    get: function() {
        return fromFlatObjectPermissionToObjectPermissionDto;
    }
});
const fromFlatObjectPermissionToObjectPermissionDto = (flatObjectPermission)=>({
        objectMetadataId: flatObjectPermission.objectMetadataId,
        canReadObjectRecords: flatObjectPermission.canReadObjectRecords,
        canUpdateObjectRecords: flatObjectPermission.canUpdateObjectRecords,
        canSoftDeleteObjectRecords: flatObjectPermission.canSoftDeleteObjectRecords,
        canDestroyObjectRecords: flatObjectPermission.canDestroyObjectRecords
    });

//# sourceMappingURL=from-flat-object-permission-to-object-permission-dto.util.js.map