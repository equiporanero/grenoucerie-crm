"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate", {
    enumerable: true,
    get: function() {
        return fromUpdateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate;
    }
});
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromUpdateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate = ({ input, existingPredicate, flatFieldMetadataMaps, flatRowLevelPermissionPredicateGroupMaps })=>{
    const { fieldMetadataUniversalIdentifier, rowLevelPermissionPredicateGroupUniversalIdentifier, workspaceMemberFieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'rowLevelPermissionPredicate',
        foreignKeyValues: {
            fieldMetadataId: input.fieldMetadataId,
            rowLevelPermissionPredicateGroupId: input.rowLevelPermissionPredicateGroupId,
            workspaceMemberFieldMetadataId: input.workspaceMemberFieldMetadataId
        },
        flatEntityMaps: {
            flatFieldMetadataMaps,
            flatRowLevelPermissionPredicateGroupMaps
        }
    });
    return {
        ...existingPredicate,
        fieldMetadataId: input.fieldMetadataId,
        fieldMetadataUniversalIdentifier,
        operand: input.operand,
        value: input.value ?? null,
        subFieldName: input.subFieldName ?? null,
        workspaceMemberFieldMetadataId: input.workspaceMemberFieldMetadataId ?? null,
        workspaceMemberFieldMetadataUniversalIdentifier,
        workspaceMemberSubFieldName: input.workspaceMemberSubFieldName ?? null,
        rowLevelPermissionPredicateGroupId: input.rowLevelPermissionPredicateGroupId ?? null,
        rowLevelPermissionPredicateGroupUniversalIdentifier,
        positionInRowLevelPermissionPredicateGroup: input.positionInRowLevelPermissionPredicateGroup ?? null,
        updatedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-update-row-level-permission-predicate-input-to-flat-row-level-permission-predicate.util.js.map