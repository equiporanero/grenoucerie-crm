"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WebhookToolProvider", {
    enumerable: true,
    get: function() {
        return WebhookToolProvider;
    }
});
const _common = require("@nestjs/common");
const _ai = require("twenty-shared/ai");
const _constants = require("twenty-shared/constants");
const _executetoolfromtoolsetutil = require("../utils/execute-tool-from-tool-set.util");
const _toolsettodescriptorsutil = require("../utils/tool-set-to-descriptors.util");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
const _webhooktoolworkspaceservice = require("../../../metadata-modules/webhook/tools/services/webhook-tool.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WebhookToolProvider = class WebhookToolProvider {
    async isAvailable(context) {
        return this.permissionsService.checkRolesPermissions(context.rolePermissionConfig, context.workspaceId, _constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS);
    }
    async generateDescriptors(context, options) {
        return (0, _toolsettodescriptorsutil.toolSetToDescriptors)(this.buildToolSet(context), _ai.ToolCategory.WEBHOOK, {
            includeSchemas: options?.includeSchemas ?? true
        });
    }
    async executeStaticTool(toolName, args, context) {
        return (0, _executetoolfromtoolsetutil.executeToolFromToolSet)(this.buildToolSet(context), toolName, args, _ai.ToolCategory.WEBHOOK);
    }
    buildToolSet(context) {
        return this.webhookToolService.generateWebhookTools(context.workspaceId);
    }
    constructor(webhookToolService, permissionsService){
        this.webhookToolService = webhookToolService;
        this.permissionsService = permissionsService;
        this.category = _ai.ToolCategory.WEBHOOK;
    }
};
WebhookToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _webhooktoolworkspaceservice.WebhookToolWorkspaceService === "undefined" ? Object : _webhooktoolworkspaceservice.WebhookToolWorkspaceService,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], WebhookToolProvider);

//# sourceMappingURL=webhook-tool.provider.js.map