"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computePermissionIntersection", {
    enumerable: true,
    get: function() {
        return computePermissionIntersection;
    }
});
const computePermissionIntersection = (permissionsArray)=>{
    if (permissionsArray.length === 0) {
        return {};
    }
    if (permissionsArray.length === 1) {
        return permissionsArray[0];
    }
    const result = {};
    const allObjectMetadataIds = new Set();
    for (const permissions of permissionsArray){
        for (const id of Object.keys(permissions)){
            allObjectMetadataIds.add(id);
        }
    }
    for (const objectMetadataId of allObjectMetadataIds){
        let canReadObjectRecords = true;
        let canUpdateObjectRecords = true;
        let canSoftDeleteObjectRecords = true;
        let canDestroyObjectRecords = true;
        const restrictedFields = {};
        for (const permissions of permissionsArray){
            const objPerm = permissions[objectMetadataId];
            if (!objPerm) {
                canReadObjectRecords = false;
                canUpdateObjectRecords = false;
                canSoftDeleteObjectRecords = false;
                canDestroyObjectRecords = false;
                continue;
            }
            canReadObjectRecords = canReadObjectRecords && objPerm.canReadObjectRecords === true;
            canUpdateObjectRecords = canUpdateObjectRecords && objPerm.canUpdateObjectRecords === true;
            canSoftDeleteObjectRecords = canSoftDeleteObjectRecords && objPerm.canSoftDeleteObjectRecords === true;
            canDestroyObjectRecords = canDestroyObjectRecords && objPerm.canDestroyObjectRecords === true;
            if (objPerm.restrictedFields) {
                for (const [fieldName, fieldPerm] of Object.entries(objPerm.restrictedFields)){
                    if (!restrictedFields[fieldName]) {
                        restrictedFields[fieldName] = {
                            canRead: null,
                            canUpdate: null
                        };
                    }
                    const current = restrictedFields[fieldName];
                    restrictedFields[fieldName] = {
                        canRead: current.canRead === false || fieldPerm.canRead === false ? false : null,
                        canUpdate: current.canUpdate === false || fieldPerm.canUpdate === false ? false : null
                    };
                }
            }
        }
        result[objectMetadataId] = {
            canReadObjectRecords,
            canUpdateObjectRecords,
            canSoftDeleteObjectRecords,
            canDestroyObjectRecords,
            restrictedFields,
            rowLevelPermissionPredicates: [],
            rowLevelPermissionPredicateGroups: []
        };
    }
    return result;
};

//# sourceMappingURL=compute-permission-intersection.util.js.map