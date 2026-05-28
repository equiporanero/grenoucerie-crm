"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTsVectorColumnExpressionFromFields", {
    enumerable: true,
    get: function() {
        return getTsVectorColumnExpressionFromFields;
    }
});
const _types = require("twenty-shared/types");
const _computecolumnnameutil = require("../../metadata-modules/field-metadata/utils/compute-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _issearchablesubfieldutil = require("./is-searchable-subfield.util");
const _removesqlinjectionutil = require("../workspace-migration/utils/remove-sql-injection.util");
const getTsVectorColumnExpressionFromFields = (fieldsUsedForSearch)=>{
    const columnExpressions = fieldsUsedForSearch.flatMap(getColumnExpressionsFromField);
    const concatenatedExpression = columnExpressions.length > 0 ? columnExpressions.join(" || ' ' || ") : 'NULL';
    return `to_tsvector('simple', ${concatenatedExpression})`;
};
const getColumnExpressionsFromField = (fieldMetadataTypeAndName)=>{
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadataTypeAndName.type)) {
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadataTypeAndName.type);
        if (!compositeType) {
            throw new Error(`Composite type not found for field metadata type: ${fieldMetadataTypeAndName.type}`);
        }
        const baseExpressions = compositeType.properties.filter((property)=>(0, _issearchablesubfieldutil.isSearchableSubfield)(compositeType.type, property.type, property.name)).map((property)=>{
            const columnName = (0, _computecolumnnameutil.computeCompositeColumnName)(fieldMetadataTypeAndName, property);
            return getColumnExpression(columnName, fieldMetadataTypeAndName.type);
        });
        if (fieldMetadataTypeAndName.type === _types.FieldMetadataType.PHONES) {
            const phoneNumberColumn = (0, _removesqlinjectionutil.escapeIdentifier)(`${fieldMetadataTypeAndName.name}PrimaryPhoneNumber`);
            const callingCodeColumn = (0, _removesqlinjectionutil.escapeIdentifier)(`${fieldMetadataTypeAndName.name}PrimaryPhoneCallingCode`);
            const additionalPhonesColumn = (0, _removesqlinjectionutil.escapeIdentifier)(`${fieldMetadataTypeAndName.name}AdditionalPhones`);
            const internationalFormats = [
                `COALESCE(${callingCodeColumn} || ${phoneNumberColumn}, '')`,
                `COALESCE(REPLACE(${callingCodeColumn}, '+', '') || ${phoneNumberColumn}, '')`,
                `COALESCE('0' || ${phoneNumberColumn}, '')`
            ];
            const additionalPhonesExpression = `COALESCE(TRANSLATE(regexp_replace(${additionalPhonesColumn}::text, '"(number|countryCode|callingCode)"\\s*:\\s*', '', 'g'), '[]{}",:', '        '), '')`;
            return [
                ...baseExpressions,
                ...internationalFormats,
                additionalPhonesExpression
            ];
        }
        if (fieldMetadataTypeAndName.type === _types.FieldMetadataType.LINKS) {
            const secondaryLinksColumn = (0, _removesqlinjectionutil.escapeIdentifier)(`${fieldMetadataTypeAndName.name}SecondaryLinks`);
            const secondaryLinksExpression = `COALESCE(public.unaccent_immutable(TRANSLATE(regexp_replace(${secondaryLinksColumn}::text, '"(label|url)"\\s*:\\s*', '', 'g'), '[]{}",:', '        ')), '')`;
            return [
                ...baseExpressions,
                secondaryLinksExpression
            ];
        }
        if (fieldMetadataTypeAndName.type === _types.FieldMetadataType.EMAILS) {
            const additionalEmailsColumn = (0, _removesqlinjectionutil.escapeIdentifier)(`${fieldMetadataTypeAndName.name}AdditionalEmails`);
            const additionalEmailsExpression = `COALESCE(public.unaccent_immutable(TRANSLATE(${additionalEmailsColumn}::text, '[]",', '    ')), '') || ' ' || COALESCE(public.unaccent_immutable(TRANSLATE(REPLACE(${additionalEmailsColumn}::text, '@', ' '), '[]",', '    ')), '')`;
            return [
                ...baseExpressions,
                additionalEmailsExpression
            ];
        }
        return baseExpressions;
    }
    const columnName = (0, _computecolumnnameutil.computeColumnName)(fieldMetadataTypeAndName.name);
    return [
        getColumnExpression(columnName, fieldMetadataTypeAndName.type)
    ];
};
const getColumnExpression = (columnName, fieldType)=>{
    const quotedColumnName = (0, _removesqlinjectionutil.escapeIdentifier)(columnName);
    switch(fieldType){
        case _types.FieldMetadataType.EMAILS:
            return `
      COALESCE(public.unaccent_immutable(${quotedColumnName}), '') || ' ' ||
      COALESCE(public.unaccent_immutable(SPLIT_PART(${quotedColumnName}, '@', 2)), '')`;
        case _types.FieldMetadataType.PHONES:
            return `COALESCE(${quotedColumnName}, '')`;
        case _types.FieldMetadataType.UUID:
            return `COALESCE(${quotedColumnName}::text, '')`;
        default:
            return `COALESCE(public.unaccent_immutable(${quotedColumnName}), '')`;
    }
};

//# sourceMappingURL=get-ts-vector-column-expression.util.js.map