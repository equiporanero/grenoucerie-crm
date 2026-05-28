"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addUniversalFlatEntityToUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow", {
    enumerable: true,
    get: function() {
        return addUniversalFlatEntityToUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _allmanytoonemetadatarelationsconstant = require("../../../../metadata-modules/flat-entity/constant/all-many-to-one-metadata-relations.constant");
const _allonetomanymetadatarelationsconstant = require("../../../../metadata-modules/flat-entity/constant/all-one-to-many-metadata-relations.constant");
const _flatentitymapsexception = require("../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil = require("./add-universal-flat-entity-to-universal-flat-entity-maps-through-mutation-or-throw.util");
const _replaceuniversalflatentityinuniversalflatentitymapsthroughmutationorthrowutil = require("./replace-universal-flat-entity-in-universal-flat-entity-maps-through-mutation-or-throw.util");
const addUniversalFlatEntityToUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow = ({ metadataName, universalFlatEntity, universalFlatEntityAndRelatedMapsToMutate })=>{
    const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName);
    (0, _adduniversalflatentitytouniversalflatentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityMapsThroughMutationOrThrow)({
        universalFlatEntity,
        universalFlatEntityMapsToMutate: universalFlatEntityAndRelatedMapsToMutate[flatEntityMapsKey]
    });
    const manyToOneRelations = _allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName];
    for (const relationPropertyName of Object.keys(manyToOneRelations)){
        const relation = manyToOneRelations[relationPropertyName];
        if (!(0, _utils.isDefined)(relation)) {
            continue;
        }
        const { metadataName: relatedMetadataName, inverseOneToManyProperty, universalForeignKey } = relation;
        if (!(0, _utils.isDefined)(inverseOneToManyProperty)) {
            continue;
        }
        const oneToManyRelations = _allonetomanymetadatarelationsconstant.ALL_ONE_TO_MANY_METADATA_RELATIONS[relatedMetadataName];
        const inverseRelation = oneToManyRelations[inverseOneToManyProperty];
        if (!(0, _utils.isDefined)(inverseRelation)) {
            continue;
        }
        const { universalFlatEntityForeignKeyAggregator } = inverseRelation;
        const relatedFlatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(relatedMetadataName);
        const relatedUniversalFlatEntityMaps = universalFlatEntityAndRelatedMapsToMutate[relatedFlatEntityMapsKey];
        const universalForeignKeyValue = universalFlatEntity[universalForeignKey];
        if (!(0, _utils.isDefined)(universalForeignKeyValue)) {
            continue;
        }
        const relatedUniversalFlatEntity = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: universalForeignKeyValue,
            flatEntityMaps: relatedUniversalFlatEntityMaps
        });
        if (!Object.prototype.hasOwnProperty.call(relatedUniversalFlatEntity, universalFlatEntityForeignKeyAggregator)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`Should never occur, invalid flat entity typing. flat ${relatedMetadataName} should contain ${universalFlatEntityForeignKeyAggregator}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_MALFORMED);
        }
        const updatedRelatedEntity = {
            ...relatedUniversalFlatEntity,
            [universalFlatEntityForeignKeyAggregator]: [
                ...relatedUniversalFlatEntity[universalFlatEntityForeignKeyAggregator] ?? [],
                universalFlatEntity.universalIdentifier
            ]
        };
        (0, _replaceuniversalflatentityinuniversalflatentitymapsthroughmutationorthrowutil.replaceUniversalFlatEntityInUniversalFlatEntityMapsThroughMutationOrThrow)({
            universalFlatEntity: updatedRelatedEntity,
            universalFlatEntityMapsToMutate: relatedUniversalFlatEntityMaps
        });
    }
};

//# sourceMappingURL=add-universal-flat-entity-to-universal-flat-entity-and-related-entity-maps-through-mutation-or-throw.util.js.map