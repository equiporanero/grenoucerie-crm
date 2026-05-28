"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFieldFilterZodSchema", {
    enumerable: true,
    get: function() {
        return generateFieldFilterZodSchema;
    }
});
const _types = require("twenty-shared/types");
const _zod = require("zod");
const _relationtypeinterface = require("../../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _isfieldmetadataoftypeutil = require("../../../utils/is-field-metadata-of-type.util");
const NullCheckEnum = _zod.z.enum([
    'NULL',
    'NOT_NULL'
]);
const generateFieldFilterZodSchema = (field)=>{
    switch(field.type){
        case _types.FieldMetadataType.UUID:
            return _zod.z.object({
                eq: _zod.z.string().uuid().optional().describe('Equals'),
                neq: _zod.z.string().uuid().optional().describe('Not equals'),
                in: _zod.z.array(_zod.z.string().uuid()).optional().describe('In array of values'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
            }).optional().describe(`Filter by ${field.name} (UUID field)`);
        case _types.FieldMetadataType.TEXT:
        case _types.FieldMetadataType.RICH_TEXT:
            return _zod.z.object({
                eq: _zod.z.string().optional().describe('Equals'),
                neq: _zod.z.string().optional().describe('Not equals'),
                in: _zod.z.array(_zod.z.string()).optional().describe('In array of values'),
                like: _zod.z.string().optional().describe('Case-sensitive pattern match (use % for wildcards)'),
                ilike: _zod.z.string().optional().describe('Case-insensitive pattern match (use % for wildcards)'),
                startsWith: _zod.z.string().optional().describe('Starts with'),
                endsWith: _zod.z.string().optional().describe('Ends with'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
            }).optional().describe(`Filter by ${field.name} (text field)`);
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.NUMERIC:
        case _types.FieldMetadataType.POSITION:
            return _zod.z.object({
                eq: _zod.z.number().optional().describe('Equals'),
                neq: _zod.z.number().optional().describe('Not equals'),
                gt: _zod.z.number().optional().describe('Greater than'),
                gte: _zod.z.number().optional().describe('Greater than or equal'),
                lt: _zod.z.number().optional().describe('Less than'),
                lte: _zod.z.number().optional().describe('Less than or equal'),
                in: _zod.z.array(_zod.z.number()).optional().describe('In array of values'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
            }).optional().describe(`Filter by ${field.name} (number field)`);
        case _types.FieldMetadataType.BOOLEAN:
            return _zod.z.object({
                eq: _zod.z.boolean().optional().describe('Equals'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
            }).optional().describe(`Filter by ${field.name} (boolean field)`);
        case _types.FieldMetadataType.DATE_TIME:
        case _types.FieldMetadataType.DATE:
            return _zod.z.object({
                eq: _zod.z.string().datetime().optional().describe('Equals (ISO datetime string)'),
                neq: _zod.z.string().datetime().optional().describe('Not equals (ISO datetime string)'),
                gt: _zod.z.string().datetime().optional().describe('Greater than (ISO datetime string)'),
                gte: _zod.z.string().datetime().optional().describe('Greater than or equal (ISO datetime string)'),
                lt: _zod.z.string().datetime().optional().describe('Less than (ISO datetime string)'),
                lte: _zod.z.string().datetime().optional().describe('Less than or equal (ISO datetime string)'),
                in: _zod.z.array(_zod.z.string().datetime()).optional().describe('In array of values (ISO datetime strings)'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
            }).optional().describe(`Filter by ${field.name} (date field)`);
        case _types.FieldMetadataType.SELECT:
            {
                const enumValues = field.options?.map((option)=>option.value) || [];
                if (enumValues.length === 0) {
                    return null;
                }
                const selectEnum = _zod.z.enum(enumValues);
                return _zod.z.object({
                    eq: selectEnum.optional().describe('Equals'),
                    neq: selectEnum.optional().describe('Not equals'),
                    in: _zod.z.array(selectEnum).optional().describe('In array of values'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
                }).optional().describe(`Filter by ${field.name} (select field)`);
            }
        case _types.FieldMetadataType.MULTI_SELECT:
            {
                const enumValues = field.options?.map((option)=>option.value) || [];
                if (enumValues.length === 0) {
                    return null;
                }
                const multiSelectEnum = _zod.z.enum(enumValues);
                return _zod.z.object({
                    in: _zod.z.array(multiSelectEnum).optional().describe('Contains any of these values'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value'),
                    isEmptyArray: _zod.z.boolean().optional().describe('Is empty array')
                }).optional().describe(`Filter by ${field.name} (multi-select field)`);
            }
        case _types.FieldMetadataType.RATING:
            {
                const enumValues = field.options?.map((option)=>option.value) || [];
                if (enumValues.length === 0) {
                    return null;
                }
                const ratingEnum = _zod.z.enum(enumValues);
                return _zod.z.object({
                    eq: ratingEnum.optional().describe('Equals'),
                    in: _zod.z.array(ratingEnum).optional().describe('In array of values'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
                }).optional().describe(`Filter by ${field.name} (rating field)`);
            }
        case _types.FieldMetadataType.ARRAY:
            return _zod.z.object({
                containsIlike: _zod.z.string().optional().describe('Contains case-insensitive substring'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value'),
                isEmptyArray: _zod.z.boolean().optional().describe('Is empty array')
            }).optional().describe(`Filter by ${field.name} (array field)`);
        case _types.FieldMetadataType.CURRENCY:
            return _zod.z.object({
                amountMicros: _zod.z.object({
                    eq: _zod.z.number().optional().describe('Amount equals'),
                    neq: _zod.z.number().optional().describe('Amount not equals'),
                    gt: _zod.z.number().optional().describe('Amount greater than'),
                    gte: _zod.z.number().optional().describe('Amount greater than or equal'),
                    lt: _zod.z.number().optional().describe('Amount less than'),
                    lte: _zod.z.number().optional().describe('Amount less than or equal'),
                    in: _zod.z.array(_zod.z.number()).optional().describe('Amount in array of values'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty amount. Use "NULL" to find records with no amount, "NOT_NULL" for records with an amount')
                }).optional().describe('Filter by amount'),
                currencyCode: _zod.z.object({
                    eq: _zod.z.string().optional().describe('Currency code equals'),
                    neq: _zod.z.string().optional().describe('Currency code not equals'),
                    in: _zod.z.array(_zod.z.string()).optional().describe('Currency code in array of values'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty currency code. Use "NULL" to find records with no currency code, "NOT_NULL" for records with a currency code')
                }).optional().describe('Filter by currency code')
            }).optional().describe(`Filter by ${field.name} (currency field)`);
        case _types.FieldMetadataType.FULL_NAME:
            return _zod.z.object({
                firstName: _zod.z.object({
                    eq: _zod.z.string().optional().describe('First name equals'),
                    neq: _zod.z.string().optional().describe('First name not equals'),
                    like: _zod.z.string().optional().describe('First name case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('First name case-insensitive pattern match'),
                    startsWith: _zod.z.string().optional().describe('First name starts with'),
                    endsWith: _zod.z.string().optional().describe('First name ends with'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty first name. Use "NULL" to find records with no first name, "NOT_NULL" for records with a first name')
                }).optional().describe('Filter by first name'),
                lastName: _zod.z.object({
                    eq: _zod.z.string().optional().describe('Last name equals'),
                    neq: _zod.z.string().optional().describe('Last name not equals'),
                    like: _zod.z.string().optional().describe('Last name case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('Last name case-insensitive pattern match'),
                    startsWith: _zod.z.string().optional().describe('Last name starts with'),
                    endsWith: _zod.z.string().optional().describe('Last name ends with'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty last name. Use "NULL" to find records with no last name, "NOT_NULL" for records with a last name')
                }).optional().describe('Filter by last name')
            }).optional().describe(`Filter by ${field.name} (full name field)`);
        case _types.FieldMetadataType.ADDRESS:
            return _zod.z.object({
                addressStreet1: _zod.z.object({
                    eq: _zod.z.string().optional().describe('Street 1 equals'),
                    neq: _zod.z.string().optional().describe('Street 1 not equals'),
                    like: _zod.z.string().optional().describe('Street 1 case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('Street 1 case-insensitive pattern match'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty street 1. Use "NULL" to find records with no street 1, "NOT_NULL" for records with a street 1')
                }).optional().describe('Filter by street 1'),
                addressCity: _zod.z.object({
                    eq: _zod.z.string().optional().describe('City equals'),
                    neq: _zod.z.string().optional().describe('City not equals'),
                    like: _zod.z.string().optional().describe('City case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('City case-insensitive pattern match'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty city. Use "NULL" to find records with no city, "NOT_NULL" for records with a city')
                }).optional().describe('Filter by city'),
                addressCountry: _zod.z.object({
                    eq: _zod.z.string().optional().describe('Country equals'),
                    neq: _zod.z.string().optional().describe('Country not equals'),
                    like: _zod.z.string().optional().describe('Country case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('Country case-insensitive pattern match'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty country. Use "NULL" to find records with no country, "NOT_NULL" for records with a country')
                }).optional().describe('Filter by country')
            }).optional().describe(`Filter by ${field.name} (address field)`);
        case _types.FieldMetadataType.EMAILS:
            return _zod.z.object({
                primaryEmail: _zod.z.object({
                    eq: _zod.z.string().email().optional().describe('Primary email equals'),
                    neq: _zod.z.string().email().optional().describe('Primary email not equals'),
                    like: _zod.z.string().optional().describe('Primary email case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('Primary email case-insensitive pattern match'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty primary email. Use "NULL" to find records with no primary email, "NOT_NULL" for records with a primary email')
                }).optional().describe('Filter by primary email')
            }).optional().describe(`Filter by ${field.name} (emails field)`);
        case _types.FieldMetadataType.PHONES:
            return _zod.z.object({
                primaryPhoneNumber: _zod.z.object({
                    eq: _zod.z.string().optional().describe('Primary phone number equals'),
                    neq: _zod.z.string().optional().describe('Primary phone number not equals'),
                    like: _zod.z.string().optional().describe('Primary phone number case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('Primary phone number case-insensitive pattern match'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty primary phone number. Use "NULL" to find records with no primary phone number, "NOT_NULL" for records with a primary phone number')
                }).optional().describe('Filter by primary phone number')
            }).optional().describe(`Filter by ${field.name} (phones field)`);
        case _types.FieldMetadataType.LINKS:
            return _zod.z.object({
                primaryLinkUrl: _zod.z.object({
                    eq: _zod.z.string().url().optional().describe('Primary link URL equals'),
                    neq: _zod.z.string().url().optional().describe('Primary link URL not equals'),
                    like: _zod.z.string().optional().describe('Primary link URL case-sensitive pattern match'),
                    ilike: _zod.z.string().optional().describe('Primary link URL case-insensitive pattern match'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty primary link URL. Use "NULL" to find records with no primary link URL, "NOT_NULL" for records with a primary link URL')
                }).optional().describe('Filter by primary link URL')
            }).optional().describe(`Filter by ${field.name} (links field)`);
        case _types.FieldMetadataType.RELATION:
            if ((0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) && field.settings?.relationType === _relationtypeinterface.RelationType.MANY_TO_ONE) {
                const fieldName = `${field.name}Id`;
                return _zod.z.object({
                    eq: _zod.z.string().uuid().optional().describe('Related record ID equals'),
                    neq: _zod.z.string().uuid().optional().describe('Related record ID not equals'),
                    in: _zod.z.array(_zod.z.string().uuid()).optional().describe('Related record ID in array of values'),
                    is: NullCheckEnum.optional().describe('Check for missing or empty related record. Use "NULL" to find records with no relation, "NOT_NULL" for records with a relation')
                }).optional().describe(`Filter by ${fieldName} (relation field)`);
            }
            return null;
        case _types.FieldMetadataType.RAW_JSON:
        case _types.FieldMetadataType.FILES:
            return _zod.z.object({
                eq: _zod.z.string().optional().describe('Raw JSON equals'),
                neq: _zod.z.string().optional().describe('Raw JSON not equals'),
                like: _zod.z.string().optional().describe('Raw JSON case-sensitive pattern match'),
                ilike: _zod.z.string().optional().describe('Raw JSON case-insensitive pattern match'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
            }).optional().describe(`Filter by ${field.name} (raw JSON field)`);
        default:
            return _zod.z.object({
                eq: _zod.z.string().optional().describe('Equals'),
                neq: _zod.z.string().optional().describe('Not equals'),
                like: _zod.z.string().optional().describe('Case-sensitive pattern match'),
                ilike: _zod.z.string().optional().describe('Case-insensitive pattern match'),
                is: NullCheckEnum.optional().describe('Check for missing or empty values. Use "NULL" to find records with no value, "NOT_NULL" for records with a value')
            }).optional().describe(`Filter by ${field.name} (string field)`);
    }
};

//# sourceMappingURL=field-filters.zod-schema.js.map