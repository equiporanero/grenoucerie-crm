"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "executeToolFromToolSet", {
    enumerable: true,
    get: function() {
        return executeToolFromToolSet;
    }
});
const executeToolFromToolSet = async (toolSet, toolName, args, category)=>{
    const tool = toolSet[toolName];
    if (!tool?.execute) {
        throw new Error(`Tool "${toolName}" not found in ToolSet for category "${category}"`);
    }
    return tool.execute({
        loadingMessage: '',
        ...args
    }, {
        toolCallId: '',
        messages: []
    });
};

//# sourceMappingURL=execute-tool-from-tool-set.util.js.map