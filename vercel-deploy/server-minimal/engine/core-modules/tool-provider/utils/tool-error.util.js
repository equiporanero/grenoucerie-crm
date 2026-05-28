"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "wrapWithErrorHandler", {
    enumerable: true,
    get: function() {
        return wrapWithErrorHandler;
    }
});
const wrapWithErrorHandler = (toolName, executeFn)=>{
    return async (args)=>{
        try {
            return await executeFn(args);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                success: false,
                message: `Failed to execute ${toolName}`,
                error: errorMessage
            };
        }
    };
};

//# sourceMappingURL=tool-error.util.js.map