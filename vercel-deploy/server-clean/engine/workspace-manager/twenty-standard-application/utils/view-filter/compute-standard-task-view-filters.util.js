"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardTaskViewFilters", {
    enumerable: true,
    get: function() {
        return computeStandardTaskViewFilters;
    }
});
const _types = require("twenty-shared/types");
const _createstandardviewfilterflatmetadatautil = require("./create-standard-view-filter-flat-metadata.util");
const computeStandardTaskViewFilters = (args)=>{
    return {
        assignedToMeAssigneeIsMe: (0, _createstandardviewfilterflatmetadatautil.createStandardViewFilterFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'assignedToMe',
                viewFilterName: 'assigneeIsMe',
                fieldName: 'assignee',
                operand: _types.ViewFilterOperand.IS,
                value: JSON.stringify({
                    isCurrentWorkspaceMemberSelected: true,
                    selectedRecordIds: []
                })
            }
        })
    };
};

//# sourceMappingURL=compute-standard-task-view-filters.util.js.map