"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup", {
    enumerable: true,
    get: function() {
        return fromUpdateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup;
    }
});
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromUpdateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup = ({ input, existingGroup, flatRowLevelPermissionPredicateGroupMaps })=>{
    const { parentRowLevelPermissionPredicateGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'rowLevelPermissionPredicateGroup',
        foreignKeyValues: {
            parentRowLevelPermissionPredicateGroupId: input.parentRowLevelPermissionPredicateGroupId
        },
        flatEntityMaps: {
            flatRowLevelPermissionPredicateGroupMaps
        }
    });
    return {
        ...existingGroup,
        logicalOperator: input.logicalOperator,
        parentRowLevelPermissionPredicateGroupId: input.parentRowLevelPermissionPredicateGroupId ?? null,
        parentRowLevelPermissionPredicateGroupUniversalIdentifier,
        positionInRowLevelPermissionPredicateGroup: input.positionInRowLevelPermissionPredicateGroup ?? null,
        updatedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-update-row-level-permission-predicate-group-input-to-flat-row-level-permission-predicate-group.util.js.map