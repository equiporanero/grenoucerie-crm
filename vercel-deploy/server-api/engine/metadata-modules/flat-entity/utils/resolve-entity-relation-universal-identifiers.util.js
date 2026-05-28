"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveEntityRelationUniversalIdentifiers", {
    enumerable: true,
    get: function() {
        return resolveEntityRelationUniversalIdentifiers;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _allmanytoonemetadatarelationsconstant = require("../constant/all-many-to-one-metadata-relations.constant");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
const _getmetadataflatentitymapskeyutil = require("./get-metadata-flat-entity-maps-key.util");
const resolveEntityRelationUniversalIdentifiers = ({ metadataName, foreignKeyValues, flatEntityMaps })=>{
    const relationEntries = _allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName];
    const result = {};
    for (const relationPropertyName of Object.keys(relationEntries)){
        const relation = relationEntries[relationPropertyName];
        if (!(0, _utils.isDefined)(relation)) {
            continue;
        }
        const { foreignKey, metadataName: targetMetadataName, isNullable, universalForeignKey } = relation;
        if (!Object.prototype.hasOwnProperty.call(foreignKeyValues, foreignKey)) {
            continue;
        }
        const foreignKeyValue = foreignKeyValues[foreignKey];
        const mapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(targetMetadataName);
        const targetFlatEntityMaps = flatEntityMaps[mapsKey];
        if (isNullable && !(0, _utils.isDefined)(foreignKeyValue)) {
            result[universalForeignKey] = null;
            continue;
        }
        const resolvedUniversalIdentifier = targetFlatEntityMaps.universalIdentifierById[foreignKeyValue];
        if (!(0, _utils.isDefined)(resolvedUniversalIdentifier)) {
            throw new _flatentitymapsexception.FlatEntityMapsException(_core.i18n._(/*i18n*/ {
                id: "Fep47m",
                message: "Could not find {targetMetadataName} for given {foreignKey}",
                values: {
                    targetMetadataName: targetMetadataName,
                    foreignKey: foreignKey
                }
            }), _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND);
        }
        result[universalForeignKey] = resolvedUniversalIdentifier;
    }
    return result;
};

//# sourceMappingURL=resolve-entity-relation-universal-identifiers.util.js.map