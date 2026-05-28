"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataToolsFactory", {
    enumerable: true,
    get: function() {
        return ObjectMetadataToolsFactory;
    }
});
const _common = require("@nestjs/common");
const _zod = require("zod");
const _formatvalidationerrorsutil = require("../../../core-modules/tool-provider/utils/format-validation-errors.util");
const _fromflatobjectmetadatatoobjectmetadatadtoutil = require("../../flat-object-metadata/utils/from-flat-object-metadata-to-object-metadata-dto.util");
const _objectmetadataservice = require("../object-metadata.service");
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
const GetObjectMetadataInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().optional().describe('Unique identifier for the object metadata. If provided, returns a single object.'),
    limit: _zod.z.number().int().min(1).max(100).default(100).describe('Maximum number of objects to return.')
});
const CreateObjectMetadataInputSchema = _zod.z.object({
    nameSingular: _zod.z.string().describe('Singular name for the object (e.g., "company")'),
    namePlural: _zod.z.string().describe('Plural name for the object (e.g., "companies")'),
    labelSingular: _zod.z.string().describe('Display label in singular form (e.g., "Company")'),
    labelPlural: _zod.z.string().describe('Display label in plural form (e.g., "Companies")'),
    description: _zod.z.string().optional().describe('Description of the object'),
    icon: _zod.z.string().optional().describe('Icon identifier for the object'),
    shortcut: _zod.z.string().optional().describe('Keyboard shortcut for the object'),
    isRemote: _zod.z.boolean().optional().describe('Whether this is a remote object'),
    isLabelSyncedWithName: _zod.z.boolean().optional().describe('Whether label should sync with name changes')
});
const UpdateObjectMetadataInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the object to update'),
    labelSingular: _zod.z.string().optional().describe('Display label in singular form'),
    labelPlural: _zod.z.string().optional().describe('Display label in plural form'),
    nameSingular: _zod.z.string().optional().describe('Singular name for the object'),
    namePlural: _zod.z.string().optional().describe('Plural name for the object'),
    description: _zod.z.string().optional().describe('Description of the object'),
    icon: _zod.z.string().optional().describe('Icon identifier for the object'),
    shortcut: _zod.z.string().optional().describe('Keyboard shortcut for the object'),
    isActive: _zod.z.boolean().optional().describe('Whether the object is active'),
    labelIdentifierFieldMetadataId: _zod.z.string().uuid().optional().describe('ID of the field used as label identifier'),
    imageIdentifierFieldMetadataId: _zod.z.string().uuid().optional().describe('ID of the field used as image identifier'),
    isLabelSyncedWithName: _zod.z.boolean().optional().describe('Whether label should sync with name changes')
});
const DeleteObjectMetadataInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the object to delete')
});
const CreateManyObjectMetadataInputSchema = _zod.z.object({
    objects: _zod.z.array(CreateObjectMetadataInputSchema).min(1).max(20).describe('Array of object metadata to create (1-20 items).')
});
const UpdateManyObjectMetadataInputSchema = _zod.z.object({
    objects: _zod.z.array(UpdateObjectMetadataInputSchema).min(1).max(20).describe('Array of object metadata updates to apply (1-20 items).')
});
let ObjectMetadataToolsFactory = class ObjectMetadataToolsFactory {
    generateTools(workspaceId) {
        return {
            get_object_metadata: {
                description: 'Find objects metadata. Retrieve information about the data model objects in the workspace.',
                inputSchema: GetObjectMetadataInputSchema,
                execute: async (parameters)=>{
                    const flatObjectMetadatas = await this.objectMetadataService.findManyWithinWorkspace(workspaceId, {
                        ...parameters.id ? {
                            where: {
                                id: parameters.id
                            }
                        } : {},
                        take: parameters.limit ?? 100
                    });
                    return flatObjectMetadatas.map((flatObjectMetadata)=>(0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatObjectMetadata));
                }
            },
            create_object_metadata: {
                description: 'Create a new object metadata in the workspace data model.',
                inputSchema: CreateObjectMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        const flatObjectMetadata = await this.objectMetadataService.createOneObject({
                            createObjectInput: parameters,
                            workspaceId
                        });
                        return (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatObjectMetadata);
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            update_object_metadata: {
                description: 'Update an existing object metadata. Provide the object ID and the fields to update.',
                inputSchema: UpdateObjectMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        const { id, ...update } = parameters;
                        const flatObjectMetadata = await this.objectMetadataService.updateOneObject({
                            updateObjectInput: {
                                id,
                                update
                            },
                            workspaceId
                        });
                        return (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatObjectMetadata);
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            delete_object_metadata: {
                description: 'Delete an object metadata by its ID. This will also delete all associated fields.',
                inputSchema: DeleteObjectMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        const flatObjectMetadata = await this.objectMetadataService.deleteOneObject({
                            deleteObjectInput: {
                                id: parameters.id
                            },
                            workspaceId
                        });
                        return (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatObjectMetadata);
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            create_many_object_metadata: {
                description: 'Create multiple object metadata at once in the workspace data model. More efficient than calling create_object_metadata multiple times. Each item follows the same schema as create_object_metadata.',
                inputSchema: CreateManyObjectMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        await Promise.all(parameters.objects.map(async (createObjectInput)=>{
                            await this.objectMetadataService.createOneObject({
                                createObjectInput: createObjectInput,
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
            update_many_object_metadata: {
                description: 'Update multiple object metadata at once. More efficient than calling update_object_metadata multiple times. Each item must include the object ID and the properties to update.',
                inputSchema: UpdateManyObjectMetadataInputSchema,
                execute: async (parameters)=>{
                    try {
                        await Promise.all(parameters.objects.map(async ({ id, ...update })=>{
                            await this.objectMetadataService.updateOneObject({
                                updateObjectInput: {
                                    id,
                                    update
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
            }
        };
    }
    constructor(objectMetadataService){
        this.objectMetadataService = objectMetadataService;
    }
};
ObjectMetadataToolsFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadataservice.ObjectMetadataService === "undefined" ? Object : _objectmetadataservice.ObjectMetadataService
    ])
], ObjectMetadataToolsFactory);

//# sourceMappingURL=object-metadata-tools.factory.js.map