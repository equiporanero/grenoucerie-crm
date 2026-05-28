"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionModule", {
    enumerable: true,
    get: function() {
        return LogicFunctionModule;
    }
});
const _common = require("@nestjs/common");
const _cachelockmodule = require("../cache-lock/cache-lock.module");
const _logicfunctiondriverfactory = require("./logic-function-drivers/logic-function-driver.factory");
const _logicfunctionresourcemodule = require("./logic-function-resource/logic-function-resource.module");
const _logicfunctiontriggermodule = require("./logic-function-trigger/logic-function-trigger.module");
const _logicfunctionexecutormodule = require("./logic-function-executor/logic-function-executor.module");
const _sdkclientmodule = require("../sdk-client/sdk-client.module");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LogicFunctionModule = class LogicFunctionModule {
    static forRoot() {
        return {
            module: LogicFunctionModule,
            imports: [
                _twentyconfigmodule.TwentyConfigModule,
                _cachelockmodule.CacheLockModule,
                _logicfunctionresourcemodule.LogicFunctionResourceModule,
                _logicfunctiontriggermodule.LogicFunctionTriggerModule,
                _logicfunctionexecutormodule.LogicFunctionExecutorModule,
                _sdkclientmodule.SdkClientModule,
                _workspacecachemodule.WorkspaceCacheModule
            ],
            providers: [
                _logicfunctiondriverfactory.LogicFunctionDriverFactory
            ],
            exports: [
                _logicfunctiondriverfactory.LogicFunctionDriverFactory,
                _logicfunctionresourcemodule.LogicFunctionResourceModule,
                _logicfunctiontriggermodule.LogicFunctionTriggerModule,
                _logicfunctionexecutormodule.LogicFunctionExecutorModule
            ]
        };
    }
};
LogicFunctionModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({})
], LogicFunctionModule);

//# sourceMappingURL=logic-function.module.js.map