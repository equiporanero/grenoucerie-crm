"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldMetadataToolsFactory", {
    enumerable: true,
    get: function() {
        return FieldMetadataToolsFactory;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _zod = require("zod");
const _formatvalidationerrorsutil = require("../../../core-modules/tool-provider/utils/format-validation-errors.util");
const _fieldmetadataservice = require("../services/field-metadata.service");
const _fromflatfieldmetadatatofieldmetadatadtoutil = require("../../flat-field-metadata/utils/from-flat-field-metadata-to-field-metadata-dto.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const GetFieldMetadataInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().optional().describe('Unique identifier for the field metadata. If provided, returns a single field.'),
    objectMetadataId: _zod.z.string().uuid().optional().describe('Filter fields by object metadata ID.'),
    limit: _zod.z.number().int().min(1).max(100).default(100).describe('Maximum number of fields to return.')
});
const CreateFieldMetadataInputSchema = _zod.z.object({
    objectMetadataId: _zod.z.string().uuid().describe('ID of the object to add the field to'),
    type: _zod.z.nativeEnum(_types.FieldMetadataType).describe('Field type (e.g., TEXT, NUMBER, BOOLEAN, DATE_TIME, RELATION, etc.)'),
    name: _zod.z.string().describe('Internal name of the field (camelCase)'),
    label: _zod.z.string().describe('Display label of the field'),
    description: _zod.z.string().optional().describe('Description of the field'),
    icon: _zod.z.string().optional().describe('Icon identifier for the field'),
    isNullable: _zod.z.boolean().optional().describe('Whether the field can be null'),
    isUnique: _zod.z.boolean().optional().describe('Whether the field value must be unique'),
    defaultValue: _zod.z.unknown().optional().describe('Default value for the field'),
    options: _zod.z.unknown().optional().describe('Options for SELECT/MULTI_SELECT fields'),
    settings: _zod.z.unknown().optional().describe('Additional settings for the field'),
    isLabelSyncedWithName: _zod.z.boolean().optional().describe('Whether label should sync with name changes'),
    isRemoteCreation: _zod.z.boolean().optional().describe('Whether this is a remote field creation'),
    relationCreationPayload: _zod.z.unknown().optional().describe('Payload for creating relation fields')
});
const UpdateFieldMetadataInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the field to update'),
    name: _zod.z.string().optional().describe('Internal name of the field'),
    label: _zod.z.string().optional().describe('Display label of the field'),
    description: _zod.z.string().optional().describe('Description of the field'),
    icon: _zod.z.string().optional().describe('Icon identifier for the field'),
    isActive: _zod.z.boolean().optional().describe('Whether the field is active'),
    isNullable: _zod.z.boolean().optional().describe('Whether the field can be null'),
    isUnique: _zod.z.boolean().optional().describe('Whether the field value must be unique'),
    defaultValue: _zod.z.unknown().optional().describe('Default value for the field'),
    options: _zod.z.unknown().optional().describe('Options for SELECT/MULTI_SELECT fields'),
    settings: _zod.z.unknown().optional().describe('Additional settings for the field'),
    isLabelSyncedWithName: _zod.z.boolean().optional().describe('Whether label should sync with name changes')
});
const DeleteFieldMetadataInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the field to delete')
});
const CreateManyFieldMetadataInputSchema = _zod.z.object({
    fields: _zod.z.array(CreateFieldMetadataInputSchema).min(1).max(20).describe('Array of field metadata to create (1-20 items).')
});
const UpdateManyFieldMetadataInputSchema = _zod.z.object({
    fields: _zod.z.array(UpdateFieldMetadataInputSchema).min(1).max(20).describe('Array of field metadata updates to apply (1-20 items).')
});
const CreateManyRelationFieldsInputSchema = _zod.z.object({
    relations: _zod.z.array(_zod.z.object({
        objectMetadataId: _zod.z.string().uuid().describe('ID of the source object to add the relation field to'),
        name: _zod.z.string().describe('Internal name of the relation field (camelCase)'),
        label: _zod.z.string().describe('Display label of the relation field'),
        description: _zod.z.string().optional().describe('Description of the relation field'),
        icon: _zod.z.string().optional().describe('Icon identifier for the relation field'),
        type: _zod.z.nativeEnum(_types.RelationType).describe('Relation type: MANY_TO_ONE or ONE_TO_MANY'),
        targetObjectMetadataId: _zod.z.string().uuid().describe('ID of the target object this relation points to'),
        targetFieldLabel: _zod.z.string().describe('Display label for the inverse relation field on the target object'),
        targetFieldIcon: _zod.z.string().describe('Icon for the inverse relation field (e.g. IconSomething)')
    })).min(1).max(20).describe('Array of relation fields to create (1-20 items).')
});
let FieldMetadataToolsFactory = class FieldMetadataToolsFactory {
    generateTools(workspaceId) {
        return {
            get_field_metadata: {
                description: 'Find fields metadata. Retrieve information about the fields of objects in the workspace data model.',
                inputSchema: GetFieldMetadataInputSchema,
                execute: async (parameters)=>{
                    return this.fieldMetadataService.query({
                        filter: {
                            workspaceId: {
                                eq: workspaceId
                            },
                            ...parameters.id ? {
                                id: {
                                    eq: parameters.id
                                }
                            } : {},
                            ...parameters.objectMetadataId ? {
                                objectMetadataId: {
                                    eq: parameters.objectMetadataId
                                }
                            } : {}
                        },
                        paging: {
                            limit: parameters.limit ?? 100
                        }
                    });
                }
            },
            create_field_metadata: {
                description: 'Create a new field metadata on an object. Specify the objectMetadataId and field properties.',
                inputSchema: CreateFieldMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        const flatFieldMetadata = await this.fieldMetadataService.createOneField({
                            createFieldInput: parameters,
                            workspaceId
                        });
                        return (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatFieldMetadata);
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            update_field_metadata: {
                description: 'Update an existing field metadata. Provide the field ID and the properties to update.',
                inputSchema: UpdateFieldMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        const { id, ...update } = parameters;
                        const flatFieldMetadata = await this.fieldMetadataService.updateOneField({
                            updateFieldInput: {
                                id,
                                ...update
                            },
                            workspaceId
                        });
                        return (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatFieldMetadata);
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            delete_field_metadata: {
                description: 'Delete a field metadata by its ID.',
                inputSchema: DeleteFieldMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        const flatFieldMetadata = await this.fieldMetadataService.deleteOneField({
                            deleteOneFieldInput: {
                                id: parameters.id
                            },
                            workspaceId
                        });
                        return (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatFieldMetadata);
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            create_many_field_metadata: {
                description: 'Create multiple field metadata at once on one or more objects. More efficient than calling create_field_metadata multiple times. Each item follows the same schema as create_field_metadata.',
                inputSchema: CreateManyFieldMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        await this.fieldMetadataService.createManyFields({
                            createFieldInputs: parameters.fields,
                            workspaceId
                        });
                        return true;
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            update_many_field_metadata: {
                description: 'Update multiple field metadata at once. More efficient than calling update_field_metadata multiple times. Each item must include the field ID and the properties to update.',
                inputSchema: UpdateManyFieldMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        await Promise.all(parameters.fields.map(async ({ id, ...update })=>{
                            await this.fieldMetadataService.updateOneField({
                                updateFieldInput: {
                                    id,
                                    ...update
                                },
                                workspaceId
                            });
                        }));
                        return true;
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            create_many_relation_fields: {
                description: 'Create multiple relation fields between objects at once. This is the recommended way to add relations after creating objects and non-relation fields. Each item specifies the source object, target object, relation type, and labels for both sides of the relation.',
                inputSchema: CreateManyRelationFieldsInputSchema,
                execute: async (parameters)=>{
                    try {
                        await this.fieldMetadataService.createManyFields({
                            createFieldInputs: parameters.relations.map((relation)=>({
                                    objectMetadataId: relation.objectMetadataId,
                                    type: _types.FieldMetadataType.RELATION,
                                    name: relation.name,
                                    label: relation.label,
                                    description: relation.description,
                                    icon: relation.icon,
                                    relationCreationPayload: {
                                        type: relation.type,
                                        targetObjectMetadataId: relation.targetObjectMetadataId,
                                        targetFieldLabel: relation.targetFieldLabel,
                                        targetFieldIcon: relation.targetFieldIcon
                                    }
                                })),
                            workspaceId
                        });
                        return true;
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            }
        };
    }
    constructor(fieldMetadataService){
        this.fieldMetadataService = fieldMetadataService;
    }
};
FieldMetadataToolsFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fieldmetadataservice.FieldMetadataService === "undefined" ? Object : _fieldmetadataservice.FieldMetadataService
    ])
], FieldMetadataToolsFactory);

//# sourceMappingURL=field-metadata-tools.factory.js.map