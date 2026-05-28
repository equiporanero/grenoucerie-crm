"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateRecordPropertiesZodSchema", {
    enumerable: true,
    get: function() {
        return generateRecordPropertiesZodSchema;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _relationtypeinterface = require("../../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _validatefilesfieldorthrowutil = require("../../../api/common/common-args-processors/data-arg-processor/validator-utils/validate-files-field-or-throw.util");
const _isfieldmetadataoftypeutil = require("../../../utils/is-field-metadata-of-type.util");
const isFieldAvailable = (field, forResponse)=>{
    if (forResponse) {
        return true;
    }
    switch(field.name){
        case 'id':
        case 'createdAt':
        case 'updatedAt':
        case 'deletedAt':
        case 'createdBy':
        case 'updatedBy':
            return false;
        default:
            return true;
    }
};
const getFieldZodType = (field)=>{
    switch(field.type){
        case _types.FieldMetadataType.UUID:
            return _zod.z.string().uuidv4();
        case _types.FieldMetadataType.TEXT:
            return _zod.z.string();
        case _types.FieldMetadataType.DATE_TIME:
            return _zod.z.string().datetime();
        case _types.FieldMetadataType.DATE:
            return _zod.z.string().date();
        case _types.FieldMetadataType.NUMBER:
            {
                const settings = field.settings;
                if (settings?.dataType === _types.NumberDataType.FLOAT || (0, _utils.isDefined)(settings?.decimals) && settings.decimals > 0) {
                    return _zod.z.number();
                }
                return _zod.z.number().int();
            }
        case _types.FieldMetadataType.NUMERIC:
        case _types.FieldMetadataType.POSITION:
            return _zod.z.number();
        case _types.FieldMetadataType.BOOLEAN:
            return _zod.z.boolean();
        case _types.FieldMetadataType.RAW_JSON:
            return _zod.z.record(_zod.z.string(), _zod.z.unknown());
        default:
            return _zod.z.string();
    }
};
const generateRecordPropertiesZodSchema = (objectMetadata, forResponse = false, restrictedFields)=>{
    const shape = {};
    objectMetadata.fields.forEach((field)=>{
        if (!isFieldAvailable(field, forResponse) || field.type === _types.FieldMetadataType.TS_VECTOR) {
            return;
        }
        if (restrictedFields?.[field.id]?.canUpdate === false) {
            return;
        }
        if ((0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) && field.settings?.relationType === _relationtypeinterface.RelationType.MANY_TO_ONE) {
            const uuidSchema = _zod.z.uuidv4();
            shape[`${field.name}Id`] = field.isNullable ? uuidSchema.optional() : uuidSchema;
            return;
        }
        if ((0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) && field.settings?.relationType === _relationtypeinterface.RelationType.ONE_TO_MANY) {
            return;
        }
        let fieldSchema;
        switch(field.type){
            case _types.FieldMetadataType.MULTI_SELECT:
                {
                    const enumValues = field.options?.map((option)=>option.value) || [];
                    if (enumValues.length > 0) {
                        fieldSchema = _zod.z.array(_zod.z.enum(enumValues));
                    } else {
                        fieldSchema = _zod.z.array(_zod.z.string());
                    }
                    break;
                }
            case _types.FieldMetadataType.SELECT:
                {
                    const enumValues = field.options?.map((option)=>option.value) || [];
                    if (enumValues.length > 0) {
                        fieldSchema = _zod.z.enum(enumValues);
                    } else {
                        fieldSchema = _zod.z.string();
                    }
                    break;
                }
            case _types.FieldMetadataType.ARRAY:
                fieldSchema = _zod.z.array(_zod.z.string());
                break;
            case _types.FieldMetadataType.RATING:
                {
                    const enumValues = field.options?.map((option)=>option.value) || [];
                    if (enumValues.length > 0) {
                        fieldSchema = _zod.z.enum(enumValues);
                    } else {
                        fieldSchema = _zod.z.string();
                    }
                    break;
                }
            case _types.FieldMetadataType.LINKS:
                fieldSchema = _zod.z.object({
                    primaryLinkLabel: _zod.z.string().optional(),
                    primaryLinkUrl: _zod.z.string().url().optional(),
                    secondaryLinks: _zod.z.array(_zod.z.object({
                        url: _zod.z.string().url(),
                        label: _zod.z.string()
                    })).optional()
                });
                break;
            case _types.FieldMetadataType.CURRENCY:
                fieldSchema = _zod.z.object({
                    amountMicros: _zod.z.number().optional(),
                    currencyCode: _zod.z.string().optional()
                });
                break;
            case _types.FieldMetadataType.FULL_NAME:
                fieldSchema = _zod.z.object({
                    firstName: _zod.z.string().optional(),
                    lastName: _zod.z.string().optional()
                });
                break;
            case _types.FieldMetadataType.ADDRESS:
                fieldSchema = _zod.z.object({
                    addressStreet1: _zod.z.string().optional(),
                    addressStreet2: _zod.z.string().optional(),
                    addressCity: _zod.z.string().optional(),
                    addressPostcode: _zod.z.string().optional(),
                    addressState: _zod.z.string().optional(),
                    addressCountry: _zod.z.string().optional(),
                    addressLat: _zod.z.number().optional(),
                    addressLng: _zod.z.number().optional()
                });
                break;
            case _types.FieldMetadataType.ACTOR:
                fieldSchema = _zod.z.object({
                    source: _zod.z.enum([
                        'EMAIL',
                        'CALENDAR',
                        'WORKFLOW',
                        'AGENT',
                        'API',
                        'IMPORT',
                        'MANUAL',
                        'SYSTEM',
                        'WEBHOOK'
                    ]).optional(),
                    ...forResponse ? {
                        workspaceMemberId: _zod.z.string().uuid().optional(),
                        name: _zod.z.string().optional()
                    } : {}
                });
                break;
            case _types.FieldMetadataType.EMAILS:
                fieldSchema = _zod.z.object({
                    primaryEmail: _zod.z.string().email().optional(),
                    additionalEmails: _zod.z.array(_zod.z.string().email()).optional()
                });
                break;
            case _types.FieldMetadataType.PHONES:
                fieldSchema = _zod.z.object({
                    primaryPhoneNumber: _zod.z.string().optional(),
                    primaryPhoneCountryCode: _zod.z.string().optional(),
                    primaryPhoneCallingCode: _zod.z.string().optional(),
                    additionalPhones: _zod.z.array(_zod.z.string()).optional()
                });
                break;
            case _types.FieldMetadataType.RICH_TEXT:
                fieldSchema = _zod.z.object({
                    markdown: _zod.z.string().optional(),
                    blocknote: _zod.z.string().optional()
                });
                break;
            case _types.FieldMetadataType.FILES:
                fieldSchema = _validatefilesfieldorthrowutil.filesFieldSchema;
                break;
            default:
                fieldSchema = getFieldZodType(field);
                break;
        }
        if (field.name === 'position') {
            fieldSchema = _zod.z.union([
                _zod.z.number(),
                _zod.z.literal('first'),
                _zod.z.literal('last')
            ]);
            fieldSchema = fieldSchema.describe('Use "first" to insert at the top, "last" for the bottom, or a number for explicit ordering. Leave empty to place at the top (recommended).');
        } else if (field.description) {
            fieldSchema = fieldSchema.describe(field.description);
        }
        if (field.isNullable) {
            fieldSchema = fieldSchema.optional();
        }
        shape[field.name] = fieldSchema;
    });
    return _zod.z.object(shape);
};

//# sourceMappingURL=record-properties.zod-schema.js.map