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
    get LOGIC_FUNCTION_EXECUTED_EVENT () {
        return LOGIC_FUNCTION_EXECUTED_EVENT;
    },
    get logicFunctionExecutedSchema () {
        return logicFunctionExecutedSchema;
    }
});
const _zod = require("zod");
const _track = require("../track");
const LOGIC_FUNCTION_EXECUTED_EVENT = 'Logic Function Executed';
const logicFunctionExecutedSchema = _zod.z.strictObject({
    event: _zod.z.literal(LOGIC_FUNCTION_EXECUTED_EVENT),
    properties: _zod.z.strictObject({
        duration: _zod.z.number(),
        status: _zod.z.enum([
            'IDLE',
            'SUCCESS',
            'ERROR'
        ]),
        errorType: _zod.z.string().optional(),
        functionId: _zod.z.string(),
        functionName: _zod.z.string()
    })
});
(0, _track.registerEvent)(LOGIC_FUNCTION_EXECUTED_EVENT, logicFunctionExecutedSchema);

//# sourceMappingURL=logic-function-executed.js.map