"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeInterpreterService", {
    enumerable: true,
    get: function() {
        return CodeInterpreterService;
    }
});
const _common = require("@nestjs/common");
const _codeinterpreterdriverfactory = require("./code-interpreter-driver.factory");
const _codeinterpreterinterface = require("./code-interpreter.interface");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CodeInterpreterService = class CodeInterpreterService {
    isEnabled() {
        return this.twentyConfigService.get('CODE_INTERPRETER_TYPE') !== _codeinterpreterinterface.CodeInterpreterDriverType.DISABLED;
    }
    execute(code, files, context, callbacks) {
        const driver = this.codeInterpreterDriverFactory.getCurrentDriver();
        return driver.execute(code, files, context, callbacks);
    }
    constructor(codeInterpreterDriverFactory, twentyConfigService){
        this.codeInterpreterDriverFactory = codeInterpreterDriverFactory;
        this.twentyConfigService = twentyConfigService;
    }
};
CodeInterpreterService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _codeinterpreterdriverfactory.CodeInterpreterDriverFactory === "undefined" ? Object : _codeinterpreterdriverfactory.CodeInterpreterDriverFactory,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], CodeInterpreterService);

//# sourceMappingURL=code-interpreter.service.js.map