"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionActionModule", {
    enumerable: true,
    get: function() {
        return LogicFunctionActionModule;
    }
});
const _common = require("@nestjs/common");
const _workspacemanyorallflatentitymapscachemodule = require("../../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _logicfunctionworkflowaction = require("./logic-function.workflow-action");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LogicFunctionActionModule = class LogicFunctionActionModule {
};
LogicFunctionActionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _logicfunctionworkflowaction.LogicFunctionWorkflowAction
        ],
        exports: [
            _logicfunctionworkflowaction.LogicFunctionWorkflowAction
        ]
    })
], LogicFunctionActionModule);

//# sourceMappingURL=logic-function-action.module.js.map