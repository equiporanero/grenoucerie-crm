"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toolSetToDescriptors", {
    enumerable: true,
    get: function() {
        return toolSetToDescriptors;
    }
});
const _zod = require("zod");
const toolSetToDescriptors = (toolSet, category, options)=>{
    const includeSchemas = options?.includeSchemas ?? true;
    return Object.entries(toolSet).map(([name, tool])=>{
        const base = {
            name,
            description: tool.description ?? '',
            category,
            executionRef: {
                kind: 'static',
                toolId: name
            },
            ...options?.icon && {
                icon: options.icon
            }
        };
        if (!includeSchemas) {
            return base;
        }
        let inputSchema;
        try {
            inputSchema = _zod.z.toJSONSchema(tool.inputSchema);
        } catch  {
            // Fallback: schema is already JSON Schema or another format
            inputSchema = tool.inputSchema ?? {};
        }
        return {
            ...base,
            inputSchema
        };
    });
};

//# sourceMappingURL=tool-set-to-descriptors.util.js.map