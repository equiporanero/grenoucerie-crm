"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_FLAT_ROLE_METADATA_BUILDERS_BY_ROLE_NAME", {
    enumerable: true,
    get: function() {
        return STANDARD_FLAT_ROLE_METADATA_BUILDERS_BY_ROLE_NAME;
    }
});
const _createstandardroleflatmetadatautil = require("./create-standard-role-flat-metadata.util");
const STANDARD_FLAT_ROLE_METADATA_BUILDERS_BY_ROLE_NAME = {
    admin: (args)=>(0, _createstandardroleflatmetadatautil.createStandardRoleFlatMetadata)({
            ...args,
            context: {
                roleName: 'admin',
                label: 'Admin',
                description: 'Admin role',
                icon: 'IconUserCog',
                isEditable: false,
                canUpdateAllSettings: true,
                canAccessAllTools: true,
                canReadAllObjectRecords: true,
                canUpdateAllObjectRecords: true,
                canSoftDeleteAllObjectRecords: true,
                canDestroyAllObjectRecords: true,
                canBeAssignedToUsers: true,
                canBeAssignedToAgents: false,
                canBeAssignedToApiKeys: true
            }
        })
};

//# sourceMappingURL=create-standard-flat-role-metadata.util.js.map