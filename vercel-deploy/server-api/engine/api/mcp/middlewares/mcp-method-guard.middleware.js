"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "McpMethodGuardMiddleware", {
    enumerable: true,
    get: function() {
        return McpMethodGuardMiddleware;
    }
});
const _common = require("@nestjs/common");
const _jsonrpcerrorcodeconst = require("../constants/json-rpc-error-code.const");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let McpMethodGuardMiddleware = class McpMethodGuardMiddleware {
    use(req, res, next) {
        if (req.method === 'POST') {
            next();
            return;
        }
        res.setHeader('Allow', 'POST');
        res.status(405).json({
            jsonrpc: '2.0',
            error: {
                code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.INVALID_REQUEST,
                message: `HTTP method ${req.method} is not allowed. This MCP endpoint only accepts POST requests.`
            },
            id: null
        });
    }
};
McpMethodGuardMiddleware = _ts_decorate([
    (0, _common.Injectable)()
], McpMethodGuardMiddleware);

//# sourceMappingURL=mcp-method-guard.middleware.js.map