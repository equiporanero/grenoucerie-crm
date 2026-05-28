"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get generateColumnDefinitions () {
        return generateColumnDefinitions;
    },
    get generateCompositeColumnDefinition () {
        return generateCompositeColumnDefinition;
    }
});
const _types = require("twenty-shared/types");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _computecolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _getcompositetypeorthrowutil = require("../../../../metadata-modules/field-metadata/utils/get-composite-type-or-throw.util");
const _iscompositeflatfieldmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/is-composite-flat-field-metadata.util");
const _isflatfieldmetadataoftypeutil = require("../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _computepostgresenumnameutil = require("../../utils/compute-postgres-enum-name.util");
const _serializedefaultvalueutil = require("../../workspace-migration-builder/utils/serialize-default-value.util");
const _workspacemigrationactionexecutionexception = require("../exceptions/workspace-migration-action-execution.exception");
const _fieldmetadatatypetocolumntypeutil = require("./field-metadata-type-to-column-type.util");
const _getworkspaceschemacontextformigrationutil = require("./get-workspace-schema-context-for-migration.util");
const _nullifyemptycompositedefaultvalueutil = require("../../../../metadata-modules/flat-field-metadata/utils/nullify-empty-composite-default-value.util");
const generateCompositeColumnDefinition = ({ compositeProperty, parentFlatFieldMetadata, flatObjectMetadata, workspaceId })=>{
    const { tableName, schemaName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
        workspaceId,
        objectMetadata: flatObjectMetadata
    });
    if (compositeProperty.type === _types.FieldMetadataType.RELATION || compositeProperty.type === _types.FieldMetadataType.MORPH_RELATION) {
        throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
            message: `Relation type not supported for composite columns`,
            code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.UNSUPPORTED_COMPOSITE_COLUMN_TYPE
        });
    }
    const columnName = (0, _computecolumnnameutil.computeCompositeColumnName)(parentFlatFieldMetadata.name, compositeProperty);
    const normalizedDefaultValue = (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
        defaultValue: parentFlatFieldMetadata.defaultValue,
        fieldType: parentFlatFieldMetadata.type
    });
    const defaultValue = normalizedDefaultValue?.[compositeProperty.name];
    const columnType = (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(compositeProperty.type);
    const serializedDefaultValue = (0, _serializedefaultvalueutil.serializeDefaultValue)({
        columnName,
        schemaName,
        tableName,
        columnType: columnType,
        defaultValue
    });
    const isArrayFlag = compositeProperty.type === _types.FieldMetadataType.ARRAY || compositeProperty.type === _types.FieldMetadataType.MULTI_SELECT || Boolean(compositeProperty.isArray);
    const definition = {
        name: columnName,
        type: columnType === 'enum' ? `"${schemaName}"."${(0, _computepostgresenumnameutil.computePostgresEnumName)({
            tableName,
            columnName
        })}"` : columnType,
        isNullable: parentFlatFieldMetadata.isNullable || !compositeProperty.isRequired,
        default: serializedDefaultValue,
        isArray: isArrayFlag,
        isPrimary: false
    };
    return definition;
};
const generateTsVectorColumnDefinition = (flatFieldMetadata)=>{
    const columnName = (0, _computecolumnnameutil.computeColumnName)(flatFieldMetadata.name);
    return {
        name: columnName,
        type: (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(flatFieldMetadata.type),
        isNullable: true,
        isArray: false,
        default: null,
        asExpression: flatFieldMetadata.settings?.asExpression ?? undefined,
        generatedType: flatFieldMetadata.settings?.generatedType ?? undefined,
        isPrimary: false
    };
};
const generateRelationColumnDefinition = (flatFieldMetadata)=>{
    if (flatFieldMetadata.settings?.relationType !== _types.RelationType.MANY_TO_ONE) {
        return null;
    }
    const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
        name: flatFieldMetadata.name
    });
    return {
        name: joinColumnName,
        type: (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(_types.FieldMetadataType.UUID),
        isNullable: true,
        isArray: false,
        default: null,
        isPrimary: false
    };
};
const generateColumnDefinition = ({ flatFieldMetadata, schemaName, tableName })=>{
    const columnName = (0, _computecolumnnameutil.computeColumnName)(flatFieldMetadata.name);
    const columnType = (0, _fieldmetadatatypetocolumntypeutil.fieldMetadataTypeToColumnType)(flatFieldMetadata.type);
    const serializedDefaultValue = (0, _serializedefaultvalueutil.serializeDefaultValue)({
        columnName,
        schemaName,
        tableName,
        columnType,
        defaultValue: flatFieldMetadata.defaultValue
    });
    return {
        name: columnName,
        type: columnType === 'enum' ? `"${schemaName}"."${(0, _computepostgresenumnameutil.computePostgresEnumName)({
            tableName,
            columnName
        })}"` : columnType,
        isNullable: flatFieldMetadata.isNullable ?? true,
        isArray: flatFieldMetadata.type === _types.FieldMetadataType.ARRAY || flatFieldMetadata.type === _types.FieldMetadataType.MULTI_SELECT,
        default: serializedDefaultValue,
        isPrimary: flatFieldMetadata.name === 'id'
    };
};
const generateColumnDefinitions = ({ flatFieldMetadata, flatObjectMetadata, workspaceId })=>{
    const { tableName, schemaName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
        workspaceId,
        objectMetadata: flatObjectMetadata
    });
    if ((0, _iscompositeflatfieldmetadatautil.isCompositeFlatFieldMetadata)(flatFieldMetadata)) {
        const compositeType = (0, _getcompositetypeorthrowutil.getCompositeTypeOrThrow)(flatFieldMetadata.type);
        return compositeType.properties.map((property)=>generateCompositeColumnDefinition({
                compositeProperty: property,
                parentFlatFieldMetadata: flatFieldMetadata,
                flatObjectMetadata,
                workspaceId
            }));
    }
    if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(flatFieldMetadata, _types.FieldMetadataType.TS_VECTOR)) {
        return [
            generateTsVectorColumnDefinition(flatFieldMetadata)
        ];
    }
    if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(flatFieldMetadata)) {
        const relationColumn = generateRelationColumnDefinition(flatFieldMetadata);
        return relationColumn ? [
            relationColumn
        ] : [];
    }
    return [
        generateColumnDefinition({
            flatFieldMetadata,
            tableName,
            schemaName
        })
    ];
};

//# sourceMappingURL=generate-column-definitions.util.js.map