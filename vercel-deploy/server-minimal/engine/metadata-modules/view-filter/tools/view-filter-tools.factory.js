"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterToolsFactory", {
    enumerable: true,
    get: function() {
        return ViewFilterToolsFactory;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _zod = require("zod");
const _formatvalidationerrorsutil = require("../../../core-modules/tool-provider/utils/format-validation-errors.util");
const _viewfilterservice = require("../services/view-filter.service");
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
const VIEW_FILTER_OPERAND_OPTIONS = Object.values(_types.ViewFilterOperand);
const GetViewFiltersInputSchema = _zod.z.object({
    viewId: _zod.z.string().uuid().describe('ID of the view to list filters for. Obtain this from get_views.')
});
const CreateViewFilterInputSchema = _zod.z.object({
    viewId: _zod.z.string().uuid().describe('ID of the view to add the filter to'),
    fieldMetadataId: _zod.z.string().uuid().describe('ID of the field to filter on. Use list_object_metadata_items to find field IDs.'),
    operand: _zod.z.enum(VIEW_FILTER_OPERAND_OPTIONS).describe('Filter operator. Valid operators per field type — TEXT/EMAILS/FULL_NAME: CONTAINS, DOES_NOT_CONTAIN, IS_EMPTY, IS_NOT_EMPTY. NUMBER/NUMERIC: IS, IS_NOT, GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL, IS_EMPTY, IS_NOT_EMPTY. CURRENCY: GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL, IS_EMPTY, IS_NOT_EMPTY. DATE/DATE_TIME: IS, IS_RELATIVE, IS_IN_PAST, IS_IN_FUTURE, IS_TODAY, IS_BEFORE, IS_AFTER, IS_EMPTY, IS_NOT_EMPTY. SELECT: IS, IS_NOT, IS_EMPTY, IS_NOT_EMPTY. MULTI_SELECT/ARRAY: CONTAINS, DOES_NOT_CONTAIN, IS_EMPTY, IS_NOT_EMPTY. RELATION: IS, IS_NOT, IS_EMPTY, IS_NOT_EMPTY. BOOLEAN: IS.'),
    value: _zod.z.union([
        _zod.z.string(),
        _zod.z.number(),
        _zod.z.boolean(),
        _zod.z.array(_zod.z.string()),
        _zod.z.record(_zod.z.string(), _zod.z.unknown())
    ]).describe('Filter value. Format depends on operand and field type: string for TEXT/SELECT, number for NUMBER/CURRENCY, array of option values for MULTI_SELECT IS/IS_NOT, empty string "" for IS_EMPTY/IS_NOT_EMPTY operators.'),
    subFieldName: _zod.z.string().optional().describe('Required for composite fields — e.g. "amountMicros" for CURRENCY, "addressCity" for ADDRESS, "firstName" or "lastName" for FULL_NAME.')
});
const CreateManyViewFiltersInputSchema = _zod.z.object({
    filters: _zod.z.array(CreateViewFilterInputSchema).min(1).max(20).describe('Array of filters to create (1-20 items)')
});
const UpdateViewFilterInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the view filter to update'),
    operand: _zod.z.enum(VIEW_FILTER_OPERAND_OPTIONS).optional().describe('New filter operator'),
    value: _zod.z.union([
        _zod.z.string(),
        _zod.z.number(),
        _zod.z.boolean(),
        _zod.z.array(_zod.z.string()),
        _zod.z.record(_zod.z.string(), _zod.z.unknown())
    ]).optional().describe('New filter value'),
    subFieldName: _zod.z.string().optional().describe('New sub-field name for composite fields')
});
const DeleteViewFilterInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the view filter to delete')
});
let ViewFilterToolsFactory = class ViewFilterToolsFactory {
    generateReadTools(workspaceId) {
        return {
            get_view_filters: {
                description: 'List all filters applied to a view. Each filter defines a condition that records must match to appear in the view.',
                inputSchema: GetViewFiltersInputSchema,
                execute: async (parameters)=>{
                    const filters = await this.viewFilterService.findByViewId(workspaceId, parameters.viewId);
                    return filters.map((filter)=>({
                            id: filter.id,
                            viewId: filter.viewId,
                            fieldMetadataId: filter.fieldMetadataId,
                            operand: filter.operand,
                            value: filter.value,
                            subFieldName: filter.subFieldName,
                            positionInViewFilterGroup: filter.positionInViewFilterGroup
                        }));
                }
            }
        };
    }
    generateWriteTools(workspaceId) {
        return {
            create_view_filter: {
                description: 'Add a filter to a view. Use list_object_metadata_items to get fieldMetadataId values.',
                inputSchema: CreateViewFilterInputSchema,
                execute: async (parameters)=>{
                    try {
                        const filter = await this.viewFilterService.createOne({
                            createViewFilterInput: {
                                viewId: parameters.viewId,
                                fieldMetadataId: parameters.fieldMetadataId,
                                operand: parameters.operand,
                                value: parameters.value,
                                subFieldName: parameters.subFieldName
                            },
                            workspaceId
                        });
                        return {
                            id: filter.id,
                            viewId: filter.viewId,
                            fieldMetadataId: filter.fieldMetadataId,
                            operand: filter.operand,
                            value: filter.value
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            create_many_view_filters: {
                description: 'Add multiple filters to a view in one call. Use list_object_metadata_items to get fieldMetadataId values.',
                inputSchema: CreateManyViewFiltersInputSchema,
                execute: async (parameters)=>{
                    const results = [];
                    for (const filterInput of parameters.filters){
                        try {
                            const filter = await this.viewFilterService.createOne({
                                createViewFilterInput: {
                                    viewId: filterInput.viewId,
                                    fieldMetadataId: filterInput.fieldMetadataId,
                                    operand: filterInput.operand,
                                    value: filterInput.value,
                                    subFieldName: filterInput.subFieldName
                                },
                                workspaceId
                            });
                            results.push({
                                id: filter.id,
                                viewId: filter.viewId,
                                fieldMetadataId: filter.fieldMetadataId,
                                operand: filter.operand
                            });
                        } catch (error) {
                            if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                                throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                            }
                            throw error;
                        }
                    }
                    return {
                        created: results
                    };
                }
            },
            update_view_filter: {
                description: 'Update a filter on a view. Use get_view_filters to find the filter ID.',
                inputSchema: UpdateViewFilterInputSchema,
                execute: async (parameters)=>{
                    try {
                        const filter = await this.viewFilterService.updateOne({
                            updateViewFilterInput: {
                                id: parameters.id,
                                update: {
                                    operand: parameters.operand,
                                    value: parameters.value,
                                    subFieldName: parameters.subFieldName
                                }
                            },
                            workspaceId
                        });
                        return {
                            id: filter.id,
                            viewId: filter.viewId,
                            fieldMetadataId: filter.fieldMetadataId,
                            operand: filter.operand,
                            value: filter.value
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            delete_view_filter: {
                description: 'Remove a filter from a view. Use get_view_filters to find the filter ID.',
                inputSchema: DeleteViewFilterInputSchema,
                execute: async (parameters)=>{
                    try {
                        const filter = await this.viewFilterService.deleteOne({
                            deleteViewFilterInput: {
                                id: parameters.id
                            },
                            workspaceId
                        });
                        return {
                            id: filter.id,
                            deleted: true
                        };
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
    constructor(viewFilterService){
        this.viewFilterService = viewFilterService;
    }
};
ViewFilterToolsFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewfilterservice.ViewFilterService === "undefined" ? Object : _viewfilterservice.ViewFilterService
    ])
], ViewFilterToolsFactory);

//# sourceMappingURL=view-filter-tools.factory.js.map