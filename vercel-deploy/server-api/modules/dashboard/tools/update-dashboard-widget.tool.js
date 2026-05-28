"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpdateDashboardWidgetTool", {
    enumerable: true,
    get: function() {
        return createUpdateDashboardWidgetTool;
    }
});
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _widgetschema = require("./schemas/widget.schema");
const updateDashboardWidgetSchema = _zod.z.object({
    widgetId: _zod.z.string().uuid().describe('The UUID of the widget to update'),
    title: _zod.z.string().optional().describe('New widget title'),
    type: _widgetschema.widgetTypeSchema.optional().describe('New widget type'),
    gridPosition: _widgetschema.gridPositionSchema.optional().describe('New position and size in the grid layout'),
    objectMetadataId: _zod.z.string().uuid().optional().describe('New object metadata ID'),
    configuration: _widgetschema.widgetConfigurationSchemaWithoutDefaults.optional()
});
const createUpdateDashboardWidgetTool = (deps, context)=>({
        name: 'update_dashboard_widget',
        description: `Update an existing widget's properties, position, or configuration.

Use get_dashboard first to find the widgetId.

Only provide fields you want to change - others remain unchanged.`,
        inputSchema: updateDashboardWidgetSchema,
        execute: async (parameters)=>{
            try {
                const { widgetId, ...updates } = parameters;
                const updateData = Object.fromEntries(Object.entries(updates).filter(([key, value])=>{
                    if (!(0, _utils.isDefined)(value)) {
                        return false;
                    }
                    if (key === 'configuration' && (0, _utils.isEmptyObject)(value)) {
                        return false;
                    }
                    return true;
                }));
                const widget = await deps.pageLayoutWidgetService.update({
                    id: widgetId,
                    workspaceId: context.workspaceId,
                    updateData
                });
                return {
                    success: true,
                    message: `Widget "${widget.title}" updated`,
                    result: {
                        widgetId: widget.id,
                        title: widget.title,
                        type: widget.type,
                        gridPosition: widget.gridPosition,
                        configuration: widget.configuration
                    }
                };
            } catch (error) {
                return {
                    success: false,
                    message: `Failed to update widget: ${error.message}`,
                    error: error.message
                };
            }
        }
    });

//# sourceMappingURL=update-dashboard-widget.tool.js.map