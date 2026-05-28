"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get GET_TOOL_CATALOG_TOOL_NAME () {
        return GET_TOOL_CATALOG_TOOL_NAME;
    },
    get createGetToolCatalogTool () {
        return createGetToolCatalogTool;
    },
    get getToolCatalogInputSchema () {
        return getToolCatalogInputSchema;
    }
});
const _zod = require("zod");
const _ai = require("twenty-shared/ai");
const GET_TOOL_CATALOG_TOOL_NAME = 'get_tool_catalog';
const availableCategories = Object.values(_ai.ToolCategory).map((entry)=>entry.toString()).join(', ');
const getToolCatalogInputSchema = _zod.z.object({
    categories: _zod.z.array(_zod.z.string()).optional().describe(`Filter by category. Available categories: ${availableCategories}. Omit to get all.`)
});
const createGetToolCatalogTool = (toolRegistry, workspaceId, roleId, options)=>({
        description: 'STEP 1: Start here. Browse available tools by category. Returns tool names and descriptions. You MUST call this before using learn_tools or execute_tool — do not guess tool names.',
        inputSchema: getToolCatalogInputSchema,
        execute: async (parameters)=>{
            const entries = await toolRegistry.buildToolIndex(workspaceId, roleId, options);
            const categoryFilter = parameters.categories ? new Set(parameters.categories) : undefined;
            const excludeSet = options?.excludeTools;
            const catalog = {};
            for (const entry of entries){
                if (excludeSet?.has(entry.name)) {
                    continue;
                }
                if (categoryFilter && !categoryFilter.has(entry.category)) {
                    continue;
                }
                if (!catalog[entry.category]) {
                    catalog[entry.category] = [];
                }
                catalog[entry.category].push({
                    name: entry.name,
                    description: entry.description
                });
            }
            const totalTools = Object.values(catalog).reduce((sum, tools)=>sum + tools.length, 0);
            return {
                catalog,
                message: `Found ${totalTools} tool(s) across ${Object.keys(catalog).length} category(ies).`
            };
        }
    });

//# sourceMappingURL=get-tool-catalog.tool.js.map