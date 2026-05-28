"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createStandardRoleFlatMetadata", {
    enumerable: true,
    get: function() {
        return createStandardRoleFlatMetadata;
    }
});
const _uuid = require("uuid");
const _standardroleconstant = require("../../constants/standard-role.constant");
const _twentystandardapplications = require("../../constants/twenty-standard-applications");
const createStandardRoleFlatMetadata = ({ context: { roleName, label, description, icon, isEditable, canUpdateAllSettings, canAccessAllTools, canReadAllObjectRecords, canUpdateAllObjectRecords, canSoftDeleteAllObjectRecords, canDestroyAllObjectRecords, canBeAssignedToUsers, canBeAssignedToAgents, canBeAssignedToApiKeys }, workspaceId, twentyStandardApplicationId, now })=>{
    const universalIdentifier = _standardroleconstant.STANDARD_ROLE[roleName].universalIdentifier;
    return {
        id: (0, _uuid.v4)(),
        universalIdentifier,
        label,
        description,
        icon,
        isEditable,
        canUpdateAllSettings,
        canAccessAllTools,
        canReadAllObjectRecords,
        canUpdateAllObjectRecords,
        canSoftDeleteAllObjectRecords,
        canDestroyAllObjectRecords,
        canBeAssignedToUsers,
        canBeAssignedToAgents,
        canBeAssignedToApiKeys,
        workspaceId,
        applicationId: twentyStandardApplicationId,
        applicationUniversalIdentifier: _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier,
        createdAt: now,
        updatedAt: now,
        rolePermissionFlagIds: [],
        rolePermissionFlagUniversalIdentifiers: [],
        objectPermissionUniversalIdentifiers: [],
        fieldPermissionIds: [],
        fieldPermissionUniversalIdentifiers: [],
        objectPermissionIds: [],
        roleTargetIds: [],
        roleTargetUniversalIdentifiers: [],
        rowLevelPermissionPredicateIds: [],
        rowLevelPermissionPredicateGroupIds: [],
        rowLevelPermissionPredicateGroupUniversalIdentifiers: [],
        rowLevelPermissionPredicateUniversalIdentifiers: []
    };
};

//# sourceMappingURL=create-standard-role-flat-metadata.util.js.map