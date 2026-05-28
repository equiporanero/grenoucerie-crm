"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup", {
    enumerable: true,
    get: function() {
        return fromCreateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup;
    }
});
const _uuid = require("uuid");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const fromCreateRowLevelPermissionPredicateGroupInputToFlatRowLevelPermissionPredicateGroup = ({ input, roleId, workspaceId, roleUniversalIdentifier, flatApplication, flatObjectMetadataMaps, flatRowLevelPermissionPredicateGroupMaps })=>{
    const groupId = input.id ?? (0, _uuid.v4)();
    const createdAt = new Date().toISOString();
    const { objectMetadataUniversalIdentifier, parentRowLevelPermissionPredicateGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
        metadataName: 'rowLevelPermissionPredicateGroup',
        foreignKeyValues: {
            objectMetadataId: input.objectMetadataId,
            parentRowLevelPermissionPredicateGroupId: input.parentRowLevelPermissionPredicateGroupId
        },
        flatEntityMaps: {
            flatObjectMetadataMaps,
            flatRowLevelPermissionPredicateGroupMaps
        }
    });
    return {
        id: groupId,
        workspaceId,
        roleId,
        roleUniversalIdentifier,
        objectMetadataId: input.objectMetadataId,
        objectMetadataUniversalIdentifier,
        logicalOperator: input.logicalOperator,
        parentRowLevelPermissionPredicateGroupId: input.parentRowLevelPermissionPredicateGroupId ?? null,
        parentRowLevelPermissionPredicateGroupUniversalIdentifier,
        positionInRowLevelPermissionPredicateGroup: input.positionInRowLevelPermissionPredicateGroup ?? null,
        childRowLevelPermissionPredicateGroupIds: [],
        childRowLevelPermissionPredicateGroupUniversalIdentifiers: [],
        rowLevelPermissionPredicateIds: [],
        rowLevelPermissionPredicateUniversalIdentifiers: [],
        createdAt,
        updatedAt: createdAt,
        deletedAt: null,
        universalIdentifier: groupId,
        applicationId: flatApplication.id,
        applicationUniversalIdentifier: flatApplication.universalIdentifier
    };
};

//# sourceMappingURL=from-create-row-level-permission-predicate-group-input-to-flat-row-level-permission-predicate-group.util.js.map