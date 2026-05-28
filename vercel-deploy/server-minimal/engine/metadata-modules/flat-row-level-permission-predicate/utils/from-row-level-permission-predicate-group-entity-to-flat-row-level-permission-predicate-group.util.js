/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromRowLevelPermissionPredicateGroupEntityToFlatRowLevelPermissionPredicateGroup", {
    enumerable: true,
    get: function() {
        return fromRowLevelPermissionPredicateGroupEntityToFlatRowLevelPermissionPredicateGroup;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _rowlevelpermissionpredicategroupentityrelationpropertiesconstant = require("../constants/row-level-permission-predicate-group-entity-relation-properties.constant");
const fromRowLevelPermissionPredicateGroupEntityToFlatRowLevelPermissionPredicateGroup = ({ entity: rowLevelPermissionPredicateGroupEntity, applicationIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, roleIdToUniversalIdentifierMap, rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap })=>{
    const rowLevelPermissionPredicateGroupEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(rowLevelPermissionPredicateGroupEntity, [
        ..._rowlevelpermissionpredicategroupentityrelationpropertiesconstant.ROW_LEVEL_PERMISSION_PREDICATE_GROUP_ENTITY_RELATION_PROPERTIES
    ]);
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateGroupEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${rowLevelPermissionPredicateGroupEntity.applicationId} not found for rowLevelPermissionPredicateGroup ${rowLevelPermissionPredicateGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateGroupEntity.objectMetadataId);
    if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${rowLevelPermissionPredicateGroupEntity.objectMetadataId} not found for rowLevelPermissionPredicateGroup ${rowLevelPermissionPredicateGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const roleUniversalIdentifier = roleIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateGroupEntity.roleId);
    if (!(0, _utils.isDefined)(roleUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Role with id ${rowLevelPermissionPredicateGroupEntity.roleId} not found for rowLevelPermissionPredicateGroup ${rowLevelPermissionPredicateGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let parentRowLevelPermissionPredicateGroupUniversalIdentifier = null;
    if ((0, _utils.isDefined)(rowLevelPermissionPredicateGroupEntity.parentRowLevelPermissionPredicateGroupId)) {
        parentRowLevelPermissionPredicateGroupUniversalIdentifier = rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateGroupEntity.parentRowLevelPermissionPredicateGroupId) ?? null;
        if (!(0, _utils.isDefined)(parentRowLevelPermissionPredicateGroupUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`RowLevelPermissionPredicateGroup with id ${rowLevelPermissionPredicateGroupEntity.parentRowLevelPermissionPredicateGroupId} not found for rowLevelPermissionPredicateGroup ${rowLevelPermissionPredicateGroupEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    return {
        ...rowLevelPermissionPredicateGroupEntityWithoutRelations,
        createdAt: rowLevelPermissionPredicateGroupEntity.createdAt.toISOString(),
        updatedAt: rowLevelPermissionPredicateGroupEntity.updatedAt.toISOString(),
        deletedAt: rowLevelPermissionPredicateGroupEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: rowLevelPermissionPredicateGroupEntityWithoutRelations.universalIdentifier,
        childRowLevelPermissionPredicateGroupIds: (rowLevelPermissionPredicateGroupEntity.childRowLevelPermissionPredicateGroups ?? []).map(({ id })=>id),
        rowLevelPermissionPredicateIds: (rowLevelPermissionPredicateGroupEntity.rowLevelPermissionPredicates ?? []).map(({ id })=>id),
        applicationUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        roleUniversalIdentifier,
        parentRowLevelPermissionPredicateGroupUniversalIdentifier,
        childRowLevelPermissionPredicateGroupUniversalIdentifiers: (rowLevelPermissionPredicateGroupEntity.childRowLevelPermissionPredicateGroups ?? []).map(({ universalIdentifier })=>universalIdentifier),
        rowLevelPermissionPredicateUniversalIdentifiers: (rowLevelPermissionPredicateGroupEntity.rowLevelPermissionPredicates ?? []).map(({ universalIdentifier })=>universalIdentifier)
    };
};

//# sourceMappingURL=from-row-level-permission-predicate-group-entity-to-flat-row-level-permission-predicate-group.util.js.map