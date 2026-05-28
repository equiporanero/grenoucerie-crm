"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "serializeDefaultValue", {
    enumerable: true,
    get: function() {
        return serializeDefaultValue;
    }
});
const _fieldmetadataexception = require("../../../../metadata-modules/field-metadata/field-metadata.exception");
const _isfunctiondefaultvalueutil = require("../../../../metadata-modules/field-metadata/utils/is-function-default-value.util");
const _serializefunctiondefaultvalueutil = require("../../../../metadata-modules/field-metadata/utils/serialize-function-default-value.util");
const _removesqlinjectionutil = require("../../utils/remove-sql-injection.util");
// Default values arrive pre-quoted with single quotes (e.g. "'OPTION_1'").
// Strip them so escapeLiteral can re-quote properly.
const stripSurroundingQuotes = (value)=>value.startsWith("'") && value.endsWith("'") ? value.slice(1, -1) : value;
const serializeDefaultValue = ({ columnType, defaultValue, schemaName, tableName, columnName })=>{
    if (defaultValue === undefined || defaultValue === null) {
        return 'NULL';
    }
    if ((0, _isfunctiondefaultvalueutil.isFunctionDefaultValue)(defaultValue)) {
        const serializedTypeDefaultValue = (0, _serializefunctiondefaultvalueutil.serializeFunctionDefaultValue)(defaultValue);
        if (!serializedTypeDefaultValue) {
            throw new _fieldmetadataexception.FieldMetadataException('Invalid default value', _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
        }
        return serializedTypeDefaultValue;
    }
    // Enum types need a schema-qualified cast; others use the column type directly.
    // Enum name is built from sanitized table+column (removeSqlDDLInjection strips
    // to [a-zA-Z0-9_]) to match computePostgresEnumName.
    const castSuffix = columnType === 'enum' ? `::${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(`${(0, _removesqlinjectionutil.removeSqlDDLInjection)(tableName)}_${(0, _removesqlinjectionutil.removeSqlDDLInjection)(columnName)}_enum`)}` : `::${columnType}`;
    const escapeAndCast = (rawValue)=>(0, _removesqlinjectionutil.escapeLiteral)(rawValue) + castSuffix;
    switch(typeof defaultValue){
        case 'string':
            {
                if (!defaultValue.startsWith("'") || !defaultValue.endsWith("'")) {
                    throw new _fieldmetadataexception.FieldMetadataException(`Invalid string default value "${defaultValue}" should be single quoted`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
                }
                return escapeAndCast(stripSurroundingQuotes(defaultValue));
            }
        case 'boolean':
        case 'number':
            {
                return escapeAndCast(`${defaultValue}`);
            }
        case 'object':
            {
                if (defaultValue instanceof Date) {
                    return escapeAndCast(defaultValue.toISOString());
                }
                if (Array.isArray(defaultValue)) {
                    const arrayValues = defaultValue.map((val)=>(0, _removesqlinjectionutil.escapeLiteral)(stripSurroundingQuotes(String(val)))).join(',');
                    return `ARRAY[${arrayValues}]${castSuffix}[]`;
                }
                return escapeAndCast(JSON.stringify(defaultValue));
            }
        default:
            {
                throw new _fieldmetadataexception.FieldMetadataException(`Invalid default value "${defaultValue}"`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
            }
    }
};

//# sourceMappingURL=serialize-default-value.util.js.map