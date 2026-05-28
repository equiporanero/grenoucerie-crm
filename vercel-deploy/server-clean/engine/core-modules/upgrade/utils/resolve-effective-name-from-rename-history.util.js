"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveEffectiveNameFromRenameHistory", {
    enumerable: true,
    get: function() {
        return resolveEffectiveNameFromRenameHistory;
    }
});
const resolveEffectiveNameFromRenameHistory = ({ currentName, history, isStepApplied })=>{
    for (const entry of history){
        if (!isStepApplied(entry.upgradeCommandName)) {
            return entry.previousName;
        }
    }
    return currentName;
};

//# sourceMappingURL=resolve-effective-name-from-rename-history.util.js.map