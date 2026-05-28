"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getShouldRecurseIntoRelation", {
    enumerable: true,
    get: function() {
        return getShouldRecurseIntoRelation;
    }
});
const _utils = require("twenty-shared/utils");
const _maxdepthconstant = require("../../../rest/input-request-parsers/constants/max-depth.constant");
const getShouldRecurseIntoRelation = ({ depth, flatField })=>{
    const flatFieldIsJoinColumn = (0, _utils.isDefined)(flatField.settings) && 'junctionTargetFieldId' in flatField.settings;
    // TODO: refactor this when we remove hard-coded activity relations
    const flatFieldIsActivityTarget = flatField.name === 'noteTargets' || flatField.name === 'taskTargets';
    const shouldGoOneLevelDeeper = depth === _maxdepthconstant.MAX_DEPTH && (0, _utils.isDefined)(flatField.relationTargetObjectMetadataId);
    const shouldRecurseIntoRelation = shouldGoOneLevelDeeper || flatFieldIsActivityTarget || flatFieldIsJoinColumn;
    return shouldRecurseIntoRelation;
};

//# sourceMappingURL=get-should-recurse-into-relation.js.map