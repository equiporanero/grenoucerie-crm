"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeStandardTaskViewGroups", {
    enumerable: true,
    get: function() {
        return computeStandardTaskViewGroups;
    }
});
const _createstandardviewgroupflatmetadatautil = require("./create-standard-view-group-flat-metadata.util");
const computeStandardTaskViewGroups = (args)=>{
    return {
        assignedToMeTodo: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'assignedToMe',
                viewGroupName: 'todo',
                isVisible: true,
                fieldValue: 'TODO',
                position: 0
            }
        }),
        assignedToMeInProgress: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'assignedToMe',
                viewGroupName: 'inProgress',
                isVisible: true,
                fieldValue: 'IN_PROGRESS',
                position: 1
            }
        }),
        assignedToMeDone: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'assignedToMe',
                viewGroupName: 'done',
                isVisible: true,
                fieldValue: 'DONE',
                position: 2
            }
        }),
        assignedToMeEmpty: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'assignedToMe',
                viewGroupName: 'empty',
                isVisible: true,
                fieldValue: '',
                position: 3
            }
        }),
        byStatusTodo: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'byStatus',
                viewGroupName: 'todo',
                isVisible: true,
                fieldValue: 'TODO',
                position: 0
            }
        }),
        byStatusInProgress: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'byStatus',
                viewGroupName: 'inProgress',
                isVisible: true,
                fieldValue: 'IN_PROGRESS',
                position: 1
            }
        }),
        byStatusDone: (0, _createstandardviewgroupflatmetadatautil.createStandardViewGroupFlatMetadata)({
            ...args,
            objectName: 'task',
            context: {
                viewName: 'byStatus',
                viewGroupName: 'done',
                isVisible: true,
                fieldValue: 'DONE',
                position: 2
            }
        })
    };
};

//# sourceMappingURL=compute-standard-task-view-groups.util.js.map