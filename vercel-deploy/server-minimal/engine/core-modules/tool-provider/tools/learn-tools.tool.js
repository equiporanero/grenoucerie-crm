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
    get LEARN_TOOLS_TOOL_NAME () {
        return LEARN_TOOLS_TOOL_NAME;
    },
    get createLearnToolsTool () {
        return createLearnToolsTool;
    },
    get learnToolsInputSchema () {
        return learnToolsInputSchema;
    }
});
const _zod = require("zod");
const LEARN_TOOLS_TOOL_NAME = 'learn_tools';
const learnToolsAspectSchema = _zod.z.enum([
    'description',
    'schema'
]);
const learnToolsInputSchema = _zod.z.object({
    toolNames: _zod.z.array(_zod.z.string()).describe('Exact tool names from get_tool_catalog. Do not guess tool names.'),
    aspects: _zod.z.array(learnToolsAspectSchema).optional().default([
        'description',
        'schema'
    ]).describe('What to learn: description, schema, or both.')
});
const createLearnToolsTool = (toolRegistry, context, excludeTools)=>({
        description: 'STEP 2: Get input schemas for tools discovered via get_tool_catalog. Call this with exact tool names to learn the required arguments before calling execute_tool.',
        inputSchema: learnToolsInputSchema,
        execute: async (parameters)=>{
            const { toolNames, aspects } = parameters;
            const allowedNames = excludeTools ? toolNames.filter((name)=>!excludeTools.has(name)) : toolNames;
            const toolInfos = await toolRegistry.getToolInfo(allowedNames, context, aspects);
            const foundNames = new Set(toolInfos.map((t)=>t.name));
            const notFound = toolNames.filter((name)=>!foundNames.has(name));
            if (notFound.length > 0) {
                return {
                    tools: toolInfos,
                    notFound,
                    message: `Learned ${toolInfos.length} tool(s). Could not find: ${notFound.join(', ')}.`
                };
            }
            return {
                tools: toolInfos,
                notFound: [],
                message: `Learned ${toolInfos.length} tool(s): ${toolInfos.map((t)=>t.name).join(', ')}.`
            };
        }
    });

//# sourceMappingURL=learn-tools.tool.js.map