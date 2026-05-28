"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExceptionHandlerService", {
    enumerable: true,
    get: function() {
        return ExceptionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _interfaces = require("./interfaces");
const _exceptionhandlerconstants = require("./exception-handler.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ExceptionHandlerService = class ExceptionHandlerService {
    captureExceptions(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    exceptions, options) {
        return this.driver.captureExceptions(exceptions, options);
    }
    constructor(driver){
        this.driver = driver;
    }
};
ExceptionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_exceptionhandlerconstants.EXCEPTION_HANDLER_DRIVER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _interfaces.ExceptionHandlerDriverInterface === "undefined" ? Object : _interfaces.ExceptionHandlerDriverInterface
    ])
], ExceptionHandlerService);

//# sourceMappingURL=exception-handler.service.js.map