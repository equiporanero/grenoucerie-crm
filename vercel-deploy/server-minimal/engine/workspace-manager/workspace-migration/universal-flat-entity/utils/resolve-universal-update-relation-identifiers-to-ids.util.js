"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveUniversalUpdateRelationIdentifiersToIds", {
    enumerable: true,
    get: function() {
        return resolveUniversalUpdateRelationIdentifiersToIds;
    }
});
const _utils = require("twenty-shared/utils");
const _allmanytoonemetadatarelationsconstant = require("../../../../metadata-modules/flat-entity/constant/all-many-to-one-metadata-relations.constant");
const _flatentitymapsexception = require("../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const resolveUniversalUpdateRelationIdentifiersToIds = ({ metadataName, universalUpdate, allFlatEntityMaps })=>{
    const relationEntries = _allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName];
    const result = {
        ...universalUpdate
    };
    for (const relationPropertyName of Object.keys(relationEntries)){
        const relation = relationEntries[relationPropertyName];
        if (!(0, _utils.isDefined)(relation)) {
            continue;
        }
        const { foreignKey, universalForeignKey, metadataName: targetMetadataName } = relation;
        if (!Object.prototype.hasOwnProperty.call(result, universalForeignKey)) {
            continue;
        }
        const universalIdentifierValue = result[universalForeignKey];
        delete result[universalForeignKey];
        if (!(0, _utils.isDefined)(universalIdentifierValue)) {
            if (universalIdentifierValue === null) {
                result[foreignKey] = null;
            }
            continue;
        }
        const mapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(targetMetadataName);
        const targetFlatEntityMaps = allFlatEntityMaps[mapsKey];
        const targetEntity = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: targetFlatEntityMaps,
            universalIdentifier: universalIdentifierValue
        });
        if (!(0, _utils.isDefined)(targetEntity)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(`Could not resolve ${universalForeignKey} to ${foreignKey}: no ${targetMetadataName} found for universal identifier ${universalIdentifierValue}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
        result[foreignKey] = targetEntity.id;
    }
    return result;
};

//# sourceMappingURL=resolve-universal-update-relation-identifiers-to-ids.util.js.map