"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldToolsFactory", {
    enumerable: true,
    get: function() {
        return ViewFieldToolsFactory;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _zod = require("zod");
const _formatvalidationerrorsutil = require("../../../core-modules/tool-provider/utils/format-validation-errors.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _viewfieldservice = require("../services/view-field.service");
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
const GetViewFieldsInputSchema = _zod.z.object({
    viewId: _zod.z.string().uuid().describe('The ID of the view to list fields for. Obtain this from get_views.')
});
const CreateViewFieldInputSchema = _zod.z.object({
    viewId: _zod.z.string().uuid().describe('The ID of the view to add the field to.'),
    fieldMetadataId: _zod.z.string().uuid().describe('The ID of the field metadata to add. Use get_field_metadata to find available fields.'),
    isVisible: _zod.z.boolean().optional().default(true).describe('Whether the field is visible in the view.'),
    size: _zod.z.number().int().optional().default(150).describe('Column width in pixels.'),
    position: _zod.z.number().optional().default(0).describe('Position of the field in the view (0-based).'),
    aggregateOperation: _zod.z.enum(Object.values(_types.AggregateOperations)).optional().describe('Aggregate operation for this field (e.g., "SUM", "AVG", "COUNT").')
});
const UpdateViewFieldInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('The ID of the view field to update. Obtain this from get_view_fields.'),
    isVisible: _zod.z.boolean().optional().describe('Whether the field is visible.'),
    size: _zod.z.number().int().optional().describe('Column width in pixels.'),
    position: _zod.z.number().optional().describe('Position of the field.'),
    aggregateOperation: _zod.z.enum(Object.values(_types.AggregateOperations)).optional().describe('Aggregate operation for this field.')
});
const DeleteViewFieldInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('The ID of the view field to delete. Obtain this from get_view_fields.')
});
const CreateManyViewFieldsInputSchema = _zod.z.object({
    viewFields: _zod.z.array(CreateViewFieldInputSchema).min(1).max(50).describe('Array of view fields to create (1-50 items).')
});
const UpdateManyViewFieldsInputSchema = _zod.z.object({
    viewFields: _zod.z.array(UpdateViewFieldInputSchema).min(1).max(50).describe('Array of view field updates to apply (1-50 items).')
});
let ViewFieldToolsFactory = class ViewFieldToolsFactory {
    async resolveFieldName(workspaceId, fieldMetadataId) {
        const { flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        const universalIdentifier = flatFieldMetadataMaps.universalIdentifierById[fieldMetadataId];
        if (!universalIdentifier) {
            return undefined;
        }
        return flatFieldMetadataMaps.byUniversalIdentifier[universalIdentifier]?.name;
    }
    generateReadTools(workspaceId) {
        return {
            get_view_fields: {
                description: 'List the columns (fields) displayed in a specific view. A view field controls which columns appear in a table or kanban view, their visibility, width, position, and aggregate operation. Use get_views first to find the view ID, then call this to inspect its column configuration.',
                inputSchema: GetViewFieldsInputSchema,
                execute: async (parameters)=>{
                    const viewFields = await this.viewFieldService.findByViewId(workspaceId, parameters.viewId);
                    const viewFieldsWithNames = await Promise.all(viewFields.map(async (viewField)=>{
                        const fieldName = await this.resolveFieldName(workspaceId, viewField.fieldMetadataId);
                        return {
                            id: viewField.id,
                            fieldMetadataId: viewField.fieldMetadataId,
                            fieldName: fieldName ?? null,
                            viewId: viewField.viewId,
                            isVisible: viewField.isVisible,
                            size: viewField.size,
                            position: viewField.position,
                            aggregateOperation: viewField.aggregateOperation
                        };
                    }));
                    return viewFieldsWithNames;
                }
            }
        };
    }
    generateWriteTools(workspaceId) {
        return {
            create_view_field: {
                description: 'Add a new column to a view. View fields define which columns are shown in table or kanban views. First call get_field_metadata to find the fieldMetadataId of the column to add, and get_views to find the target viewId.',
                inputSchema: CreateViewFieldInputSchema,
                execute: async (parameters)=>{
                    try {
                        const viewField = await this.viewFieldService.createOne({
                            createViewFieldInput: {
                                viewId: parameters.viewId,
                                fieldMetadataId: parameters.fieldMetadataId,
                                isVisible: parameters.isVisible ?? true,
                                size: parameters.size ?? 150,
                                position: parameters.position ?? 0,
                                aggregateOperation: parameters.aggregateOperation
                            },
                            workspaceId
                        });
                        return {
                            id: viewField.id,
                            fieldMetadataId: viewField.fieldMetadataId,
                            viewId: viewField.viewId,
                            isVisible: viewField.isVisible,
                            size: viewField.size,
                            position: viewField.position,
                            aggregateOperation: viewField.aggregateOperation
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            update_view_field: {
                description: "Update properties of a column in a view. You can change its visibility, width (size in pixels), display position, or aggregate operation. Use get_view_fields to find the view field ID. Constraints: position must not be -1, must not precede the label identifier field, and must not conflict with another field's position.",
                inputSchema: UpdateViewFieldInputSchema,
                execute: async (parameters)=>{
                    try {
                        const viewField = await this.viewFieldService.updateOne({
                            updateViewFieldInput: {
                                id: parameters.id,
                                update: {
                                    isVisible: parameters.isVisible,
                                    size: parameters.size,
                                    position: parameters.position,
                                    aggregateOperation: parameters.aggregateOperation
                                }
                            },
                            workspaceId
                        });
                        return {
                            id: viewField.id,
                            fieldMetadataId: viewField.fieldMetadataId,
                            viewId: viewField.viewId,
                            isVisible: viewField.isVisible,
                            size: viewField.size,
                            position: viewField.position,
                            aggregateOperation: viewField.aggregateOperation
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            delete_view_field: {
                description: "Remove a column from a view. This removes the field from the view's displayed columns. Use get_view_fields to find the view field ID to delete.",
                inputSchema: DeleteViewFieldInputSchema,
                execute: async (parameters)=>{
                    try {
                        const viewField = await this.viewFieldService.deleteOne({
                            deleteViewFieldInput: {
                                id: parameters.id
                            },
                            workspaceId
                        });
                        return {
                            id: viewField.id,
                            deleted: true
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            create_many_view_fields: {
                description: 'Add multiple columns to a view at once. More efficient than calling create_view_field multiple times. Each item follows the same schema as create_view_field. All view fields can target the same or different views.',
                inputSchema: CreateManyViewFieldsInputSchema,
                execute: async (parameters)=>{
                    try {
                        await this.viewFieldService.createMany({
                            createViewFieldInputs: parameters.viewFields.map((viewField)=>({
                                    viewId: viewField.viewId,
                                    fieldMetadataId: viewField.fieldMetadataId,
                                    isVisible: viewField.isVisible ?? true,
                                    size: viewField.size ?? 150,
                                    position: viewField.position ?? 0,
                                    aggregateOperation: viewField.aggregateOperation
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
            },
            update_many_view_fields: {
                description: 'Update multiple columns in a view at once. More efficient than calling update_view_field multiple times. Each item must include the view field ID and properties to update. Same constraints as update_view_field apply to each item.',
                inputSchema: UpdateManyViewFieldsInputSchema,
                execute: async (parameters)=>{
                    try {
                        await Promise.all(parameters.viewFields.map(async (viewField)=>{
                            await this.viewFieldService.updateOne({
                                updateViewFieldInput: {
                                    id: viewField.id,
                                    update: {
                                        isVisible: viewField.isVisible,
                                        size: viewField.size,
                                        position: viewField.position,
                                        aggregateOperation: viewField.aggregateOperation
                                    }
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
    constructor(viewFieldService, flatEntityMapsCacheService){
        this.viewFieldService = viewFieldService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
    }
};
ViewFieldToolsFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfieldservice.ViewFieldService === "undefined" ? Object : _viewfieldservice.ViewFieldService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], ViewFieldToolsFactory);

//# sourceMappingURL=view-field-tools.factory.js.map