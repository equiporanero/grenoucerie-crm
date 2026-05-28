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
    get computeMetadataSchemaComponents () {
        return computeMetadataSchemaComponents;
    },
    get computeParameterComponents () {
        return computeParameterComponents;
    },
    get computeSchemaComponents () {
        return computeSchemaComponents;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _relationtypeinterface = require("../../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _generaterandomfieldvalueutil = require("./generate-random-field-value.util");
const _parametersutils = require("./parameters.utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _convertobjectmetadatatoschemapropertiesutil = require("../../../utils/convert-object-metadata-to-schema-properties.util");
const _isfieldmetadataoftypeutil = require("../../../utils/is-field-metadata-of-type.util");
const _cameltotitlecase = require("../../../../utils/camel-to-title-case");
const getSchemaComponentsExample = (item, flatFieldMetadatas)=>{
    return flatFieldMetadatas.reduce((node, field)=>{
        // If field is required
        if (!field.isNullable && field.defaultValue === null) {
            return {
                ...node,
                [field.name]: (0, _generaterandomfieldvalueutil.generateRandomFieldValue)({
                    field
                })
            };
        }
        switch(field.type){
            case _types.FieldMetadataType.TEXT:
                {
                    if (field.name !== 'name') {
                        return node;
                    }
                    return {
                        ...node,
                        [field.name]: `${(0, _cameltotitlecase.camelToTitleCase)(item.nameSingular)} name`
                    };
                }
            case _types.FieldMetadataType.EMAILS:
            case _types.FieldMetadataType.LINKS:
            case _types.FieldMetadataType.CURRENCY:
            case _types.FieldMetadataType.FULL_NAME:
            case _types.FieldMetadataType.SELECT:
            case _types.FieldMetadataType.MULTI_SELECT:
            case _types.FieldMetadataType.PHONES:
                {
                    return {
                        ...node,
                        [field.name]: (0, _generaterandomfieldvalueutil.generateRandomFieldValue)({
                            field
                        })
                    };
                }
            default:
                {
                    return node;
                }
        }
    }, {});
};
const getSchemaComponentsRelationProperties = (flatFieldMetadatas, flatObjectMetadataMaps)=>{
    return flatFieldMetadatas.reduce((node, field)=>{
        const isRelationField = (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) || (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.MORPH_RELATION);
        if (!isRelationField) {
            return node;
        }
        if (!(0, _utils.isDefined)(field.relationTargetObjectMetadataId)) {
            throw new Error(`Relation field "${field.name}" has no relationTargetObjectMetadataId`);
        }
        const relationType = field.settings?.relationType;
        if (!(0, _utils.isDefined)(relationType)) {
            throw new Error(`Relation field "${field.name}" has no relationType in settings`);
        }
        const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: field.relationTargetObjectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!targetObjectMetadata) {
            throw new Error(`Relation field "${field.name}" target object metadata not found for id ${field.relationTargetObjectMetadataId}`);
        }
        let itemProperty = {};
        if (relationType === _relationtypeinterface.RelationType.MANY_TO_ONE) {
            itemProperty = {
                type: 'object',
                oneOf: [
                    {
                        $ref: `#/components/schemas/${(0, _utils.capitalize)(targetObjectMetadata.nameSingular)}ForResponse`
                    }
                ]
            };
        } else if (relationType === _relationtypeinterface.RelationType.ONE_TO_MANY) {
            itemProperty = {
                type: 'array',
                items: {
                    $ref: `#/components/schemas/${(0, _utils.capitalize)(targetObjectMetadata.nameSingular)}ForResponse`
                }
            };
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
const getRequiredFields = (flatFieldMetadatas)=>{
    return flatFieldMetadatas.reduce((required, field)=>{
        if (!field.isNullable && field.defaultValue === null) {
            required.push(field.name);
            return required;
        }
        return required;
    }, []);
};
const computeSchemaComponent = ({ item, flatFieldMetadatas, flatObjectMetadataMaps, forResponse, forUpdate })=>{
    const withRelations = forResponse && !forUpdate;
    const withRequiredFields = !forResponse && !forUpdate;
    // Create a temporary object that looks like ObjectMetadataEntity for the converter
    const tempItem = {
        ...item,
        fields: flatFieldMetadatas
    };
    const result = {
        type: 'object',
        description: item.description ?? undefined,
        properties: (0, _convertobjectmetadatatoschemapropertiesutil.convertObjectMetadataToSchemaProperties)({
            item: tempItem,
            forResponse
        }),
        ...!forResponse ? {
            example: getSchemaComponentsExample(item, flatFieldMetadatas)
        } : {}
    };
    if (withRelations) {
        result.properties = {
            ...result.properties,
            ...getSchemaComponentsRelationProperties(flatFieldMetadatas, flatObjectMetadataMaps)
        };
    }
    if (!withRequiredFields) {
        return result;
    }
    const requiredFields = getRequiredFields(flatFieldMetadatas);
    if (requiredFields?.length) {
        result.required = requiredFields;
    }
    return result;
};
const computeSchemaComponents = (flatObjectMetadataItems, flatObjectMetadataMaps, flatFieldMetadataMaps)=>{
    return flatObjectMetadataItems.reduce((schemas, item)=>{
        const flatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityIds: item.fieldIds
        });
        schemas[(0, _utils.capitalize)(item.nameSingular)] = computeSchemaComponent({
            item,
            flatFieldMetadatas,
            flatObjectMetadataMaps,
            forResponse: false,
            forUpdate: false
        });
        schemas[(0, _utils.capitalize)(item.nameSingular) + 'ForUpdate'] = computeSchemaComponent({
            item,
            flatFieldMetadatas,
            flatObjectMetadataMaps,
            forResponse: false,
            forUpdate: true
        });
        schemas[(0, _utils.capitalize)(item.nameSingular) + 'ForResponse'] = computeSchemaComponent({
            item,
            flatFieldMetadatas,
            flatObjectMetadataMaps,
            forResponse: true,
            forUpdate: false
        });
        return schemas;
    }, {});
};
const computeParameterComponents = (fromMetadata = false)=>{
    return {
        idPath: (0, _parametersutils.computeIdPathParameter)(),
        startingAfter: (0, _parametersutils.computeStartingAfterParameters)(),
        endingBefore: (0, _parametersutils.computeEndingBeforeParameters)(),
        filter: (0, _parametersutils.computeFilterParameters)(),
        depth: (0, _parametersutils.computeDepthParameters)(),
        upsert: (0, _parametersutils.computeUpsertParameters)(),
        softDelete: (0, _parametersutils.computeSoftDeleteParameters)(),
        orderBy: (0, _parametersutils.computeOrderByParameters)(),
        limit: (0, _parametersutils.computeLimitParameters)(fromMetadata),
        groupBy: (0, _parametersutils.computeGroupByParameters)(),
        viewId: (0, _parametersutils.computeViewIdParameters)(),
        aggregate: (0, _parametersutils.computeAggregateParameters)(),
        includeRecordsSample: (0, _parametersutils.computeIncludeRecordsSampleParameters)(),
        orderByForRecords: (0, _parametersutils.computeOrderByForRecordsParameters)()
    };
};
const computeMetadataSchemaComponents = (metadataSchema)=>{
    return metadataSchema.reduce((schemas, item)=>{
        switch(item.nameSingular){
            case 'object':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `An object`,
                        properties: {
                            nameSingular: {
                                type: 'string'
                            },
                            namePlural: {
                                type: 'string'
                            },
                            labelSingular: {
                                type: 'string'
                            },
                            labelPlural: {
                                type: 'string'
                            },
                            description: {
                                type: 'string'
                            },
                            icon: {
                                type: 'string'
                            },
                            labelIdentifierFieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            imageIdentifierFieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `An object`,
                        properties: {
                            isActive: {
                                type: 'boolean'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        ...schemas[`${(0, _utils.capitalize)(item.nameSingular)}`],
                        properties: {
                            ...schemas[`${(0, _utils.capitalize)(item.nameSingular)}`].properties,
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            dataSourceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            isCustom: {
                                type: 'boolean'
                            },
                            isActive: {
                                type: 'boolean'
                            },
                            isSystem: {
                                type: 'boolean'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            fields: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/FieldForResponse'
                                }
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'field':
                {
                    const baseFieldProperties = ({ withImmutableFields, withRequiredFields })=>({
                            type: 'object',
                            description: `A field`,
                            properties: {
                                ...withImmutableFields ? {
                                    type: {
                                        type: 'string',
                                        enum: Object.keys(_types.FieldMetadataType)
                                    },
                                    objectMetadataId: {
                                        type: 'string',
                                        format: 'uuid'
                                    }
                                } : {},
                                name: {
                                    type: 'string'
                                },
                                label: {
                                    type: 'string'
                                },
                                description: {
                                    type: 'string'
                                },
                                icon: {
                                    type: 'string'
                                },
                                defaultValue: {},
                                isNullable: {
                                    type: 'boolean'
                                },
                                settings: {
                                    type: 'object'
                                },
                                options: {
                                    type: 'array',
                                    description: 'For enum field types like SELECT or MULTI_SELECT',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            color: {
                                                type: 'string'
                                            },
                                            label: {
                                                type: 'string'
                                            },
                                            value: {
                                                type: 'string',
                                                pattern: '^[A-Z0-9]+_[A-Z0-9]+$',
                                                example: 'OPTION_1'
                                            },
                                            position: {
                                                type: 'number'
                                            }
                                        }
                                    }
                                }
                            },
                            ...withRequiredFields ? {
                                required: [
                                    'type',
                                    'name',
                                    'label',
                                    'objectMetadataId'
                                ]
                            } : {}
                        });
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = baseFieldProperties({
                        withImmutableFields: true,
                        withRequiredFields: true
                    });
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = baseFieldProperties({
                        withImmutableFields: false,
                        withRequiredFields: false
                    });
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        ...baseFieldProperties({
                            withImmutableFields: true,
                            withRequiredFields: false
                        }),
                        properties: {
                            ...schemas[`${(0, _utils.capitalize)(item.nameSingular)}`].properties,
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            isCustom: {
                                type: 'boolean'
                            },
                            isActive: {
                                type: 'boolean'
                            },
                            isSystem: {
                                type: 'boolean'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'webhook':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A webhook`,
                        properties: {
                            targetUrl: {
                                type: 'string'
                            },
                            operations: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                },
                                default: [
                                    '*.*'
                                ]
                            },
                            description: {
                                type: 'string'
                            },
                            secret: {
                                type: 'string'
                            }
                        },
                        required: [
                            'targetUrl'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A webhook for update`,
                        properties: {
                            targetUrl: {
                                type: 'string'
                            },
                            operations: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                },
                                default: []
                            },
                            description: {
                                type: 'string'
                            },
                            secret: {
                                type: 'string'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A webhook`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            targetUrl: {
                                type: 'string'
                            },
                            operations: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            },
                            description: {
                                type: 'string'
                            },
                            secret: {
                                type: 'string'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'apiKey':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `An API key`,
                        properties: {
                            name: {
                                type: 'string'
                            },
                            expiresAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            roleId: {
                                type: 'string',
                                format: 'uuid'
                            }
                        },
                        required: [
                            'name',
                            'expiresAt',
                            'roleId'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `An API key for update`,
                        properties: {
                            name: {
                                type: 'string'
                            },
                            expiresAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            revokedAt: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Set to null to clear revocation. Defaults to null if not provided.'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `An API key`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            name: {
                                type: 'string'
                            },
                            expiresAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            revokedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            roleId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'view':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A view`,
                        properties: {
                            name: {
                                type: 'string'
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'TABLE',
                                    'KANBAN'
                                ],
                                default: 'TABLE'
                            },
                            key: {
                                type: 'string',
                                default: 'INDEX'
                            },
                            icon: {
                                type: 'string'
                            },
                            position: {
                                type: 'number',
                                default: 0
                            },
                            isCompact: {
                                type: 'boolean',
                                default: false
                            },
                            openRecordIn: {
                                type: 'string',
                                enum: [
                                    'SIDE_PANEL',
                                    'RECORD_PAGE'
                                ],
                                default: 'SIDE_PANEL'
                            },
                            kanbanAggregateOperation: {
                                type: 'string',
                                enum: [
                                    'AVG',
                                    'COUNT',
                                    'MAX',
                                    'MIN',
                                    'SUM'
                                ]
                            },
                            kanbanAggregateOperationFieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            anyFieldFilterValue: {
                                type: 'string'
                            }
                        },
                        required: [
                            'name',
                            'objectMetadataId',
                            'icon'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A view for update`,
                        properties: {
                            name: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'TABLE',
                                    'KANBAN'
                                ]
                            },
                            key: {
                                type: 'string'
                            },
                            icon: {
                                type: 'string'
                            },
                            position: {
                                type: 'number'
                            },
                            isCompact: {
                                type: 'boolean'
                            },
                            openRecordIn: {
                                type: 'string',
                                enum: [
                                    'SIDE_PANEL',
                                    'RECORD_PAGE'
                                ]
                            },
                            kanbanAggregateOperation: {
                                type: 'string',
                                enum: [
                                    'AVG',
                                    'COUNT',
                                    'MAX',
                                    'MIN',
                                    'SUM'
                                ]
                            },
                            kanbanAggregateOperationFieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            anyFieldFilterValue: {
                                type: 'string'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A view`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            name: {
                                type: 'string'
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'TABLE',
                                    'KANBAN'
                                ]
                            },
                            key: {
                                type: 'string'
                            },
                            icon: {
                                type: 'string'
                            },
                            position: {
                                type: 'number'
                            },
                            isCompact: {
                                type: 'boolean'
                            },
                            openRecordIn: {
                                type: 'string',
                                enum: [
                                    'SIDE_PANEL',
                                    'RECORD_PAGE'
                                ]
                            },
                            kanbanAggregateOperation: {
                                type: 'string',
                                enum: [
                                    'AVG',
                                    'COUNT',
                                    'MAX',
                                    'MIN',
                                    'SUM'
                                ]
                            },
                            kanbanAggregateOperationFieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            anyFieldFilterValue: {
                                type: 'string'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'viewField':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A view field`,
                        properties: {
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            isVisible: {
                                type: 'boolean',
                                default: true
                            },
                            size: {
                                type: 'number',
                                default: 0
                            },
                            position: {
                                type: 'number',
                                default: 0
                            },
                            aggregateOperation: {
                                type: 'string',
                                enum: [
                                    'AVG',
                                    'COUNT',
                                    'MAX',
                                    'MIN',
                                    'SUM'
                                ]
                            }
                        },
                        required: [
                            'fieldMetadataId',
                            'viewId'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A view field for update`,
                        properties: {
                            isVisible: {
                                type: 'boolean'
                            },
                            size: {
                                type: 'number'
                            },
                            position: {
                                type: 'number'
                            },
                            aggregateOperation: {
                                type: 'string',
                                enum: [
                                    'AVG',
                                    'COUNT',
                                    'MAX',
                                    'MIN',
                                    'SUM'
                                ]
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A view field`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            isVisible: {
                                type: 'boolean'
                            },
                            size: {
                                type: 'number'
                            },
                            position: {
                                type: 'number'
                            },
                            aggregateOperation: {
                                type: 'string',
                                enum: [
                                    'AVG',
                                    'COUNT',
                                    'MAX',
                                    'MIN',
                                    'SUM'
                                ]
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'viewFilter':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A view filter`,
                        properties: {
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            operand: {
                                type: 'string',
                                enum: [
                                    'IS',
                                    'IS_NOT_NULL',
                                    'IS_NOT',
                                    'LESS_THAN_OR_EQUAL',
                                    'GREATER_THAN_OR_EQUAL',
                                    'IS_BEFORE',
                                    'IS_AFTER',
                                    'CONTAINS',
                                    'DOES_NOT_CONTAIN',
                                    'IS_EMPTY',
                                    'IS_NOT_EMPTY',
                                    'IS_RELATIVE',
                                    'IS_IN_PAST',
                                    'IS_IN_FUTURE',
                                    'IS_TODAY',
                                    'VECTOR_SEARCH'
                                ],
                                default: 'CONTAINS'
                            },
                            value: {
                                type: 'object',
                                description: 'Filter value (JSON format)'
                            },
                            viewFilterGroupId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            positionInViewFilterGroup: {
                                type: 'number'
                            },
                            subFieldName: {
                                type: 'string'
                            }
                        },
                        required: [
                            'fieldMetadataId',
                            'viewId',
                            'value'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A view filter for update`,
                        properties: {
                            operand: {
                                type: 'string',
                                enum: [
                                    'IS',
                                    'IS_NOT_NULL',
                                    'IS_NOT',
                                    'LESS_THAN_OR_EQUAL',
                                    'GREATER_THAN_OR_EQUAL',
                                    'IS_BEFORE',
                                    'IS_AFTER',
                                    'CONTAINS',
                                    'DOES_NOT_CONTAIN',
                                    'IS_EMPTY',
                                    'IS_NOT_EMPTY',
                                    'IS_RELATIVE',
                                    'IS_IN_PAST',
                                    'IS_IN_FUTURE',
                                    'IS_TODAY',
                                    'VECTOR_SEARCH'
                                ]
                            },
                            value: {
                                type: 'object',
                                description: 'Filter value (JSON format)'
                            },
                            viewFilterGroupId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            positionInViewFilterGroup: {
                                type: 'number'
                            },
                            subFieldName: {
                                type: 'string'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A view filter`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            operand: {
                                type: 'string',
                                enum: [
                                    'IS',
                                    'IS_NOT_NULL',
                                    'IS_NOT',
                                    'LESS_THAN_OR_EQUAL',
                                    'GREATER_THAN_OR_EQUAL',
                                    'IS_BEFORE',
                                    'IS_AFTER',
                                    'CONTAINS',
                                    'DOES_NOT_CONTAIN',
                                    'IS_EMPTY',
                                    'IS_NOT_EMPTY',
                                    'IS_RELATIVE',
                                    'IS_IN_PAST',
                                    'IS_IN_FUTURE',
                                    'IS_TODAY',
                                    'VECTOR_SEARCH'
                                ]
                            },
                            value: {
                                type: 'object',
                                description: 'Filter value (JSON format)'
                            },
                            viewFilterGroupId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            positionInViewFilterGroup: {
                                type: 'number'
                            },
                            subFieldName: {
                                type: 'string'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'viewSort':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A view sort`,
                        properties: {
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            direction: {
                                type: 'string',
                                enum: [
                                    'ASC',
                                    'DESC'
                                ],
                                default: 'ASC'
                            }
                        },
                        required: [
                            'fieldMetadataId',
                            'viewId'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A view sort for update`,
                        properties: {
                            direction: {
                                type: 'string',
                                enum: [
                                    'ASC',
                                    'DESC'
                                ]
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A view sort`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            direction: {
                                type: 'string',
                                enum: [
                                    'ASC',
                                    'DESC'
                                ]
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'viewGroup':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A view group`,
                        properties: {
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            fieldValue: {
                                type: 'string'
                            },
                            isVisible: {
                                type: 'boolean',
                                default: true
                            },
                            position: {
                                type: 'number',
                                default: 0
                            }
                        },
                        required: [
                            'fieldMetadataId',
                            'viewId',
                            'fieldValue'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A view group for update`,
                        properties: {
                            fieldValue: {
                                type: 'string'
                            },
                            isVisible: {
                                type: 'boolean'
                            },
                            position: {
                                type: 'number'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A view group`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            fieldMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            fieldValue: {
                                type: 'string'
                            },
                            isVisible: {
                                type: 'boolean'
                            },
                            position: {
                                type: 'number'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'viewFilterGroup':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A view filter group`,
                        properties: {
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            parentViewFilterGroupId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            logicalOperator: {
                                type: 'string',
                                enum: [
                                    'AND',
                                    'OR',
                                    'NOT'
                                ],
                                default: 'AND'
                            },
                            positionInViewFilterGroup: {
                                type: 'number'
                            }
                        },
                        required: [
                            'viewId'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A view filter group for update`,
                        properties: {
                            parentViewFilterGroupId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            logicalOperator: {
                                type: 'string',
                                enum: [
                                    'AND',
                                    'OR',
                                    'NOT'
                                ]
                            },
                            positionInViewFilterGroup: {
                                type: 'number'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A view filter group`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            viewId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            parentViewFilterGroupId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            logicalOperator: {
                                type: 'string',
                                enum: [
                                    'AND',
                                    'OR',
                                    'NOT'
                                ]
                            },
                            positionInViewFilterGroup: {
                                type: 'number'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'pageLayout':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A page layout`,
                        properties: {
                            name: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'RECORD_INDEX',
                                    'RECORD_PAGE',
                                    'DASHBOARD',
                                    'STANDALONE_PAGE'
                                ],
                                default: 'RECORD_PAGE'
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            }
                        },
                        required: [
                            'name'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A page layout for update`,
                        properties: {
                            name: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'RECORD_INDEX',
                                    'RECORD_PAGE',
                                    'DASHBOARD',
                                    'STANDALONE_PAGE'
                                ]
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A page layout`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            name: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'RECORD_INDEX',
                                    'RECORD_PAGE',
                                    'DASHBOARD',
                                    'STANDALONE_PAGE'
                                ]
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            tabs: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/PageLayoutTabForResponse'
                                }
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'pageLayoutTab':
                {
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A page layout tab`,
                        properties: {
                            title: {
                                type: 'string'
                            },
                            position: {
                                type: 'number',
                                default: 0
                            },
                            pageLayoutId: {
                                type: 'string',
                                format: 'uuid'
                            }
                        },
                        required: [
                            'title',
                            'pageLayoutId'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A page layout tab for update`,
                        properties: {
                            title: {
                                type: 'string'
                            },
                            position: {
                                type: 'number'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A page layout tab`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            title: {
                                type: 'string'
                            },
                            position: {
                                type: 'number'
                            },
                            pageLayoutId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
            case 'pageLayoutWidget':
                {
                    schemas['GridPosition'] = {
                        type: 'object',
                        description: 'Grid position for widget placement',
                        properties: {
                            row: {
                                type: 'number',
                                minimum: 0
                            },
                            column: {
                                type: 'number',
                                minimum: 0
                            },
                            rowSpan: {
                                type: 'number',
                                minimum: 1
                            },
                            columnSpan: {
                                type: 'number',
                                minimum: 1
                            }
                        },
                        required: [
                            'row',
                            'column',
                            'rowSpan',
                            'columnSpan'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}`] = {
                        type: 'object',
                        description: `A page layout widget`,
                        properties: {
                            pageLayoutTabId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            title: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'VIEW',
                                    'IFRAME',
                                    'FIELDS',
                                    'GRAPH',
                                    'TIMELINE',
                                    'TASKS',
                                    'NOTES',
                                    'FILES',
                                    'EMAILS',
                                    'CALENDAR'
                                ],
                                default: 'VIEW'
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            gridPosition: {
                                $ref: '#/components/schemas/GridPosition'
                            },
                            configuration: {
                                type: 'object',
                                description: 'Widget-specific configuration'
                            }
                        },
                        required: [
                            'pageLayoutTabId',
                            'title',
                            'gridPosition'
                        ]
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}`
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForUpdate`] = {
                        type: 'object',
                        description: `A page layout widget for update`,
                        properties: {
                            title: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'VIEW',
                                    'IFRAME',
                                    'FIELDS',
                                    'GRAPH'
                                ]
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            gridPosition: {
                                $ref: '#/components/schemas/GridPosition'
                            },
                            configuration: {
                                type: 'object',
                                description: 'Widget-specific configuration'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.nameSingular)}ForResponse`] = {
                        type: 'object',
                        description: `A page layout widget`,
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid'
                            },
                            pageLayoutTabId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            title: {
                                type: 'string'
                            },
                            type: {
                                type: 'string',
                                enum: [
                                    'VIEW',
                                    'IFRAME',
                                    'FIELDS',
                                    'GRAPH'
                                ]
                            },
                            objectMetadataId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            gridPosition: {
                                $ref: '#/components/schemas/GridPosition'
                            },
                            configuration: {
                                type: 'object',
                                description: 'Widget-specific configuration'
                            },
                            workspaceId: {
                                type: 'string',
                                format: 'uuid'
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time'
                            },
                            deletedAt: {
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    };
                    schemas[`${(0, _utils.capitalize)(item.namePlural)}ForResponse`] = {
                        type: 'array',
                        description: `A list of ${item.namePlural}`,
                        items: {
                            $ref: `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`
                        }
                    };
                    return schemas;
                }
        }
        return schemas;
    }, {});
};

//# sourceMappingURL=components.utils.js.map