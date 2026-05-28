"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "convertObjectMetadataToSchemaProperties", {
    enumerable: true,
    get: function() {
        return convertObjectMetadataToSchemaProperties;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _relationtypeinterface = require("../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _isfieldmetadataoftypeutil = require("./is-field-metadata-of-type.util");
const isFieldAvailable = (field, forResponse)=>{
    if (forResponse) {
        return true;
    }
    switch(field.name){
        case 'id':
        case 'createdAt':
        case 'updatedAt':
        case 'deletedAt':
            return false;
        default:
            return true;
    }
};
const getFieldProperties = (field)=>{
    switch(field.type){
        case _types.FieldMetadataType.UUID:
            {
                return {
                    type: 'string',
                    format: 'uuid'
                };
            }
        case _types.FieldMetadataType.TEXT:
            {
                return {
                    type: 'string'
                };
            }
        case _types.FieldMetadataType.DATE_TIME:
            {
                return {
                    type: 'string',
                    format: 'date-time'
                };
            }
        case _types.FieldMetadataType.DATE:
            {
                return {
                    type: 'string',
                    format: 'date'
                };
            }
        case _types.FieldMetadataType.NUMBER:
            {
                const settings = field.settings;
                if (settings?.dataType === _types.NumberDataType.FLOAT || (0, _utils.isDefined)(settings?.decimals) && settings.decimals > 0) {
                    return {
                        type: 'number'
                    };
                }
                return {
                    type: 'integer'
                };
            }
        case _types.FieldMetadataType.NUMERIC:
        case _types.FieldMetadataType.POSITION:
            {
                return {
                    type: 'number'
                };
            }
        case _types.FieldMetadataType.BOOLEAN:
            {
                return {
                    type: 'boolean'
                };
            }
        case _types.FieldMetadataType.RAW_JSON:
            {
                return {
                    type: 'object'
                };
            }
        default:
            {
                return {
                    type: 'string'
                };
            }
    }
};
const convertObjectMetadataToSchemaProperties = ({ item, forResponse })=>{
    return item.fields.reduce((node, field)=>{
        if (!isFieldAvailable(field, forResponse) || field.type === _types.FieldMetadataType.TS_VECTOR) {
            return node;
        }
        const isRelationManyToOne = ((0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.MORPH_RELATION)) && field.settings?.relationType === _relationtypeinterface.RelationType.MANY_TO_ONE;
        if (isRelationManyToOne) {
            const key = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: field.name
            });
            return {
                ...node,
                [key]: {
                    type: 'string',
                    format: 'uuid'
                }
            };
        }
        if (((0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.MORPH_RELATION)) && field.settings?.relationType === _relationtypeinterface.RelationType.ONE_TO_MANY) {
            return node;
        }
        let itemProperty = {};
        switch(field.type){
            case _types.FieldMetadataType.MULTI_SELECT:
                itemProperty = {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: (field.options ?? []).map((option)=>option.value)
                    }
                };
                break;
            case _types.FieldMetadataType.SELECT:
                itemProperty = {
                    type: 'string',
                    enum: (field.options ?? []).map((option)=>option.value)
                };
                break;
            case _types.FieldMetadataType.ARRAY:
                itemProperty = {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                };
                break;
            case _types.FieldMetadataType.RATING:
                itemProperty = {
                    type: 'string',
                    enum: (field.options ?? []).map((option)=>option.value)
                };
                break;
            case _types.FieldMetadataType.LINKS:
                itemProperty = {
                    type: 'object',
                    properties: {
                        primaryLinkLabel: {
                            type: 'string'
                        },
                        primaryLinkUrl: {
                            type: 'string'
                        },
                        secondaryLinks: {
                            type: 'array',
                            items: {
                                type: 'object',
                                description: 'A secondary link',
                                properties: {
                                    url: {
                                        type: 'string',
                                        format: 'uri'
                                    },
                                    label: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                };
                break;
            case _types.FieldMetadataType.CURRENCY:
                itemProperty = {
                    type: 'object',
                    properties: {
                        amountMicros: {
                            type: 'number'
                        },
                        currencyCode: {
                            type: 'string'
                        }
                    }
                };
                break;
            case _types.FieldMetadataType.FULL_NAME:
                itemProperty = {
                    type: 'object',
                    properties: {
                        firstName: {
                            type: 'string'
                        },
                        lastName: {
                            type: 'string'
                        }
                    }
                };
                break;
            case _types.FieldMetadataType.ADDRESS:
                itemProperty = {
                    type: 'object',
                    properties: {
                        addressStreet1: {
                            type: 'string'
                        },
                        addressStreet2: {
                            type: 'string'
                        },
                        addressCity: {
                            type: 'string'
                        },
                        addressPostcode: {
                            type: 'string'
                        },
                        addressState: {
                            type: 'string'
                        },
                        addressCountry: {
                            type: 'string'
                        },
                        addressLat: {
                            type: 'number'
                        },
                        addressLng: {
                            type: 'number'
                        }
                    }
                };
                break;
            case _types.FieldMetadataType.ACTOR:
                itemProperty = {
                    type: 'object',
                    properties: {
                        source: {
                            type: 'string',
                            enum: [
                                'EMAIL',
                                'CALENDAR',
                                'WORKFLOW',
                                'AGENT',
                                'API',
                                'IMPORT',
                                'MANUAL',
                                'SYSTEM',
                                'WEBHOOK'
                            ]
                        },
                        ...forResponse ? {
                            workspaceMemberId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            name: {
                                type: 'string'
                            }
                        } : {}
                    }
                };
                break;
            case _types.FieldMetadataType.EMAILS:
                itemProperty = {
                    type: 'object',
                    properties: {
                        primaryEmail: {
                            type: 'string'
                        },
                        additionalEmails: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'email'
                            }
                        }
                    }
                };
                break;
            case _types.FieldMetadataType.PHONES:
                itemProperty = {
                    properties: {
                        additionalPhones: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    number: {
                                        type: 'string'
                                    },
                                    countryCode: {
                                        type: 'string'
                                    },
                                    callingCode: {
                                        type: 'string'
                                    }
                                }
                            }
                        },
                        primaryPhoneCountryCode: {
                            type: 'string'
                        },
                        primaryPhoneCallingCode: {
                            type: 'string'
                        },
                        primaryPhoneNumber: {
                            type: 'string'
                        }
                    },
                    type: 'object'
                };
                break;
            case _types.FieldMetadataType.RICH_TEXT:
                itemProperty = {
                    type: 'object',
                    properties: {
                        blocknote: {
                            type: 'string'
                        },
                        markdown: {
                            type: 'string'
                        }
                    }
                };
                break;
            case _types.FieldMetadataType.FILES:
                itemProperty = {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            fileId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            label: {
                                type: 'string'
                            },
                            ...forResponse ? {
                                extension: {
                                    type: 'string'
                                },
                                url: {
                                    type: 'string'
                                }
                            } : {}
                        }
                    }
                };
                break;
            default:
                itemProperty = getFieldProperties(field);
                break;
        }
        if (field.description) {
            itemProperty.description = field.description;
        }
        if (Object.keys(itemProperty).length) {
            return {
                ...node,
                [field.name]: itemProperty
            };
        }
        return node;
    }, {});
};

//# sourceMappingURL=convert-object-metadata-to-schema-properties.util.js.map