"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphQLConfigModule", {
    enumerable: true,
    get: function() {
        return GraphQLConfigModule;
    }
});
const _common = require("@nestjs/common");
const _directexecutionmodule = require("../direct-execution/direct-execution.module");
const _coreenginemodule = require("../../../core-modules/core-engine.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GraphQLConfigModule = class GraphQLConfigModule {
};
GraphQLConfigModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _coreenginemodule.CoreEngineModule,
            _directexecutionmodule.DirectExecutionModule
        ],
        providers: [],
        exports: [
            _coreenginemodule.CoreEngineModule,
            _directexecutionmodule.DirectExecutionModule
        ]
    })
], GraphQLConfigModule);

//# sourceMappingURL=graphql-config.module.js.map