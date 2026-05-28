"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateRoleInputToFlatRoleToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateRoleInputToFlatRoleToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const fromCreateRoleInputToFlatRoleToCreate = ({ createRoleInput, workspaceId, flatApplication })=>{
    const now = new Date().toISOString();
    const { label, description, icon, id: inputId } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(createRoleInput, [
        'description',
        'icon',
        'id',
        'label'
    ]);
    const id = inputId ?? (0, _uuid.v4)();
    return {
        id,
        label,
        description: description ?? null,
        icon: icon ?? null,
        canUpdateAllSettings: createRoleInput.canUpdateAllSettings ?? false,
        canAccessAllTools: createRoleInput.canAccessAllTools ?? false,
        canReadAllObjectRecords: createRoleInput.canReadAllObjectRecords ?? false,
        canUpdateAllObjectRecords: createRoleInput.canUpdateAllObjectRecords ?? false,
        canSoftDeleteAllObjectRecords: createRoleInput.canSoftDeleteAllObjectRecords ?? false,
        canDestroyAllObjectRecords: createRoleInput.canDestroyAllObjectRecords ?? false,
        canBeAssignedToUsers: createRoleInput.canBeAssignedToUsers ?? true,
        canBeAssignedToAgents: createRoleInput.canBeAssignedToAgents ?? true,
        canBeAssignedToApiKeys: createRoleInput.canBeAssignedToApiKeys ?? true,
        isEditable: true,
        workspaceId,
        createdAt: now,
        updatedAt: now,
        universalIdentifier: createRoleInput.universalIdentifier ?? (0, _uuid.v4)(),
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        roleTargetIds: [],
        roleTargetUniversalIdentifiers: [],
        objectPermissionIds: [],
        rolePermissionFlagIds: [],
        objectPermissionUniversalIdentifiers: [],
        rolePermissionFlagUniversalIdentifiers: [],
        fieldPermissionIds: [],
        fieldPermissionUniversalIdentifiers: [],
        rowLevelPermissionPredicateIds: [],
        rowLevelPermissionPredicateUniversalIdentifiers: [],
        rowLevelPermissionPredicateGroupIds: [],
        rowLevelPermissionPredicateGroupUniversalIdentifiers: []
    };
};

//# sourceMappingURL=from-create-role-input-to-flat-role-to-create.util.js.map