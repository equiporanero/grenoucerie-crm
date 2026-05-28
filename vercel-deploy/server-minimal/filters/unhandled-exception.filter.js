"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UnhandledExceptionFilter", {
    enumerable: true,
    get: function() {
        return UnhandledExceptionFilter;
    }
});
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UnhandledExceptionFilter = class UnhandledExceptionFilter {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (!response.header || response.headersSent) {
            return;
        }
        // TODO: Check if needed, remove otherwise.
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        const status = exception instanceof _common.HttpException ? exception.getStatus() : 500;
        response.status(status).json(exception.response ?? exception.message);
    }
};
UnhandledExceptionFilter = _ts_decorate([
    (0, _common.Catch)()
], UnhandledExceptionFilter);

//# sourceMappingURL=unhandled-exception.filter.js.map