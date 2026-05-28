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
    get stripLoadingMessage () {
        return stripLoadingMessage;
    },
    get wrapJsonSchemaForExecution () {
        return wrapJsonSchemaForExecution;
    },
    get wrapSchemaForExecution () {
        return wrapSchemaForExecution;
    }
});
const _zod = require("zod");
const DEFAULT_LOADING_MESSAGE_SCHEMA = _zod.z.string().describe("A brief status message for the user describing what you're doing (e.g., 'Sending email to customer').");
const wrapSchemaForExecution = (schema, customLoadingMessageSchema)=>{
    return _zod.z.object({
        loadingMessage: customLoadingMessageSchema ?? DEFAULT_LOADING_MESSAGE_SCHEMA,
        ...schema.shape
    });
};
const wrapJsonSchemaForExecution = (schema)=>{
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    return {
        type: 'object',
        properties: {
            loadingMessage: {
                type: 'string',
                description: 'A brief status message for the user.'
            },
            ...properties
        },
        required: [
            'loadingMessage',
            ...required
        ]
    };
};
const stripLoadingMessage = (parameters)=>{
    const { loadingMessage: _, ...rest } = parameters;
    return rest;
};

//# sourceMappingURL=wrap-tool-for-execution.util.js.map