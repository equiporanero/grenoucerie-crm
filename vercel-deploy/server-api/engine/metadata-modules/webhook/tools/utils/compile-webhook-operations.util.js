"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "compileWebhookOperations", {
    enumerable: true,
    get: function() {
        return compileWebhookOperations;
    }
});
const compileWebhookOperations = (operations)=>operations.map((operation)=>{
        if (operation.kind === 'record') {
            return `${operation.object}.${operation.event}`;
        }
        return `metadata.${operation.metadataName}.${operation.operation}`;
    });

//# sourceMappingURL=compile-webhook-operations.util.js.map