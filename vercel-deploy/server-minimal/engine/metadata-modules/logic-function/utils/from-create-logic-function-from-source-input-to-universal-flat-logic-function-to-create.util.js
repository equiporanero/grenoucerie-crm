"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateLogicFunctionFromSourceInputToUniversalFlatLogicFunctionToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateLogicFunctionFromSourceInputToUniversalFlatLogicFunctionToCreate;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _logicfunctionentity = require("../logic-function.entity");
const fromCreateLogicFunctionFromSourceInputToUniversalFlatLogicFunctionToCreate = ({ createLogicFunctionFromSourceInput, sourceHandlerPath, builtHandlerPath, handlerName, checksum, isBuildUpToDate, applicationUniversalIdentifier })=>{
    const now = new Date().toISOString();
    const { name, description } = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(createLogicFunctionFromSourceInput, [
        'name',
        'description'
    ]);
    const id = createLogicFunctionFromSourceInput.id ?? (0, _uuid.v4)();
    return {
        id,
        universalIdentifier: createLogicFunctionFromSourceInput.universalIdentifier ?? (0, _uuid.v4)(),
        name,
        description: description ?? null,
        runtime: _logicfunctionentity.LogicFunctionRuntime.NODE22,
        timeoutSeconds: createLogicFunctionFromSourceInput.timeoutSeconds ?? 300,
        checksum,
        isBuildUpToDate,
        handlerName,
        sourceHandlerPath,
        builtHandlerPath,
        cronTriggerSettings: createLogicFunctionFromSourceInput.cronTriggerSettings ?? null,
        databaseEventTriggerSettings: createLogicFunctionFromSourceInput.databaseEventTriggerSettings ?? null,
        httpRouteTriggerSettings: createLogicFunctionFromSourceInput.httpRouteTriggerSettings ?? null,
        toolTriggerSettings: createLogicFunctionFromSourceInput.toolTriggerSettings ?? null,
        workflowActionTriggerSettings: createLogicFunctionFromSourceInput.workflowActionTriggerSettings ?? null,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=from-create-logic-function-from-source-input-to-universal-flat-logic-function-to-create.util.js.map