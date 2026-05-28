"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createAddDashboardWidgetTool", {
    enumerable: true,
    get: function() {
        return createAddDashboardWidgetTool;
    }
});
const _zod = require("zod");
const _widgetschema = require("./schemas/widget.schema");
const addDashboardWidgetSchema = _zod.z.object({
    pageLayoutTabId: _zod.z.string().uuid().describe('Tab UUID from get_dashboard'),
    title: _zod.z.string().describe('Widget title'),
    type: _widgetschema.widgetTypeSchema.describe('Widget type'),
    gridPosition: _widgetschema.gridPositionSchema.describe('Position in 12-column grid'),
    objectMetadataId: _zod.z.string().uuid().optional().describe('Required for GRAPH and RECORD_TABLE widgets: object UUID to aggregate or display'),
    configuration: _widgetschema.widgetConfigurationSchema
});
const createAddDashboardWidgetTool = (deps, context)=>({
        name: 'add_dashboard_widget',
        description: `Add a widget to an existing dashboard tab.

Use get_dashboard first to get pageLayoutTabId and existing widget positions.
Use list_object_metadata_items to get objectMetadataId and field IDs for GRAPH widgets.

For RECORD_TABLE widgets: create a dedicated view first with create_view (type TABLE), then pass its viewId in configuration. Never reuse an existing record index view.

See create_complete_dashboard for full configuration examples.`,
        inputSchema: addDashboardWidgetSchema,
        execute: async (parameters)=>{
            try {
                const widget = await deps.pageLayoutWidgetService.create({
                    input: parameters,
                    workspaceId: context.workspaceId
                });
                return {
                    success: true,
                    message: `Widget "${parameters.title}" added`,
                    result: {
                        widgetId: widget.id,
                        title: widget.title,
                        type: widget.type,
                        gridPosition: widget.gridPosition,
                        pageLayoutTabId: parameters.pageLayoutTabId
                    }
                };
            } catch (error) {
                return {
                    success: false,
                    message: `Failed to add widget: ${error.message}`,
                    error: error.message
                };
            }
        }
    });

//# sourceMappingURL=add-dashboard-widget.tool.js.map