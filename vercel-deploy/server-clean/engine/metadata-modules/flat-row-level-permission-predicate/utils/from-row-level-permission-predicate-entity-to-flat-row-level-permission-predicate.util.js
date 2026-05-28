/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromRowLevelPermissionPredicateEntityToFlatRowLevelPermissionPredicate", {
    enumerable: true,
    get: function() {
        return fromRowLevelPermissionPredicateEntityToFlatRowLevelPermissionPredicate;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _rowlevelpermissionpredicateentityrelationpropertiesconstant = require("../constants/row-level-permission-predicate-entity-relation-properties.constant");
const fromRowLevelPermissionPredicateEntityToFlatRowLevelPermissionPredicate = ({ entity: rowLevelPermissionPredicateEntity, applicationIdToUniversalIdentifierMap, fieldMetadataIdToUniversalIdentifierMap, objectMetadataIdToUniversalIdentifierMap, roleIdToUniversalIdentifierMap, rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap })=>{
    const rowLevelPermissionPredicateEntityWithoutRelations = (0, _utils.removePropertiesFromRecord)(rowLevelPermissionPredicateEntity, [
        ..._rowlevelpermissionpredicateentityrelationpropertiesconstant.ROW_LEVEL_PERMISSION_PREDICATE_ENTITY_RELATION_PROPERTIES
    ]);
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${rowLevelPermissionPredicateEntity.applicationId} not found for rowLevelPermissionPredicate ${rowLevelPermissionPredicateEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const fieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateEntity.fieldMetadataId);
    if (!(0, _utils.isDefined)(fieldMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${rowLevelPermissionPredicateEntity.fieldMetadataId} not found for rowLevelPermissionPredicate ${rowLevelPermissionPredicateEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const objectMetadataUniversalIdentifier = objectMetadataIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateEntity.objectMetadataId);
    if (!(0, _utils.isDefined)(objectMetadataUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`ObjectMetadata with id ${rowLevelPermissionPredicateEntity.objectMetadataId} not found for rowLevelPermissionPredicate ${rowLevelPermissionPredicateEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const roleUniversalIdentifier = roleIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateEntity.roleId);
    if (!(0, _utils.isDefined)(roleUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Role with id ${rowLevelPermissionPredicateEntity.roleId} not found for rowLevelPermissionPredicate ${rowLevelPermissionPredicateEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    let workspaceMemberFieldMetadataUniversalIdentifier = null;
    if ((0, _utils.isDefined)(rowLevelPermissionPredicateEntity.workspaceMemberFieldMetadataId)) {
        workspaceMemberFieldMetadataUniversalIdentifier = fieldMetadataIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateEntity.workspaceMemberFieldMetadataId) ?? null;
        if (!(0, _utils.isDefined)(workspaceMemberFieldMetadataUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`FieldMetadata with id ${rowLevelPermissionPredicateEntity.workspaceMemberFieldMetadataId} not found for rowLevelPermissionPredicate ${rowLevelPermissionPredicateEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    let rowLevelPermissionPredicateGroupUniversalIdentifier = null;
    if ((0, _utils.isDefined)(rowLevelPermissionPredicateEntity.rowLevelPermissionPredicateGroupId)) {
        rowLevelPermissionPredicateGroupUniversalIdentifier = rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap.get(rowLevelPermissionPredicateEntity.rowLevelPermissionPredicateGroupId) ?? null;
        if (!(0, _utils.isDefined)(rowLevelPermissionPredicateGroupUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`RowLevelPermissionPredicateGroup with id ${rowLevelPermissionPredicateEntity.rowLevelPermissionPredicateGroupId} not found for rowLevelPermissionPredicate ${rowLevelPermissionPredicateEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
    }
    return {
        ...rowLevelPermissionPredicateEntityWithoutRelations,
        createdAt: rowLevelPermissionPredicateEntity.createdAt.toISOString(),
        updatedAt: rowLevelPermissionPredicateEntity.updatedAt.toISOString(),
        deletedAt: rowLevelPermissionPredicateEntity.deletedAt?.toISOString() ?? null,
        universalIdentifier: rowLevelPermissionPredicateEntityWithoutRelations.universalIdentifier,
        applicationUniversalIdentifier,
        fieldMetadataUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        roleUniversalIdentifier,
        workspaceMemberFieldMetadataUniversalIdentifier,
        rowLevelPermissionPredicateGroupUniversalIdentifier
    };
};

//# sourceMappingURL=from-row-level-permission-predicate-entity-to-flat-row-level-permission-predicate.util.js.map