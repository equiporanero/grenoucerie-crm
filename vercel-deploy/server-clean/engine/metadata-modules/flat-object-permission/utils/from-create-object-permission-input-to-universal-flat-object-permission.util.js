"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateObjectPermissionInputToUniversalFlatObjectPermission", {
    enumerable: true,
    get: function() {
        return fromCreateObjectPermissionInputToUniversalFlatObjectPermission;
    }
});
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateObjectPermissionInputToUniversalFlatObjectPermission = ({ createObjectPermissionInput, flatApplication, flatRoleMaps, flatObjectMetadataMaps })=>{
    const { roleId, objectMetadataId, canReadObjectRecords, canUpdateObjectRecords, canSoftDeleteObjectRecords, canDestroyObjectRecords, universalIdentifier } = createObjectPermissionInput;
    const now = new Date().toISOString();
    const { roleUniversalIdentifier, objectMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'objectPermission',
        foreignKeyValues: {
            roleId,
            objectMetadataId
        },
        flatEntityMaps: {
            flatRoleMaps,
            flatObjectMetadataMaps
        }
    });
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier: universalIdentifier ?? (0, _uuid.v4)(),
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        roleUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        canReadObjectRecords: canReadObjectRecords ?? undefined,
        canUpdateObjectRecords: canUpdateObjectRecords ?? undefined,
        canSoftDeleteObjectRecords: canSoftDeleteObjectRecords ?? undefined,
        canDestroyObjectRecords: canDestroyObjectRecords ?? undefined,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-create-object-permission-input-to-universal-flat-object-permission.util.js.map