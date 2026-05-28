"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildUniversalFlatLogicFunctionToCreate", {
    enumerable: true,
    get: function() {
        return buildUniversalFlatLogicFunctionToCreate;
    }
});
const _uuid = require("uuid");
const _logicfunctionentity = require("../logic-function.entity");
const buildUniversalFlatLogicFunctionToCreate = (input)=>{
    const now = new Date().toISOString();
    return {
        id: input.id ?? (0, _uuid.v4)(),
        universalIdentifier: input.universalIdentifier ?? (0, _uuid.v4)(),
        name: input.name,
        description: input.description ?? null,
        runtime: _logicfunctionentity.LogicFunctionRuntime.NODE22,
        timeoutSeconds: input.timeoutSeconds ?? 300,
        checksum: input.checksum ?? null,
        isBuildUpToDate: input.isBuildUpToDate,
        handlerName: input.handlerName,
        sourceHandlerPath: input.sourceHandlerPath,
        builtHandlerPath: input.builtHandlerPath,
        cronTriggerSettings: input.cronTriggerSettings ?? null,
        databaseEventTriggerSettings: input.databaseEventTriggerSettings ?? null,
        httpRouteTriggerSettings: input.httpRouteTriggerSettings ?? null,
        toolTriggerSettings: input.toolTriggerSettings ?? null,
        workflowActionTriggerSettings: input.workflowActionTriggerSettings ?? null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        applicationUniversalIdentifier: input.applicationUniversalIdentifier
    };
};

//# sourceMappingURL=build-universal-flat-logic-function-to-create.util.js.map