"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateFieldPermissionInputToUniversalFlatFieldPermission", {
    enumerable: true,
    get: function() {
        return fromCreateFieldPermissionInputToUniversalFlatFieldPermission;
    }
});
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateFieldPermissionInputToUniversalFlatFieldPermission = ({ fieldPermissionInput, roleId, flatApplication, flatRoleMaps, flatObjectMetadataMaps, flatFieldMetadataMaps })=>{
    const now = new Date().toISOString();
    const { roleUniversalIdentifier, objectMetadataUniversalIdentifier, fieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'fieldPermission',
        foreignKeyValues: {
            roleId,
            objectMetadataId: fieldPermissionInput.objectMetadataId,
            fieldMetadataId: fieldPermissionInput.fieldMetadataId
        },
        flatEntityMaps: {
            flatRoleMaps,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        }
    });
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier: (0, _uuid.v4)(),
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        roleUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        fieldMetadataUniversalIdentifier,
        canReadFieldValue: fieldPermissionInput.canReadFieldValue ?? undefined,
        canUpdateFieldValue: fieldPermissionInput.canUpdateFieldValue ?? undefined,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-create-field-permission-input-to-universal-flat-field-permission.util.js.map