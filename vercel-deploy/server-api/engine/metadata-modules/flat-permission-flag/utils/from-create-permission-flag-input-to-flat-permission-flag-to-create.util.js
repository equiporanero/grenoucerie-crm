"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreatePermissionFlagInputToFlatPermissionFlagToCreate", {
    enumerable: true,
    get: function() {
        return fromCreatePermissionFlagInputToFlatPermissionFlagToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const fromCreatePermissionFlagInputToFlatPermissionFlagToCreate = ({ createPermissionFlagInput, workspaceId, flatApplication })=>{
    const now = new Date().toISOString();
    const { key, label, description, icon } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(createPermissionFlagInput, [
        'key',
        'label',
        'description',
        'icon'
    ]);
    const id = createPermissionFlagInput.id ?? (0, _uuid.v4)();
    const universalIdentifier = createPermissionFlagInput.universalIdentifier ?? id;
    return {
        id,
        universalIdentifier,
        key,
        label,
        description: description ?? null,
        icon: icon ?? null,
        permissionType: createPermissionFlagInput.permissionType,
        workspaceId,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        rolePermissionFlagIds: [],
        rolePermissionFlagUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-create-permission-flag-input-to-flat-permission-flag-to-create.util.js.map