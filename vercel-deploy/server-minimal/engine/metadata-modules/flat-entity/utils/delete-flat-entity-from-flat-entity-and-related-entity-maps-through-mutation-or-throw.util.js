"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteFlatEntityFromFlatEntityAndRelatedEntityMapsThroughMutationOrThrow", {
    enumerable: true,
    get: function() {
        return deleteFlatEntityFromFlatEntityAndRelatedEntityMapsThroughMutationOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _allmanytoonemetadatarelationsconstant = require("../constant/all-many-to-one-metadata-relations.constant");
const _allonetomanymetadatarelationsconstant = require("../constant/all-one-to-many-metadata-relations.constant");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
const _findflatentitybyidinflatentitymapsutil = require("./find-flat-entity-by-id-in-flat-entity-maps.util");
const _getmetadataflatentitymapskeyutil = require("./get-metadata-flat-entity-maps-key.util");
const _deleteuniversalflatentityfromuniversalflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/universal-flat-entity/utils/delete-universal-flat-entity-from-universal-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _replaceflatentityinflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/replace-flat-entity-in-flat-entity-maps-through-mutation-or-throw.util");
const deleteFlatEntityFromFlatEntityAndRelatedEntityMapsThroughMutationOrThrow = ({ metadataName, flatEntity, flatEntityAndRelatedMapsToMutate })=>{
    (0, _deleteuniversalflatentityfromuniversalflatentityandrelatedentitymapsthroughmutationorthrowutil.deleteUniversalFlatEntityFromUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
        metadataName,
        universalFlatEntity: flatEntity,
        universalFlatEntityAndRelatedMapsToMutate: flatEntityAndRelatedMapsToMutate
    });
    const manyToOneRelations = _allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName];
    for (const relationPropertyName of Object.keys(manyToOneRelations)){
        const relation = manyToOneRelations[relationPropertyName];
        if (!(0, _utils.isDefined)(relation)) {
            continue;
        }
        const { metadataName: relatedMetadataName, foreignKey, inverseOneToManyProperty } = relation;
        if (!(0, _utils.isDefined)(inverseOneToManyProperty)) {
            continue;
        }
        const oneToManyRelations = _allonetomanymetadatarelationsconstant.ALL_ONE_TO_MANY_METADATA_RELATIONS[relatedMetadataName];
        const inverseRelation = oneToManyRelations[inverseOneToManyProperty];
        if (!(0, _utils.isDefined)(inverseRelation)) {
            continue;
        }
        const { flatEntityForeignKeyAggregator } = inverseRelation;
        const relatedFlatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(relatedMetadataName);
        const relatedFlatEntityMetadataMaps = flatEntityAndRelatedMapsToMutate[relatedFlatEntityMapsKey];
        const flatEntityRelatedEntityForeignKeyValue = flatEntity[foreignKey];
        if (!(0, _utils.isDefined)(flatEntityRelatedEntityForeignKeyValue)) {
            continue;
        }
        const relatedFlatEntity = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: flatEntityRelatedEntityForeignKeyValue,
            flatEntityMaps: relatedFlatEntityMetadataMaps
        });
        if (!(0, _utils.isDefined)(relatedFlatEntity)) {
            continue;
        }
        if (!Object.prototype.hasOwnProperty.call(relatedFlatEntity, flatEntityForeignKeyAggregator)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`Should never occur, invalid flat entity typing. flat ${relatedMetadataName} should contain ${flatEntityForeignKeyAggregator}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_MALFORMED);
        }
        const updatedRelatedEntity = {
            ...relatedFlatEntity,
            [flatEntityForeignKeyAggregator]: (relatedFlatEntity[flatEntityForeignKeyAggregator] ?? []).filter((id)=>id !== flatEntity.id)
        };
        (0, _replaceflatentityinflatentitymapsthroughmutationorthrowutil.replaceFlatEntityInFlatEntityMapsThroughMutationOrThrow)({
            flatEntity: updatedRelatedEntity,
            flatEntityMapsToMutate: relatedFlatEntityMetadataMaps
        });
    }
};

//# sourceMappingURL=delete-flat-entity-from-flat-entity-and-related-entity-maps-through-mutation-or-throw.util.js.map