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
    get EnumOperation () {
        return EnumOperation;
    },
    get collectEnumOperationsForField () {
        return collectEnumOperationsForField;
    },
    get collectEnumOperationsForObject () {
        return collectEnumOperationsForObject;
    },
    get executeBatchEnumOperations () {
        return executeBatchEnumOperations;
    }
});
const _utils = require("twenty-shared/utils");
const _computecolumnnameutil = require("../../../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _getcompositetypeorthrowutil = require("../../../../metadata-modules/field-metadata/utils/get-composite-type-or-throw.util");
const _isenumfieldmetadatatypeutil = require("../../../../metadata-modules/field-metadata/utils/is-enum-field-metadata-type.util");
const _iscompositeflatfieldmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/is-composite-flat-field-metadata.util");
const _isenumflatfieldmetadatautil = require("../../../../metadata-modules/flat-field-metadata/utils/is-enum-flat-field-metadata.util");
const _computepostgresenumnameutil = require("../../utils/compute-postgres-enum-name.util");
const _workspacemigrationactionexecutionexception = require("../exceptions/workspace-migration-action-execution.exception");
var EnumOperation = /*#__PURE__*/ function(EnumOperation) {
    EnumOperation["CREATE"] = "create";
    EnumOperation["DROP"] = "drop";
    EnumOperation["RENAME"] = "rename";
    return EnumOperation;
}({});
const collectEnumOperationsForBasicEnumField = ({ flatFieldMetadata, tableName, operation, options })=>{
    const enumName = (0, _computepostgresenumnameutil.computePostgresEnumName)({
        tableName,
        columnName: flatFieldMetadata.name
    });
    switch(operation){
        case "create":
            return [
                {
                    operation: "create",
                    enumName,
                    values: flatFieldMetadata.options?.map((option)=>option.value) ?? []
                }
            ];
        case "drop":
            return [
                {
                    operation: "drop",
                    enumName
                }
            ];
        case "rename":
            {
                const newEnumName = (0, _computepostgresenumnameutil.computePostgresEnumName)({
                    tableName: options?.newTableName ?? tableName,
                    columnName: options?.newFieldName ?? flatFieldMetadata.name
                });
                return [
                    {
                        operation: "rename",
                        fromName: enumName,
                        toName: newEnumName
                    }
                ];
            }
        default:
            return (0, _utils.assertUnreachable)(operation, 'Unsupported enum operation');
    }
};
const collectEnumOperationsForCompositeField = ({ flatFieldMetadata, tableName, operation, options })=>{
    const compositeType = (0, _getcompositetypeorthrowutil.getCompositeTypeOrThrow)(flatFieldMetadata.type);
    return compositeType.properties.filter((property)=>(0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(property.type)).map((property)=>{
        const columnName = (0, _computecolumnnameutil.computeCompositeColumnName)(flatFieldMetadata.name, property);
        const enumName = (0, _computepostgresenumnameutil.computePostgresEnumName)({
            tableName,
            columnName
        });
        switch(operation){
            case "create":
                return {
                    operation: "create",
                    enumName,
                    values: property.options?.map((option)=>option.value) ?? []
                };
            case "drop":
                return {
                    operation: "drop",
                    enumName
                };
            case "rename":
                {
                    const newOrExistingTableName = options?.newTableName ?? tableName;
                    const newOrExistingColumnName = (0, _computecolumnnameutil.computeCompositeColumnName)(options?.newFieldName ?? flatFieldMetadata.name, property);
                    const newEnumName = (0, _computepostgresenumnameutil.computePostgresEnumName)({
                        tableName: newOrExistingTableName,
                        columnName: newOrExistingColumnName
                    });
                    return {
                        operation: "rename",
                        fromName: enumName,
                        toName: newEnumName
                    };
                }
            default:
                return (0, _utils.assertUnreachable)(operation, 'Unsupported enum operation');
        }
    });
};
const collectEnumOperationsForField = ({ flatFieldMetadata, tableName, operation, options })=>{
    if ((0, _iscompositeflatfieldmetadatautil.isCompositeFlatFieldMetadata)(flatFieldMetadata)) {
        return collectEnumOperationsForCompositeField({
            flatFieldMetadata,
            tableName,
            operation,
            options
        });
    }
    if ((0, _isenumflatfieldmetadatautil.isEnumFlatFieldMetadata)(flatFieldMetadata)) {
        return collectEnumOperationsForBasicEnumField({
            flatFieldMetadata,
            tableName,
            operation,
            options
        });
    }
    return [];
};
const collectEnumOperationsForObject = ({ tableName, operation, flatFieldMetadatas, options })=>{
    return flatFieldMetadatas.flatMap((flatFieldMetadata)=>collectEnumOperationsForField({
            flatFieldMetadata,
            tableName,
            operation,
            options
        }));
};
const executeBatchEnumOperations = async ({ enumOperations, queryRunner, schemaName, workspaceSchemaManagerService })=>{
    if (enumOperations.length === 0) {
        return;
    }
    try {
        const enumPromises = enumOperations.map((enumOp)=>{
            switch(enumOp.operation){
                case "create":
                    return workspaceSchemaManagerService.enumManager.createEnum({
                        queryRunner,
                        schemaName,
                        enumName: enumOp.enumName,
                        values: enumOp.values
                    });
                case "drop":
                    return workspaceSchemaManagerService.enumManager.dropEnum({
                        queryRunner,
                        schemaName,
                        enumName: enumOp.enumName
                    });
                case "rename":
                    return workspaceSchemaManagerService.enumManager.renameEnum({
                        queryRunner,
                        schemaName,
                        oldEnumName: enumOp.fromName,
                        newEnumName: enumOp.toName
                    });
                default:
                    return (0, _utils.assertUnreachable)(enumOp, 'Unsupported enum operation');
            }
        });
        await Promise.all(enumPromises);
    } catch (error) {
        throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
            message: `Failed to execute batch enum operations: ${error instanceof Error ? error.message : 'Unknown error'}`,
            code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.ENUM_OPERATION_FAILED
        });
    }
};

//# sourceMappingURL=workspace-schema-enum-operations.util.js.map