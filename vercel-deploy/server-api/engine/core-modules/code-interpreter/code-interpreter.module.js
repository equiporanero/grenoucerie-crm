"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeInterpreterModule", {
    enumerable: true,
    get: function() {
        return CodeInterpreterModule;
    }
});
const _common = require("@nestjs/common");
const _codeinterpreterdriverfactory = require("./code-interpreter-driver.factory");
const _codeinterpreterservice = require("./code-interpreter.service");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CodeInterpreterModule = class CodeInterpreterModule {
    static forRoot() {
        return {
            module: CodeInterpreterModule,
            imports: [
                _twentyconfigmodule.TwentyConfigModule
            ],
            providers: [
                _codeinterpreterdriverfactory.CodeInterpreterDriverFactory,
                _codeinterpreterservice.CodeInterpreterService
            ],
            exports: [
                _codeinterpreterservice.CodeInterpreterService
            ]
        };
    }
};
CodeInterpreterModule = _ts_decorate([
    (0, _common.Global)()
], CodeInterpreterModule);

//# sourceMappingURL=code-interpreter.module.js.map