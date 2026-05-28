"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate", {
    enumerable: true,
    get: function() {
        return fromCreateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate;
    }
});
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateRowLevelPermissionPredicateInputToFlatRowLevelPermissionPredicate = ({ input, roleId, objectMetadataId, workspaceId, roleUniversalIdentifier, objectMetadataUniversalIdentifier, flatApplication, flatFieldMetadataMaps, flatRowLevelPermissionPredicateGroupMaps })=>{
    const predicateId = input.id ?? (0, _uuid.v4)();
    const createdAt = new Date().toISOString();
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
        id: predicateId,
        workspaceId,
        roleId,
        roleUniversalIdentifier,
        objectMetadataId,
        objectMetadataUniversalIdentifier,
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
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: predicateId,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-row-level-permission-predicate-input-to-flat-row-level-permission-predicate.util.js.map