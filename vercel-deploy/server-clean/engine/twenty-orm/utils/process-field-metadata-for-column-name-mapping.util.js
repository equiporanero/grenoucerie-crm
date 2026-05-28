"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "processFieldMetadataForColumnNameMapping", {
    enumerable: true,
    get: function() {
        return processFieldMetadataForColumnNameMapping;
    }
});
const _types = require("twenty-shared/types");
const _relationtypeinterface = require("../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _extractgraphqlrelationfieldnamesutil = require("../../api/graphql/workspace-schema-builder/utils/extract-graphql-relation-field-names.util");
const _computecolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
function processFieldMetadataForColumnNameMapping(flatObjectMetadata, flatFieldMetadataMaps, processor) {
    for (const fieldMetadataId of flatObjectMetadata.fieldIds){
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityId: fieldMetadataId
        });
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
            const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
            if (!compositeType) {
                throw new _permissionsexception.PermissionsException(`Composite type not found for field metadata type ${fieldMetadata.type}`, _permissionsexception.PermissionsExceptionCode.COMPOSITE_TYPE_NOT_FOUND);
            }
            processor.processCompositeField({
                fieldMetadataId,
                fieldMetadata,
                compositeType
            });
        } else {
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
                const fieldMetadataSettings = fieldMetadata.settings;
                if (fieldMetadataSettings?.relationType === _relationtypeinterface.RelationType.ONE_TO_MANY) {
                    continue;
                }
                const { joinColumnName, fieldMetadataName } = (0, _extractgraphqlrelationfieldnamesutil.extractGraphQLRelationFieldNames)(fieldMetadata);
                processor.processRelationField({
                    fieldMetadataId,
                    fieldMetadata,
                    joinColumnName,
                    connectFieldName: fieldMetadataName
                });
            } else {
                const columnName = (0, _computecolumnnameutil.computeColumnName)(fieldMetadata);
                processor.processSimpleField({
                    fieldMetadataId,
                    fieldMetadata,
                    columnName
                });
            }
        }
    }
}

//# sourceMappingURL=process-field-metadata-for-column-name-mapping.util.js.map