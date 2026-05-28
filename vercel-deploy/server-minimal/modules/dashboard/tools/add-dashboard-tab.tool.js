"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createAddDashboardTabTool", {
    enumerable: true,
    get: function() {
        return createAddDashboardTabTool;
    }
});
const _zod = require("zod");
const addDashboardTabSchema = _zod.z.object({
    pageLayoutId: _zod.z.string().uuid().describe('The page layout UUID of the dashboard (from get_dashboard result)'),
    title: _zod.z.string().describe('Title for the new tab'),
    position: _zod.z.number().int().min(0).optional().describe('Tab position (0-based). Defaults to after the last existing tab.')
});
const createAddDashboardTabTool = (deps, context)=>({
        name: 'add_dashboard_tab',
        description: `Add a new tab to an existing dashboard.

Use get_dashboard first to get the pageLayoutId and see existing tabs.
After creating a tab, use add_dashboard_widget with the returned tab ID to add widgets.`,
        inputSchema: addDashboardTabSchema,
        execute: async (parameters)=>{
            try {
                const pageLayout = await deps.pageLayoutService.findByIdOrThrow({
                    id: parameters.pageLayoutId,
                    workspaceId: context.workspaceId
                });
                const existingTabCount = pageLayout.tabs?.length ?? 0;
                const position = parameters.position ?? existingTabCount;
                const tab = await deps.pageLayoutTabService.create({
                    createPageLayoutTabInput: {
                        title: parameters.title,
                        pageLayoutId: parameters.pageLayoutId,
                        position
                    },
                    workspaceId: context.workspaceId
                });
                return {
                    success: true,
                    message: `Tab "${parameters.title}" added to dashboard`,
                    result: {
                        pageLayoutTabId: tab.id,
                        title: tab.title,
                        position: tab.position,
                        pageLayoutId: parameters.pageLayoutId
                    }
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    success: false,
                    message: `Failed to add tab: ${errorMessage}`,
                    error: errorMessage
                };
            }
        }
    });

//# sourceMappingURL=add-dashboard-tab.tool.js.map