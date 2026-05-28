"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromLogicFunctionManifestToUniversalFlatLogicFunction", {
    enumerable: true,
    get: function() {
        return fromLogicFunctionManifestToUniversalFlatLogicFunction;
    }
});
const _path = require("path");
const _logicfunctionentity = require("../../../../metadata-modules/logic-function/logic-function.entity");
const fromLogicFunctionManifestToUniversalFlatLogicFunction = ({ logicFunctionManifest, applicationUniversalIdentifier, now })=>{
    const name = logicFunctionManifest.name ?? (0, _path.parse)(logicFunctionManifest.handlerName).name;
    return {
        universalIdentifier: logicFunctionManifest.universalIdentifier,
        applicationUniversalIdentifier,
        name,
        description: logicFunctionManifest.description ?? null,
        runtime: _logicfunctionentity.LogicFunctionRuntime.NODE22,
        timeoutSeconds: logicFunctionManifest.timeoutSeconds ?? 300,
        sourceHandlerPath: logicFunctionManifest.sourceHandlerPath,
        builtHandlerPath: logicFunctionManifest.builtHandlerPath,
        handlerName: logicFunctionManifest.handlerName,
        checksum: logicFunctionManifest.builtHandlerChecksum,
        cronTriggerSettings: logicFunctionManifest.cronTriggerSettings ?? null,
        databaseEventTriggerSettings: logicFunctionManifest.databaseEventTriggerSettings ?? null,
        httpRouteTriggerSettings: logicFunctionManifest.httpRouteTriggerSettings ?? null,
        toolTriggerSettings: logicFunctionManifest.toolTriggerSettings ?? null,
        workflowActionTriggerSettings: logicFunctionManifest.workflowActionTriggerSettings ?? null,
        isBuildUpToDate: true,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
    };
};

//# sourceMappingURL=from-logic-function-manifest-to-universal-flat-logic-function.util.js.map