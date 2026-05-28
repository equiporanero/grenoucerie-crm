"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "McpModule", {
    enumerable: true,
    get: function() {
        return McpModule;
    }
});
const _common = require("@nestjs/common");
const _mcpcorecontroller = require("./controllers/mcp-core.controller");
const _mcpauthguard = require("./guards/mcp-auth.guard");
const _mcpprotocolservice = require("./services/mcp-protocol.service");
const _mcptoolexecutorservice = require("./services/mcp-tool-executor.service");
const _apikeymodule = require("../../core-modules/api-key/api-key.module");
const _metricsmodule = require("../../core-modules/metrics/metrics.module");
const _tokenmodule = require("../../core-modules/auth/token/token.module");
const _twentyconfigmodule = require("../../core-modules/twenty-config/twenty-config.module");
const _toolprovidermodule = require("../../core-modules/tool-provider/tool-provider.module");
const _jwtauthguard = require("../../guards/jwt-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _skillmodule = require("../../metadata-modules/skill/skill.module");
const _userrolemodule = require("../../metadata-modules/user-role/user-role.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let McpModule = class McpModule {
};
McpModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _apikeymodule.ApiKeyModule,
            _metricsmodule.MetricsModule,
            _tokenmodule.TokenModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _userrolemodule.UserRoleModule,
            _toolprovidermodule.ToolProviderModule,
            _skillmodule.SkillModule,
            _twentyconfigmodule.TwentyConfigModule
        ],
        controllers: [
            _mcpcorecontroller.McpCoreController
        ],
        exports: [
            _mcpprotocolservice.McpProtocolService
        ],
        providers: [
            _jwtauthguard.JwtAuthGuard,
            _mcpauthguard.McpAuthGuard,
            _workspaceauthguard.WorkspaceAuthGuard,
            _mcpprotocolservice.McpProtocolService,
            _mcptoolexecutorservice.McpToolExecutorService
        ]
    })
], McpModule);

//# sourceMappingURL=mcp.module.js.map