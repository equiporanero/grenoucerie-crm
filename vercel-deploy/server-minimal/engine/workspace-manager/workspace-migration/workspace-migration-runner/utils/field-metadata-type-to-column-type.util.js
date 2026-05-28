"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fieldMetadataTypeToColumnType", {
    enumerable: true,
    get: function() {
        return fieldMetadataTypeToColumnType;
    }
});
const _types = require("twenty-shared/types");
const _workspacemigrationactionexecutionexception = require("../exceptions/workspace-migration-action-execution.exception");
const _istextcolumntypeutil = require("./is-text-column-type.util");
const fieldMetadataTypeToColumnType = (fieldMetadataType)=>{
    /**
   * Composite types are not implemented here, as they are flattened by their composite definitions.
   * See src/metadata/field-metadata/composite-types for more information.
   */ if ((0, _istextcolumntypeutil.isTextColumnType)(fieldMetadataType)) {
        return 'text';
    }
    switch(fieldMetadataType){
        case _types.FieldMetadataType.UUID:
            return 'uuid';
        case _types.FieldMetadataType.NUMERIC:
            return 'numeric';
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.POSITION:
            return 'float';
        case _types.FieldMetadataType.BOOLEAN:
            return 'boolean';
        case _types.FieldMetadataType.DATE_TIME:
            return 'timestamptz';
        case _types.FieldMetadataType.DATE:
            return 'date';
        case _types.FieldMetadataType.RATING:
        case _types.FieldMetadataType.SELECT:
        case _types.FieldMetadataType.MULTI_SELECT:
            return 'enum';
        case _types.FieldMetadataType.FILES:
        case _types.FieldMetadataType.RAW_JSON:
            return 'jsonb';
        case _types.FieldMetadataType.TS_VECTOR:
            return 'tsvector';
        default:
            throw new _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionException({
                message: `Cannot convert ${fieldMetadataType} to column type.`,
                code: _workspacemigrationactionexecutionexception.WorkspaceMigrationActionExecutionExceptionCode.UNSUPPORTED_FIELD_METADATA_TYPE
            });
    }
};

//# sourceMappingURL=field-metadata-type-to-column-type.util.js.map