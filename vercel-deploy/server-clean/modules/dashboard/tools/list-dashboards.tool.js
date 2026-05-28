"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createListDashboardsTool", {
    enumerable: true,
    get: function() {
        return createListDashboardsTool;
    }
});
const _zod = require("zod");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const listDashboardsSchema = _zod.z.object({
    limit: _zod.z.number().min(1).max(100).optional().default(20).describe('Maximum number of dashboards to return (default: 20, max: 100)')
});
const createListDashboardsTool = (deps, context)=>({
        name: 'list_dashboards',
        description: `List all dashboards in the workspace. Use get_dashboard to retrieve full layout structure.`,
        inputSchema: listDashboardsSchema,
        execute: async (parameters)=>{
            try {
                const limit = parameters.limit ?? 20;
                const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(context.workspaceId);
                const dashboards = await deps.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                    const repo = await deps.globalWorkspaceOrmManager.getRepository(context.workspaceId, 'dashboard', {
                        shouldBypassPermissionChecks: true
                    });
                    return repo.find({
                        take: limit,
                        order: {
                            position: 'ASC'
                        }
                    });
                }, authContext);
                const dashboardList = dashboards.map((d)=>({
                        id: d.id,
                        title: d.title,
                        pageLayoutId: d.pageLayoutId,
                        createdAt: d.createdAt,
                        updatedAt: d.updatedAt
                    }));
                return {
                    success: true,
                    message: `Found ${dashboardList.length} dashboard(s)`,
                    result: {
                        dashboards: dashboardList,
                        count: dashboardList.length
                    }
                };
            } catch (error) {
                return {
                    success: false,
                    message: `Failed to list dashboards: ${error.message}`,
                    error: error.message
                };
            }
        }
    });

//# sourceMappingURL=list-dashboards.tool.js.map