"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "McpCoreController", {
    enumerable: true,
    get: function() {
        return McpCoreController;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _jsonrpc = require("../dtos/json-rpc");
const _mcpauthguard = require("../guards/mcp-auth.guard");
const _mcpprotocolservice = require("../services/mcp-protocol.service");
const _writesseeventutil = require("../utils/write-sse-event.util");
const _restapiexceptionfilter = require("../../rest/rest-api-exception.filter");
const _flatworkspacetype = require("../../../core-modules/workspace/types/flat-workspace.type");
const _authapikeydecorator = require("../../../decorators/auth/auth-api-key.decorator");
const _authuserworkspaceiddecorator = require("../../../decorators/auth/auth-user-workspace-id.decorator");
const _authuserdecorator = require("../../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
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
let McpCoreController = class McpCoreController {
    async handleMcpCore(body, workspace, apiKey, user, userWorkspaceId, acceptHeader, res) {
        const authContext = {
            workspace,
            userId: user?.id,
            userWorkspaceId,
            apiKey
        };
        // JSON-RPC notifications (no id) expect no response body regardless of Accept
        if (!(0, _utils.isDefined)(body.id)) {
            await this.mcpProtocolService.handleMCPCoreQuery(body, authContext);
            res.status(_common.HttpStatus.ACCEPTED);
            return;
        }
        const clientAcceptsSse = (0, _utils.isDefined)(acceptHeader) && acceptHeader.split(',').some((type)=>type.trim().startsWith('text/event-stream'));
        if (clientAcceptsSse) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            // Prevent browsers from MIME-sniffing the SSE stream as HTML
            res.setHeader('X-Content-Type-Options', 'nosniff');
            const sseWriter = (data)=>{
                (0, _writesseeventutil.writeSseEvent)(res, data);
            };
            const result = await this.mcpProtocolService.handleMCPCoreQuery(body, authContext, sseWriter);
            if ((0, _utils.isDefined)(result)) {
                (0, _writesseeventutil.writeSseEvent)(res, result);
            }
            res.end();
            return;
        }
        const result = await this.mcpProtocolService.handleMCPCoreQuery(body, authContext);
        return result;
    }
    constructor(mcpProtocolService){
        this.mcpProtocolService = mcpProtocolService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    (0, _common.UsePipes)(new _common.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
    })),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(3, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_param(4, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(5, (0, _common.Headers)('accept')),
    _ts_param(6, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jsonrpc.JsonRpc === "undefined" ? Object : _jsonrpc.JsonRpc,
        typeof _flatworkspacetype.FlatWorkspace === "undefined" ? Object : _flatworkspacetype.FlatWorkspace,
        Object,
        Object,
        Object,
        Object,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], McpCoreController.prototype, "handleMcpCore", null);
McpCoreController = _ts_decorate([
    (0, _common.Controller)('mcp'),
    (0, _common.UseGuards)(_mcpauthguard.McpAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UseFilters)(_restapiexceptionfilter.RestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mcpprotocolservice.McpProtocolService === "undefined" ? Object : _mcpprotocolservice.McpProtocolService
    ])
], McpCoreController);

//# sourceMappingURL=mcp-core.controller.js.map