"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardWorkspaceMemberViews", {
    enumerable: true,
    get: function() {
        return computeStandardWorkspaceMemberViews;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewflatmetadatautil = require("./create-standard-view-flat-metadata.util");
const computeStandardWorkspaceMemberViews = (args)=>{
    return {
        allWorkspaceMembers: (0, _createstandardviewflatmetadatautil.createStandardViewFlatMetadata)({
            ...args,
            objectName: 'workspaceMember',
            context: {
                viewName: 'allWorkspaceMembers',
                name: 'All {objectLabelPlural}',
                type: _types.ViewType.TABLE,
                key: _types.ViewKey.INDEX,
                position: 0,
                icon: 'IconList'
            }
        })
    };
};

//# sourceMappingURL=compute-standard-workspace-member-views.util.js.map