"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createGetDashboardTool", {
    enumerable: true,
    get: function() {
        return createGetDashboardTool;
    }
});
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _widgetconfigurationtypetype = require("../../../engine/metadata-modules/page-layout-widget/enums/widget-configuration-type.type");
const _widgettypeenum = require("../../../engine/metadata-modules/page-layout-widget/enums/widget-type.enum");
const _findactiveflatfieldmetadatabyidutil = require("../../../engine/metadata-modules/page-layout-widget/utils/find-active-flat-field-metadata-by-id.util");
const _ischartreferencingfieldinconfigurationutil = require("../../../engine/metadata-modules/page-layout-widget/utils/is-chart-referencing-field-in-configuration.util");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _buildresolvedgroupbyutil = require("./utils/build-resolved-group-by.util");
const getDashboardSchema = _zod.z.object({
    dashboardId: _zod.z.string().uuid().describe('The UUID of the dashboard to fetch')
});
const createGetDashboardTool = (deps, context)=>({
        name: 'get_dashboard',
        description: `Get a dashboard with its full layout structure including tabs and widgets.`,
        inputSchema: getDashboardSchema,
        execute: async (parameters)=>{
            try {
                const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(context.workspaceId);
                const { flatFieldMetadataMaps } = await deps.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                    workspaceId: context.workspaceId,
                    flatMapsKeys: [
                        'flatFieldMetadataMaps'
                    ]
                });
                const allFields = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>field.isActive);
                const fieldsByObjectId = new Map();
                allFields.forEach((field)=>{
                    const existing = fieldsByObjectId.get(field.objectMetadataId) ?? [];
                    existing.push(field);
                    fieldsByObjectId.set(field.objectMetadataId, existing);
                });
                const buildResolvedGroupByForConfiguration = ({ fieldId, subFieldName })=>(0, _buildresolvedgroupbyutil.buildResolvedGroupBy)({
                        fieldId,
                        subFieldName,
                        flatFieldMetadataMaps,
                        fieldsByObjectId,
                        allFields
                    });
                const dashboard = await deps.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                    const repo = await deps.globalWorkspaceOrmManager.getRepository(context.workspaceId, 'dashboard', {
                        shouldBypassPermissionChecks: true
                    });
                    return repo.findOne({
                        where: {
                            id: parameters.dashboardId
                        }
                    });
                }, authContext);
                if (!(0, _utils.isDefined)(dashboard)) {
                    return {
                        success: false,
                        message: `Dashboard "${parameters.dashboardId}" not found`,
                        error: 'DASHBOARD_NOT_FOUND'
                    };
                }
                if (!(0, _utils.isDefined)(dashboard.pageLayoutId)) {
                    return {
                        success: false,
                        message: `Dashboard "${dashboard.title}" has no page layout`,
                        error: 'PAGE_LAYOUT_NOT_FOUND'
                    };
                }
                const pageLayout = await deps.pageLayoutService.findByIdOrThrow({
                    id: dashboard.pageLayoutId,
                    workspaceId: context.workspaceId
                });
                const tabs = pageLayout.tabs?.map((tab)=>({
                        id: tab.id,
                        title: tab.title,
                        position: tab.position,
                        widgets: tab.widgets?.map((w)=>{
                            if (w.type !== _widgettypeenum.WidgetType.GRAPH || !(0, _ischartreferencingfieldinconfigurationutil.isChartReferencingFieldInConfiguration)(w.configuration)) {
                                return {
                                    id: w.id,
                                    title: w.title,
                                    type: w.type,
                                    gridPosition: w.gridPosition,
                                    objectMetadataId: w.objectMetadataId,
                                    configuration: w.configuration
                                };
                            }
                            const configuration = w.configuration;
                            const resolved = {};
                            const aggregateField = (0, _findactiveflatfieldmetadatabyidutil.findActiveFlatFieldMetadataById)(configuration.aggregateFieldMetadataId, flatFieldMetadataMaps);
                            if ((0, _utils.isDefined)(aggregateField)) {
                                resolved.aggregateField = {
                                    fieldName: aggregateField.name,
                                    fieldLabel: aggregateField.label ?? aggregateField.name
                                };
                            }
                            switch(configuration.configurationType){
                                case _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART:
                                case _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART:
                                    {
                                        const primaryResolved = buildResolvedGroupByForConfiguration({
                                            fieldId: configuration.primaryAxisGroupByFieldMetadataId,
                                            subFieldName: configuration.primaryAxisGroupBySubFieldName
                                        });
                                        const secondaryResolved = buildResolvedGroupByForConfiguration({
                                            fieldId: configuration.secondaryAxisGroupByFieldMetadataId,
                                            subFieldName: configuration.secondaryAxisGroupBySubFieldName
                                        });
                                        if ((0, _utils.isDefined)(primaryResolved)) {
                                            resolved.primaryAxisGroupBy = primaryResolved;
                                        }
                                        if ((0, _utils.isDefined)(secondaryResolved)) {
                                            resolved.secondaryAxisGroupBy = secondaryResolved;
                                        }
                                        break;
                                    }
                                case _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART:
                                    {
                                        const groupByResolved = buildResolvedGroupByForConfiguration({
                                            fieldId: configuration.groupByFieldMetadataId,
                                            subFieldName: configuration.groupBySubFieldName
                                        });
                                        if ((0, _utils.isDefined)(groupByResolved)) {
                                            resolved.groupBy = groupByResolved;
                                        }
                                        break;
                                    }
                                case _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART:
                                default:
                                    break;
                            }
                            const enrichedConfiguration = {
                                ...configuration,
                                _resolved: Object.keys(resolved).length > 0 ? resolved : undefined
                            };
                            return {
                                id: w.id,
                                title: w.title,
                                type: w.type,
                                gridPosition: w.gridPosition,
                                objectMetadataId: w.objectMetadataId,
                                configuration: enrichedConfiguration
                            };
                        }) ?? []
                    })) ?? [];
                return {
                    success: true,
                    message: `Retrieved dashboard "${dashboard.title}" with ${tabs.length} tab(s)`,
                    result: {
                        dashboard: {
                            id: dashboard.id,
                            title: dashboard.title,
                            pageLayoutId: dashboard.pageLayoutId,
                            createdAt: dashboard.createdAt,
                            updatedAt: dashboard.updatedAt
                        },
                        layout: {
                            id: pageLayout.id,
                            name: pageLayout.name,
                            tabs
                        }
                    }
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to get dashboard: ${errorMessage}`,
                    error: errorMessage
                };
            }
        }
    });

//# sourceMappingURL=get-dashboard.tool.js.map