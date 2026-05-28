"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findMatchingBranch", {
    enumerable: true,
    get: function() {
        return findMatchingBranch;
    }
});
const _utils = require("twenty-shared/utils");
const _workflowstepexecutorexception = require("../../../exceptions/workflow-step-executor.exception");
const _evaluatefilterconditionsutil = require("../../filter/utils/evaluate-filter-conditions.util");
const collectAllDescendantGroups = (rootGroupId, allGroups, collectedGroups = new Set())=>{
    const rootGroup = allGroups.find((group)=>group.id === rootGroupId);
    if (!rootGroup) {
        return collectedGroups;
    }
    collectedGroups.add(rootGroup);
    const childGroups = allGroups.filter((group)=>group.parentStepFilterGroupId === rootGroupId);
    for (const childGroup of childGroups){
        collectAllDescendantGroups(childGroup.id, allGroups, collectedGroups);
    }
    return collectedGroups;
};
const findMatchingBranch = ({ branches, stepFilterGroups, resolvedFilters })=>{
    const matchingBranch = branches.find((branch)=>{
        if (!(0, _utils.isDefined)(branch.filterGroupId)) {
            return true;
        }
        const branchFilterGroups = Array.from(collectAllDescendantGroups(branch.filterGroupId, stepFilterGroups));
        const branchFilterGroupIds = new Set(branchFilterGroups.map((g)=>g.id));
        const branchFilters = resolvedFilters.filter((filter)=>branchFilterGroupIds.has(filter.stepFilterGroupId));
        return (0, _evaluatefilterconditionsutil.evaluateFilterConditions)({
            filterGroups: branchFilterGroups,
            filters: branchFilters
        });
    });
    if (!(0, _utils.isDefined)(matchingBranch)) {
        throw new _workflowstepexecutorexception.WorkflowStepExecutorException('No matching branch found in if-else action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INTERNAL_ERROR);
    }
    return matchingBranch;
};

//# sourceMappingURL=find-matching-branch.util.js.map