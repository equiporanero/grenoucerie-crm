"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractObjectSingularNameFromTargetColumnName", {
    enumerable: true,
    get: function() {
        return extractObjectSingularNameFromTargetColumnName;
    }
});
const ID_SUFFIX = 'Id';
const TARGET_PREFIX = 'target';
const extractObjectSingularNameFromTargetColumnName = (targetColumnName)=>{
    let result = targetColumnName;
    if (result.endsWith(ID_SUFFIX)) {
        result = result.slice(0, -ID_SUFFIX.length);
    }
    if (result.startsWith(TARGET_PREFIX) && result.length > TARGET_PREFIX.length) {
        result = result.charAt(TARGET_PREFIX.length).toLowerCase() + result.slice(TARGET_PREFIX.length + 1);
    }
    return result;
};

//# sourceMappingURL=extract-object-singular-name-from-target-column-name.util.js.map