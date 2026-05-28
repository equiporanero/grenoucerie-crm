"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDeleteDashboardWidgetTool", {
    enumerable: true,
    get: function() {
        return createDeleteDashboardWidgetTool;
    }
});
const _zod = require("zod");
const deleteDashboardWidgetSchema = _zod.z.object({
    widgetId: _zod.z.string().uuid().describe('The UUID of the widget to delete')
});
const createDeleteDashboardWidgetTool = (deps, context)=>({
        name: 'delete_dashboard_widget',
        description: `Delete a widget from a dashboard. Use get_dashboard first to find the widgetId.`,
        inputSchema: deleteDashboardWidgetSchema,
        execute: async (parameters)=>{
            try {
                const widget = await deps.pageLayoutWidgetService.findByIdOrThrow({
                    id: parameters.widgetId,
                    workspaceId: context.workspaceId
                });
                await deps.pageLayoutWidgetService.destroy({
                    id: parameters.widgetId,
                    workspaceId: context.workspaceId
                });
                return {
                    success: true,
                    message: `Widget "${widget.title}" deleted`,
                    result: {
                        deletedWidgetId: parameters.widgetId,
                        deletedWidgetTitle: widget.title
                    }
                };
            } catch (error) {
                return {
                    success: false,
                    message: `Failed to delete widget: ${error.message}`,
                    error: error.message
                };
            }
        }
    });

//# sourceMappingURL=delete-dashboard-widget.tool.js.map