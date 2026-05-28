"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatLogicFunctionToLogicFunctionDto", {
    enumerable: true,
    get: function() {
        return fromFlatLogicFunctionToLogicFunctionDto;
    }
});
const fromFlatLogicFunctionToLogicFunctionDto = ({ flatLogicFunction })=>{
    return {
        id: flatLogicFunction.id,
        universalIdentifier: flatLogicFunction.universalIdentifier,
        name: flatLogicFunction.name,
        description: flatLogicFunction.description ?? undefined,
        runtime: flatLogicFunction.runtime,
        timeoutSeconds: flatLogicFunction.timeoutSeconds,
        sourceHandlerPath: flatLogicFunction.sourceHandlerPath,
        handlerName: flatLogicFunction.handlerName,
        applicationId: flatLogicFunction.applicationId ?? undefined,
        workspaceId: flatLogicFunction.workspaceId,
        createdAt: new Date(flatLogicFunction.createdAt),
        updatedAt: new Date(flatLogicFunction.updatedAt),
        cronTriggerSettings: flatLogicFunction.cronTriggerSettings ?? undefined,
        databaseEventTriggerSettings: flatLogicFunction.databaseEventTriggerSettings ?? undefined,
        httpRouteTriggerSettings: flatLogicFunction.httpRouteTriggerSettings ?? undefined,
        toolTriggerSettings: flatLogicFunction.toolTriggerSettings ?? undefined,
        workflowActionTriggerSettings: flatLogicFunction.workflowActionTriggerSettings ?? undefined
    };
};

//# sourceMappingURL=from-flat-logic-function-to-logic-function-dto.util.js.map