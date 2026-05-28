"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionToolProvider", {
    enumerable: true,
    get: function() {
        return ActionToolProvider;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _zod = require("zod");
const _ai = require("twenty-shared/ai");
const _codeinterpreterservice = require("../../code-interpreter/code-interpreter.service");
const _codeinterpretertool = require("../../tool/tools/code-interpreter-tool/code-interpreter-tool");
const _draftemailtool = require("../../tool/tools/email-tool/draft-email-tool");
const _sendemailtool = require("../../tool/tools/email-tool/send-email-tool");
const _httptool = require("../../tool/tools/http-tool/http-tool");
const _navigateapptool = require("../../tool/tools/navigate-tool/navigate-app-tool");
const _searchhelpcentertool = require("../../tool/tools/search-help-center-tool/search-help-center-tool");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ActionToolProvider = class ActionToolProvider {
    async isAvailable(_context) {
        return true;
    }
    async generateDescriptors(context, options) {
        const includeSchemas = options?.includeSchemas ?? true;
        const descriptors = [];
        const hasHttpPermission = await this.permissionsService.hasToolPermission(context.rolePermissionConfig, context.workspaceId, _constants.PermissionFlagType.HTTP_REQUEST_TOOL);
        if (hasHttpPermission) {
            descriptors.push(this.buildDescriptor('http_request', this.httpTool, includeSchemas));
        }
        const hasEmailPermission = await this.permissionsService.hasToolPermission(context.rolePermissionConfig, context.workspaceId, _constants.PermissionFlagType.SEND_EMAIL_TOOL);
        if (hasEmailPermission) {
            descriptors.push(this.buildDescriptor('send_email', this.sendEmailTool, includeSchemas));
            descriptors.push(this.buildDescriptor('draft_email', this.draftEmailTool, includeSchemas));
        }
        descriptors.push(this.buildDescriptor('search_help_center', this.searchHelpCenterTool, includeSchemas));
        descriptors.push(this.buildDescriptor('navigate_app', this.navigateAppTool, includeSchemas));
        const hasCodeInterpreterPermission = this.codeInterpreterService.isEnabled() && await this.permissionsService.hasToolPermission(context.rolePermissionConfig, context.workspaceId, _constants.PermissionFlagType.CODE_INTERPRETER_TOOL);
        if (hasCodeInterpreterPermission) {
            descriptors.push(this.buildDescriptor('code_interpreter', this.codeInterpreterTool, includeSchemas));
        }
        return descriptors;
    }
    async executeStaticTool(toolName, args, context) {
        const tool = this.toolMap.get(toolName);
        if (!tool) {
            throw new Error(`Unknown action tool "${toolName}" (category: ${this.category})`);
        }
        return tool.execute(args, {
            workspaceId: context.workspaceId,
            userId: context.userId,
            userWorkspaceId: context.userWorkspaceId,
            onCodeExecutionUpdate: context.onCodeExecutionUpdate
        });
    }
    buildDescriptor(toolId, tool, includeSchemas) {
        return {
            name: toolId,
            description: tool.description,
            category: _ai.ToolCategory.ACTION,
            icon: 'IconPlayerPlay',
            ...includeSchemas && {
                inputSchema: _zod.z.toJSONSchema(tool.inputSchema)
            },
            executionRef: {
                kind: 'static',
                toolId
            }
        };
    }
    constructor(httpTool, sendEmailTool, draftEmailTool, searchHelpCenterTool, codeInterpreterTool, navigateAppTool, codeInterpreterService, permissionsService){
        this.httpTool = httpTool;
        this.sendEmailTool = sendEmailTool;
        this.draftEmailTool = draftEmailTool;
        this.searchHelpCenterTool = searchHelpCenterTool;
        this.codeInterpreterTool = codeInterpreterTool;
        this.navigateAppTool = navigateAppTool;
        this.codeInterpreterService = codeInterpreterService;
        this.permissionsService = permissionsService;
        this.category = _ai.ToolCategory.ACTION;
        this.toolMap = new Map([
            [
                'http_request',
                this.httpTool
            ],
            [
                'send_email',
                this.sendEmailTool
            ],
            [
                'draft_email',
                this.draftEmailTool
            ],
            [
                'search_help_center',
                this.searchHelpCenterTool
            ],
            [
                'code_interpreter',
                this.codeInterpreterTool
            ],
            [
                'navigate_app',
                this.navigateAppTool
            ]
        ]);
    }
};
ActionToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httptool.HttpTool === "undefined" ? Object : _httptool.HttpTool,
        typeof _sendemailtool.SendEmailTool === "undefined" ? Object : _sendemailtool.SendEmailTool,
        typeof _draftemailtool.DraftEmailTool === "undefined" ? Object : _draftemailtool.DraftEmailTool,
        typeof _searchhelpcentertool.SearchHelpCenterTool === "undefined" ? Object : _searchhelpcentertool.SearchHelpCenterTool,
        typeof _codeinterpretertool.CodeInterpreterTool === "undefined" ? Object : _codeinterpretertool.CodeInterpreterTool,
        typeof _navigateapptool.NavigateAppTool === "undefined" ? Object : _navigateapptool.NavigateAppTool,
        typeof _codeinterpreterservice.CodeInterpreterService === "undefined" ? Object : _codeinterpreterservice.CodeInterpreterService,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], ActionToolProvider);

//# sourceMappingURL=action-tool.provider.js.map