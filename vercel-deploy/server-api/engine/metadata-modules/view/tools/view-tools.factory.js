"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewToolsFactory", {
    enumerable: true,
    get: function() {
        return ViewToolsFactory;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _zod = require("zod");
const _formatvalidationerrorsutil = require("../../../core-modules/tool-provider/utils/format-validation-errors.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _buildobjectidbynamemapsutil = require("../../flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _viewfieldservice = require("../../view-field/services/view-field.service");
const _viewqueryparamsservice = require("../services/view-query-params.service");
const _viewservice = require("../services/view.service");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const GetViewsInputSchema = _zod.z.object({
    objectNameSingular: _zod.z.string().optional().describe('Filter views by object name (e.g., "task", "person", "company"). If omitted, returns all views.'),
    limit: _zod.z.number().int().min(1).max(100).default(50).describe('Maximum views to return.')
});
const GetViewQueryParamsInputSchema = _zod.z.object({
    viewId: _zod.z.string().uuid().describe('ID of the view to get query parameters for.')
});
const CreateViewInputSchema = _zod.z.object({
    name: _zod.z.string().describe('View name'),
    objectNameSingular: _zod.z.string().describe('Object name this view is for (e.g., "task", "person", "company")'),
    icon: _zod.z.string().optional().default('IconList').describe('Icon identifier (e.g., "IconList", "IconCheckbox")'),
    type: _zod.z.enum([
        _types.ViewType.TABLE,
        _types.ViewType.KANBAN,
        _types.ViewType.CALENDAR
    ]).optional().default(_types.ViewType.TABLE).describe('View type'),
    visibility: _zod.z.enum([
        _types.ViewVisibility.WORKSPACE,
        _types.ViewVisibility.UNLISTED
    ]).optional().default(_types.ViewVisibility.WORKSPACE).describe('View visibility'),
    mainGroupByFieldName: _zod.z.string().optional().describe('Field name to group by (required for KANBAN views, must be a SELECT field, e.g., "stage", "status")'),
    kanbanAggregateOperation: _zod.z.enum(Object.values(_types.AggregateOperations)).optional().describe('Aggregate operation for kanban columns (e.g., "SUM", "AVG", "COUNT")'),
    kanbanAggregateOperationFieldName: _zod.z.string().optional().describe('Field name for the kanban aggregate operation (e.g., "amount")'),
    calendarLayout: _zod.z.enum([
        _types.ViewCalendarLayout.DAY,
        _types.ViewCalendarLayout.WEEK,
        _types.ViewCalendarLayout.MONTH
    ]).optional().describe('Calendar layout (required for CALENDAR views, e.g., "DAY", "WEEK", "MONTH")'),
    calendarFieldName: _zod.z.string().optional().describe('Date field name to use for the calendar (required for CALENDAR views, must be a DATE or DATE_TIME field, e.g., "createdAt", "dueAt")'),
    fieldNames: _zod.z.array(_zod.z.string()).optional().describe('Field names to display in the view as columns (for TABLE) or cards (for KANBAN/CALENDAR). Fields are displayed in the order provided. Use get_field_metadata to find available field names.')
});
const UpdateViewInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('View ID to update'),
    name: _zod.z.string().optional().describe('New view name'),
    icon: _zod.z.string().optional().describe('New icon identifier')
});
const DeleteViewInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('View ID to delete')
});
let ViewToolsFactory = class ViewToolsFactory {
    async resolveObjectMetadataId(workspaceId, objectNameSingular) {
        const { flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const { idByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        const objectMetadataId = idByNameSingular[objectNameSingular];
        if (!objectMetadataId) {
            throw new Error(`Object "${objectNameSingular}" not found. Use get_object_metadata to list available objects.`);
        }
        return objectMetadataId;
    }
    async resolveFieldMetadataId(workspaceId, objectMetadataId, fieldName) {
        const { flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        const fieldMetadata = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).find((field)=>field?.name === fieldName && field?.objectMetadataId === objectMetadataId);
        if (!fieldMetadata) {
            throw new Error(`Field "${fieldName}" not found on this object. Use get_field_metadata to list available fields.`);
        }
        return fieldMetadata.id;
    }
    async resolveGroupByFieldMetadataId(workspaceId, objectMetadataId, fieldName) {
        const { flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        const fieldMetadata = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).find((field)=>field?.name === fieldName && field?.objectMetadataId === objectMetadataId);
        if (!fieldMetadata) {
            throw new Error(`Field "${fieldName}" not found on this object. Use get_field_metadata to list available fields.`);
        }
        if (fieldMetadata.type !== _types.FieldMetadataType.SELECT) {
            throw new Error(`Field "${fieldName}" has type "${fieldMetadata.type}" and cannot be used as a group-by field. Only SELECT fields are supported for grouping (board columns and table groups).`);
        }
        return fieldMetadata.id;
    }
    async resolveCalendarFieldMetadataId(workspaceId, objectMetadataId, fieldName) {
        const { flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        const fieldMetadata = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).find((field)=>field?.name === fieldName && field?.objectMetadataId === objectMetadataId);
        if (!fieldMetadata) {
            throw new Error(`Field "${fieldName}" not found on this object. Use get_field_metadata to list available fields.`);
        }
        if (!(0, _utils.isFieldMetadataDateKind)(fieldMetadata.type)) {
            throw new Error(`Field "${fieldName}" has type "${fieldMetadata.type}" and cannot be used as a calendar field. Only DATE or DATE_TIME fields are supported.`);
        }
        return fieldMetadata.id;
    }
    generateReadTools(workspaceId, userWorkspaceId, currentWorkspaceMemberId) {
        return {
            get_views: {
                description: 'List views in the workspace. Views define how records are displayed, filtered, and sorted.',
                inputSchema: GetViewsInputSchema,
                execute: async (parameters)=>{
                    let views;
                    if (parameters.objectNameSingular) {
                        const objectMetadataId = await this.resolveObjectMetadataId(workspaceId, parameters.objectNameSingular);
                        views = await this.viewService.findByObjectMetadataId(workspaceId, objectMetadataId, userWorkspaceId);
                    } else {
                        views = await this.viewService.findByWorkspaceId(workspaceId, userWorkspaceId);
                    }
                    const limitedViews = views.slice(0, parameters.limit ?? 50);
                    return limitedViews.map((view)=>({
                            id: view.id,
                            name: view.name,
                            objectMetadataId: view.objectMetadataId,
                            type: view.type,
                            icon: view.icon,
                            visibility: view.visibility,
                            position: view.position
                        }));
                }
            },
            get_view_query_parameters: {
                description: 'Get filter and sort parameters from a view. Use these parameters with find_* tools to query records matching the view.',
                inputSchema: GetViewQueryParamsInputSchema,
                execute: async (parameters)=>{
                    return this.viewQueryParamsService.resolveViewToQueryParams(parameters.viewId, workspaceId, currentWorkspaceMemberId);
                }
            }
        };
    }
    generateWriteTools(workspaceId, userWorkspaceId) {
        return {
            create_view: {
                description: 'Create a new view for an object. Views define how records are displayed. For KANBAN views, mainGroupByFieldName is required and must be a SELECT field (e.g., "stage", "status"). For CALENDAR views, calendarFieldName and calendarLayout are required.',
                inputSchema: CreateViewInputSchema,
                execute: async (parameters)=>{
                    try {
                        const objectMetadataId = await this.resolveObjectMetadataId(workspaceId, parameters.objectNameSingular);
                        if (parameters.type === _types.ViewType.KANBAN && !parameters.mainGroupByFieldName) {
                            throw new Error('KANBAN views require mainGroupByFieldName. Provide a SELECT field name (e.g., "stage", "status") to group records into columns.');
                        }
                        if (parameters.type === _types.ViewType.CALENDAR) {
                            if (!parameters.calendarFieldName) {
                                throw new Error('CALENDAR views require calendarFieldName. Provide a DATE or DATE_TIME field name (e.g., "dueAt", "createdAt").');
                            }
                            if (!parameters.calendarLayout) {
                                throw new Error('CALENDAR views require calendarLayout. Provide one of: "DAY", "WEEK", "MONTH".');
                            }
                        }
                        let mainGroupByFieldMetadataId;
                        let kanbanAggregateOperationFieldMetadataId;
                        let calendarFieldMetadataId;
                        if (parameters.mainGroupByFieldName) {
                            mainGroupByFieldMetadataId = await this.resolveGroupByFieldMetadataId(workspaceId, objectMetadataId, parameters.mainGroupByFieldName);
                        }
                        if (parameters.kanbanAggregateOperationFieldName) {
                            kanbanAggregateOperationFieldMetadataId = await this.resolveFieldMetadataId(workspaceId, objectMetadataId, parameters.kanbanAggregateOperationFieldName);
                        }
                        if (parameters.calendarFieldName) {
                            calendarFieldMetadataId = await this.resolveCalendarFieldMetadataId(workspaceId, objectMetadataId, parameters.calendarFieldName);
                        }
                        const view = await this.viewService.createOne({
                            createViewInput: {
                                name: parameters.name,
                                objectMetadataId,
                                icon: parameters.icon ?? 'IconList',
                                type: parameters.type ?? _types.ViewType.TABLE,
                                visibility: parameters.visibility ?? _types.ViewVisibility.WORKSPACE,
                                mainGroupByFieldMetadataId,
                                kanbanAggregateOperation: parameters.kanbanAggregateOperation,
                                kanbanAggregateOperationFieldMetadataId,
                                calendarLayout: parameters.calendarLayout,
                                calendarFieldMetadataId
                            },
                            workspaceId,
                            createdByUserWorkspaceId: userWorkspaceId
                        });
                        if ((0, _utils.isNonEmptyArray)(parameters.fieldNames)) {
                            const resolvedFieldMetadataIds = await Promise.all(parameters.fieldNames.map((fieldName)=>this.resolveFieldMetadataId(workspaceId, objectMetadataId, fieldName)));
                            await this.viewFieldService.createMany({
                                createViewFieldInputs: resolvedFieldMetadataIds.map((fieldMetadataId, index)=>({
                                        viewId: view.id,
                                        fieldMetadataId,
                                        isVisible: true,
                                        size: 150,
                                        position: index
                                    })),
                                workspaceId
                            });
                        }
                        return {
                            id: view.id,
                            name: view.name,
                            objectNameSingular: parameters.objectNameSingular,
                            type: view.type,
                            icon: view.icon,
                            visibility: view.visibility
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            update_view: {
                description: 'Update an existing view. You can change the name and icon.',
                inputSchema: UpdateViewInputSchema,
                execute: async (parameters)=>{
                    try {
                        const existingView = await this.viewService.findById(parameters.id, workspaceId);
                        if (!existingView) {
                            throw new Error(`View with id ${parameters.id} not found`);
                        }
                        if (existingView.visibility === _types.ViewVisibility.UNLISTED && existingView.createdByUserWorkspaceId !== userWorkspaceId) {
                            throw new Error('You can only update your own unlisted views');
                        }
                        const view = await this.viewService.updateOne({
                            updateViewInput: {
                                id: parameters.id,
                                name: parameters.name,
                                icon: parameters.icon
                            },
                            workspaceId,
                            userWorkspaceId
                        });
                        return {
                            id: view.id,
                            name: view.name,
                            objectMetadataId: view.objectMetadataId,
                            type: view.type,
                            icon: view.icon,
                            visibility: view.visibility
                        };
                    } catch (error) {
                        if (error instanceof _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException) {
                            throw new Error((0, _formatvalidationerrorsutil.formatValidationErrors)(error));
                        }
                        throw error;
                    }
                }
            },
            delete_view: {
                description: 'Delete a view by its ID.',
                inputSchema: DeleteViewInputSchema,
                execute: async (parameters)=>{
                    try {
                        const existingView = await this.viewService.findById(parameters.id, workspaceId);
                        if (!existingView) {
                            throw new Error(`View with id ${parameters.id} not found`);
                        }
                        if (existingView.visibility === _types.ViewVisibility.UNLISTED && existingView.createdByUserWorkspaceId !== userWorkspaceId) {
                            throw new Error('You can only delete your own unlisted views');
                        }
                        const view = await this.viewService.deleteOne({
                            deleteViewInput: {
                                id: parameters.id
                            },
                            workspaceId
                        });
                        return {
                            id: view.id,
                            name: view.name,
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
    constructor(viewService, viewFieldService, viewQueryParamsService, flatEntityMapsCacheService){
        this.viewService = viewService;
        this.viewFieldService = viewFieldService;
        this.viewQueryParamsService = viewQueryParamsService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
    }
};
ViewToolsFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _viewfieldservice.ViewFieldService === "undefined" ? Object : _viewfieldservice.ViewFieldService,
        typeof _viewqueryparamsservice.ViewQueryParamsService === "undefined" ? Object : _viewqueryparamsservice.ViewQueryParamsService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], ViewToolsFactory);

//# sourceMappingURL=view-tools.factory.js.map