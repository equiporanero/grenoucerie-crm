"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findFlatRoleTargetFromForeignKey", {
    enumerable: true,
    get: function() {
        return findFlatRoleTargetFromForeignKey;
    }
});
const _utils = require("twenty-shared/utils");
const findFlatRoleTargetFromForeignKey = ({ flatRoleTargetMaps, targetMetadataForeignKey, targetId })=>{
    const allRoleTargets = Object.values(flatRoleTargetMaps.byUniversalIdentifier).filter(_utils.isDefined);
    return allRoleTargets.find((roleTarget)=>roleTarget[targetMetadataForeignKey] === targetId);
};

//# sourceMappingURL=find-flat-role-target-from-foreign-key.util.js.map