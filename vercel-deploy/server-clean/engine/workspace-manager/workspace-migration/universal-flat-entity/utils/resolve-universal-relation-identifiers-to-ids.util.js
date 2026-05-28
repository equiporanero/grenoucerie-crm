"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveUniversalRelationIdentifiersToIds", {
    enumerable: true,
    get: function() {
        return resolveUniversalRelationIdentifiersToIds;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _allmanytoonemetadatarelationsconstant = require("../../../../metadata-modules/flat-entity/constant/all-many-to-one-metadata-relations.constant");
const _flatentitymapsexception = require("../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const resolveUniversalRelationIdentifiersToIds = ({ metadataName, universalForeignKeyValues, flatEntityMaps })=>{
    const relationEntries = _allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName];
    const result = {};
    for (const relationPropertyName of Object.keys(relationEntries)){
        const relationEntry = relationEntries[relationPropertyName];
        if (!(0, _utils.isDefined)(relationEntry)) {
            continue;
        }
        const { foreignKey, universalForeignKey, metadataName: targetMetadataName, isNullable } = relationEntry;
        if (!Object.prototype.hasOwnProperty.call(universalForeignKeyValues, universalForeignKey)) {
            continue;
        }
        const universalIdentifierValue = universalForeignKeyValues[universalForeignKey];
        const mapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(targetMetadataName);
        const targetFlatEntityMaps = flatEntityMaps[mapsKey];
        if (isNullable && !(0, _utils.isDefined)(universalIdentifierValue)) {
            result[foreignKey] = null;
            continue;
        }
        const targetEntity = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: targetFlatEntityMaps,
            universalIdentifier: universalIdentifierValue
        });
        if (!(0, _utils.isDefined)(targetEntity)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(_core.i18n._(/*i18n*/ {
                id: "qs7GyL",
                message: "Could not find {targetMetadataName} for given {universalForeignKey}",
                values: {
                    targetMetadataName: targetMetadataName,
                    universalForeignKey: universalForeignKey
                }
            }), _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
        result[foreignKey] = targetEntity.id;
    }
    return result;
};

//# sourceMappingURL=resolve-universal-relation-identifiers-to-ids.util.js.map