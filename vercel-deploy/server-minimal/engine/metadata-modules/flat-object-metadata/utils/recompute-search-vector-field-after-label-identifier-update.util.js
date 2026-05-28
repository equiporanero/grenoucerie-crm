"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recomputeSearchVectorFieldAfterLabelIdentifierUpdate", {
    enumerable: true,
    get: function() {
        return recomputeSearchVectorFieldAfterLabelIdentifierUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _objectmetadataexception = require("../../object-metadata/object-metadata.exception");
const _searchvectorfieldconstants = require("../../search-field-metadata/constants/search-vector-field.constants");
const _gettsvectorcolumnexpressionutil = require("../../../workspace-manager/utils/get-ts-vector-column-expression.util");
const recomputeSearchVectorFieldAfterLabelIdentifierUpdate = ({ existingFlatObjectMetadata, flatFieldMetadataMaps, labelIdentifierFieldMetadataUniversalIdentifier })=>{
    const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityIds: existingFlatObjectMetadata.fieldIds
    });
    const searchVectorField = (0, _utils.findOrThrow)(objectFlatFieldMetadatas, (field)=>field.name === _searchvectorfieldconstants.SEARCH_VECTOR_FIELD.name);
    const newLabelIdentifierField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        flatEntityMaps: flatFieldMetadataMaps,
        universalIdentifier: labelIdentifierFieldMetadataUniversalIdentifier
    });
    if (!(0, _utils.isDefined)(newLabelIdentifierField)) {
        throw new _objectmetadataexception.ObjectMetadataException(`New label identifier field not found for object metadata`, _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT);
    }
    try {
        const newAsExpression = (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)([
            {
                name: newLabelIdentifierField.name,
                type: newLabelIdentifierField.type
            }
        ]);
        return {
            ...searchVectorField,
            universalSettings: {
                ...searchVectorField.universalSettings,
                asExpression: newAsExpression,
                generatedType: 'STORED'
            }
        };
    } catch  {
        throw new _objectmetadataexception.ObjectMetadataException(`Failed to compute search vector column expression for field ${newLabelIdentifierField.name}`, _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT);
    }
};

//# sourceMappingURL=recompute-search-vector-field-after-label-identifier-update.util.js.map