"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewSortToolsFactory", {
    enumerable: true,
    get: function() {
        return ViewSortToolsFactory;
    }
});
const _common = require("@nestjs/common");
const _zod = require("zod");
const _formatvalidationerrorsutil = require("../../../core-modules/tool-provider/utils/format-validation-errors.util");
const _types = require("twenty-shared/types");
const _viewsortservice = require("../services/view-sort.service");
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
const VIEW_SORT_DIRECTION_OPTIONS = Object.values(_types.ViewSortDirection);
const GetViewSortsInputSchema = _zod.z.object({
    viewId: _zod.z.string().uuid().describe('ID of the view to list sorts for. Obtain this from get_views.')
});
const CreateViewSortInputSchema = _zod.z.object({
    viewId: _zod.z.string().uuid().describe('ID of the view to add the sort to'),
    fieldMetadataId: _zod.z.string().uuid().describe('ID of the field to sort by. Use list_object_metadata_items to find field IDs.'),
    direction: _zod.z.enum(VIEW_SORT_DIRECTION_OPTIONS).default(_types.ViewSortDirection.ASC).describe('Sort direction: ASC (ascending) or DESC (descending)')
});
const CreateManyViewSortsInputSchema = _zod.z.object({
    sorts: _zod.z.array(CreateViewSortInputSchema).min(1).max(10).describe('Array of sorts to create (1-10 items)')
});
const UpdateViewSortInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the view sort to update'),
    direction: _zod.z.enum(VIEW_SORT_DIRECTION_OPTIONS).optional().describe('New sort direction: ASC or DESC')
});
const DeleteViewSortInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('ID of the view sort to delete')
});
let ViewSortToolsFactory = class ViewSortToolsFactory {
    generateReadTools(workspaceId) {
        return {
            get_view_sorts: {
                description: 'List all sorts applied to a view. Each sort defines a field and direction that determines the order records appear in the view.',
                inputSchema: GetViewSortsInputSchema,
                execute: async (parameters)=>{
                    const sorts = await this.viewSortService.findByViewId(workspaceId, parameters.viewId);
                    return sorts.map((sort)=>({
                            id: sort.id,
                            viewId: sort.viewId,
                            fieldMetadataId: sort.fieldMetadataId,
                            direction: sort.direction
                        }));
                }
            }
        };
    }
    generateWriteTools(workspaceId) {
        return {
            create_view_sort: {
                description: 'Add a sort to a view. Use list_object_metadata_items to get fieldMetadataId values.',
                inputSchema: CreateViewSortInputSchema,
                execute: async (parameters)=>{
                    try {
                        const sort = await this.viewSortService.createOne({
                            createViewSortInput: {
                                viewId: parameters.viewId,
                                fieldMetadataId: parameters.fieldMetadataId,
                                direction: parameters.direction
                            },
                            workspaceId
                        });
                        return {
                            id: sort.id,
                            viewId: sort.viewId,
                            fieldMetadataId: sort.fieldMetadataId,
                            direction: sort.direction
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            create_many_view_sorts: {
                description: 'Add multiple sorts to a view in one call. Use list_object_metadata_items to get fieldMetadataId values.',
                inputSchema: CreateManyViewSortsInputSchema,
                execute: async (parameters)=>{
                    const results = [];
                    for (const sortInput of parameters.sorts){
                        try {
                            const sort = await this.viewSortService.createOne({
                                createViewSortInput: {
                                    viewId: sortInput.viewId,
                                    fieldMetadataId: sortInput.fieldMetadataId,
                                    direction: sortInput.direction
                                },
                                workspaceId
                            });
                            results.push({
                                id: sort.id,
                                viewId: sort.viewId,
                                fieldMetadataId: sort.fieldMetadataId,
                                direction: sort.direction
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
            update_view_sort: {
                description: 'Update a sort on a view. Use get_view_sorts to find the sort ID.',
                inputSchema: UpdateViewSortInputSchema,
                execute: async (parameters)=>{
                    try {
                        const sort = await this.viewSortService.updateOne({
                            updateViewSortInput: {
                                id: parameters.id,
                                update: {
                                    direction: parameters.direction
                                }
                            },
                            workspaceId
                        });
                        return {
                            id: sort.id,
                            viewId: sort.viewId,
                            fieldMetadataId: sort.fieldMetadataId,
                            direction: sort.direction
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            delete_view_sort: {
                description: 'Remove a sort from a view. Use get_view_sorts to find the sort ID.',
                inputSchema: DeleteViewSortInputSchema,
                execute: async (parameters)=>{
                    try {
                        const sort = await this.viewSortService.deleteOne({
                            deleteViewSortInput: {
                                id: parameters.id
                            },
                            workspaceId
                        });
                        return {
                            id: sort.id,
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
    constructor(viewSortService){
        this.viewSortService = viewSortService;
    }
};
ViewSortToolsFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewsortservice.ViewSortService === "undefined" ? Object : _viewsortservice.ViewSortService
    ])
], ViewSortToolsFactory);

//# sourceMappingURL=view-sort-tools.factory.js.map