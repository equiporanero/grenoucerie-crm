"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeStepBuildModule", {
    enumerable: true,
    get: function() {
        return CodeStepBuildModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../../../../engine/core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _logicfunctionmodule = require("../../../../../engine/metadata-modules/logic-function/logic-function.module");
const _codestepbuildservice = require("./services/code-step-build.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CodeStepBuildModule = class CodeStepBuildModule {
};
CodeStepBuildModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _logicfunctionmodule.LogicFunctionModule
        ],
        providers: [
            _codestepbuildservice.CodeStepBuildService
        ],
        exports: [
            _codestepbuildservice.CodeStepBuildService
        ]
    })
], CodeStepBuildModule);

//# sourceMappingURL=code-step-build.module.js.map