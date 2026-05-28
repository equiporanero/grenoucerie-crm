"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateRolePermissionFlagInputToFlatRolePermissionFlagToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateRolePermissionFlagInputToFlatRolePermissionFlagToCreate;
    }
});
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateRolePermissionFlagInputToFlatRolePermissionFlagToCreate = ({ createRolePermissionFlagInput, flatApplication, flatPermissionFlagMaps, flatRoleMaps })=>{
    const { roleId, permissionFlagId, flag, universalIdentifier } = createRolePermissionFlagInput;
    const now = new Date().toISOString();
    const { permissionFlagUniversalIdentifier, roleUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'rolePermissionFlag',
        foreignKeyValues: {
            permissionFlagId,
            roleId
        },
        flatEntityMaps: {
            flatPermissionFlagMaps,
            flatRoleMaps
        }
    });
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier: universalIdentifier ?? (0, _uuid.v4)(),
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        permissionFlagUniversalIdentifier,
        roleUniversalIdentifier,
        flag,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-create-role-permission-flag-input-to-flat-role-permission-flag-to-create.util.js.map