"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "handleLabelIdentifierChangesDuringFieldUpdate", {
    enumerable: true,
    get: function() {
        return handleLabelIdentifierChangesDuringFieldUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _searchvectorfieldconstants = require("../../search-field-metadata/constants/search-vector-field.constants");
const _gettsvectorcolumnexpressionutil = require("../../../workspace-manager/utils/get-ts-vector-column-expression.util");
const handleLabelIdentifierChangesDuringFieldUpdate = ({ fromFlatFieldMetadata, toFlatFieldMetadata, flatObjectMetadata, flatFieldMetadataMaps })=>{
    const hasNameChanged = fromFlatFieldMetadata.name !== toFlatFieldMetadata.name;
    if (!hasNameChanged) {
        return undefined;
    }
    const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityIds: flatObjectMetadata.fieldIds
    });
    const searchVectorField = (0, _utils.findOrThrow)(objectFlatFieldMetadatas, (field)=>field.name === _searchvectorfieldconstants.SEARCH_VECTOR_FIELD.name, new _fieldmetadataexception.FieldMetadataException(`Search vector field not found for object metadata ${flatObjectMetadata.id}`, _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND));
    try {
        const newAsExpression = (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)([
            {
                name: toFlatFieldMetadata.name,
                type: toFlatFieldMetadata.type
            }
        ]);
        return {
            ...searchVectorField,
            universalSettings: {
                ...searchVectorField.universalSettings,
                asExpression: newAsExpression
            }
        };
    } catch  {
        throw new _fieldmetadataexception.FieldMetadataException(`Failed to compute search vector column expression for field ${toFlatFieldMetadata.name}`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
    }
};

//# sourceMappingURL=handle-label-identifier-changes-during-field-update.util.js.map