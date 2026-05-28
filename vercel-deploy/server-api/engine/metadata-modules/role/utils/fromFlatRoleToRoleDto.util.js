"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatRoleToRoleDto", {
    enumerable: true,
    get: function() {
        return fromFlatRoleToRoleDto;
    }
});
const fromFlatRoleToRoleDto = ({ canAccessAllTools, canBeAssignedToAgents, canBeAssignedToApiKeys, canBeAssignedToUsers, canDestroyAllObjectRecords, canReadAllObjectRecords, canSoftDeleteAllObjectRecords, canUpdateAllObjectRecords, canUpdateAllSettings, id, isEditable, label, description, icon, universalIdentifier })=>{
    return {
        canAccessAllTools,
        canBeAssignedToAgents,
        canBeAssignedToApiKeys,
        canBeAssignedToUsers,
        canDestroyAllObjectRecords,
        canReadAllObjectRecords,
        canSoftDeleteAllObjectRecords,
        canUpdateAllObjectRecords,
        canUpdateAllSettings,
        id,
        isEditable,
        label,
        description: description ?? undefined,
        icon: icon ?? undefined,
        universalIdentifier
    };
};

//# sourceMappingURL=fromFlatRoleToRoleDto.util.js.map