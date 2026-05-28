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
    get EXECUTE_TOOL_TOOL_NAME () {
        return EXECUTE_TOOL_TOOL_NAME;
    },
    get createExecuteToolTool () {
        return createExecuteToolTool;
    },
    get executeToolInputSchema () {
        return executeToolInputSchema;
    }
});
const _ai = require("ai");
const _zod = require("zod");
const EXECUTE_TOOL_TOOL_NAME = 'execute_tool';
const executeToolInputZodSchema = _zod.z.object({
    toolName: _zod.z.string().describe('Exact tool name from get_tool_catalog. Do not guess.'),
    arguments: _zod.z.record(_zod.z.string(), _zod.z.unknown()).describe('Arguments matching the schema returned by learn_tools.')
});
const executeToolInputSchema = (0, _ai.jsonSchema)(()=>{
    const schema = _zod.z.toJSONSchema(executeToolInputZodSchema, {
        target: 'draft-7',
        io: 'input'
    });
    schema.additionalProperties = false;
    return schema;
}, {
    validate: async (value)=>{
        const result = await _zod.z.safeParseAsync(executeToolInputZodSchema, value);
        return result.success ? {
            success: true,
            value: result.data
        } : {
            success: false,
            error: result.error
        };
    }
});
const createExecuteToolTool = (toolRegistry, context, options)=>({
        description: 'STEP 3: Execute a tool by name with arguments. You MUST call get_tool_catalog (step 1) and learn_tools (step 2) first to discover the tool name and its required input schema.',
        inputSchema: executeToolInputSchema,
        execute: async (parameters)=>{
            const { toolName, arguments: args = {} } = parameters;
            if (options?.excludeTools?.has(toolName)) {
                return {
                    success: false,
                    message: `Tool "${toolName}" is not available`,
                    error: `Tool "${toolName}" is not available in this context. Use get_tool_catalog to see which tools are available.`
                };
            }
            return toolRegistry.resolveAndExecute(toolName, args, context, {
                compactOutput: options?.compactOutput
            });
        }
    });

//# sourceMappingURL=execute-tool.tool.js.map