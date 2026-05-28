"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkspaceMemberViewFields", {
    enumerable: true,
    get: function() {
        return computeStandardWorkspaceMemberViewFields;
    }
});
const _createstandardviewfieldflatmetadatautil = require("./create-standard-view-field-flat-metadata.util");
const computeStandardWorkspaceMemberViewFields = (args)=>{
    return {
        allWorkspaceMembersName: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workspaceMember',
            context: {
                viewName: 'allWorkspaceMembers',
                viewFieldName: 'name',
                fieldName: 'name',
                position: 0,
                isVisible: true,
                size: 210
            }
        }),
        allWorkspaceMembersCreatedAt: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workspaceMember',
            context: {
                viewName: 'allWorkspaceMembers',
                viewFieldName: 'createdAt',
                fieldName: 'createdAt',
                position: 1,
                isVisible: true,
                size: 150
            }
        }),
        allWorkspaceMembersOwnedOpportunities: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workspaceMember',
            context: {
                viewName: 'allWorkspaceMembers',
                viewFieldName: 'ownedOpportunities',
                fieldName: 'ownedOpportunities',
                position: 2,
                isVisible: true,
                size: 150
            }
        }),
        allWorkspaceMembersAssignedTasks: (0, _createstandardviewfieldflatmetadatautil.createStandardViewFieldFlatMetadata)({
            ...args,
            objectName: 'workspaceMember',
            context: {
                viewName: 'allWorkspaceMembers',
                viewFieldName: 'assignedTasks',
                fieldName: 'assignedTasks',
                position: 3,
                isVisible: true,
                size: 150
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workspace-member-view-fields.util.js.map