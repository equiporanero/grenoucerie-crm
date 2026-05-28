"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "McpProtocolService", {
    enumerable: true,
    get: function() {
        return McpProtocolService;
    }
});
const _common = require("@nestjs/common");
const _ai = require("ai");
const _utils = require("twenty-shared/utils");
const _jsonrpcerrorcodeconst = require("../constants/json-rpc-error-code.const");
const _mcpclosedworldreadonlytoolannotationsconst = require("../constants/mcp-closed-world-read-only-tool-annotations.const");
const _mcpexcludedtoolnamesconst = require("../constants/mcp-excluded-tool-names.const");
const _mcpexecutetoolannotationsconst = require("../constants/mcp-execute-tool-annotations.const");
const _mcpopenworldreadonlytoolannotationsconst = require("../constants/mcp-open-world-read-only-tool-annotations.const");
const _mcpprotocolversionconst = require("../constants/mcp-protocol-version.const");
const _mcpserverinfoconst = require("../constants/mcp-server-info.const");
const _mcpserverinstructionsconst = require("../constants/mcp-server-instructions.const");
const _mcptoolexecutorservice = require("./mcp-tool-executor.service");
const _wrapjsonrpcresponseutil = require("../utils/wrap-jsonrpc-response.util");
const _apikeyroleservice = require("../../../core-modules/api-key/services/api-key-role.service");
const _buildapikeyauthcontextutil = require("../../../core-modules/auth/utils/build-api-key-auth-context.util");
const _commonpreloadtoolsconst = require("../../../core-modules/tool-provider/constants/common-preload-tools.const");
const _toolregistryservice = require("../../../core-modules/tool-provider/services/tool-registry.service");
const _executetooltool = require("../../../core-modules/tool-provider/tools/execute-tool.tool");
const _gettoolcatalogtool = require("../../../core-modules/tool-provider/tools/get-tool-catalog.tool");
const _learntoolstool = require("../../../core-modules/tool-provider/tools/learn-tools.tool");
const _loadskilltool = require("../../../core-modules/tool-provider/tools/load-skill.tool");
const _skillservice = require("../../../metadata-modules/skill/skill.service");
const _userroleservice = require("../../../metadata-modules/user-role/user-role.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const MCP_PRELOADED_TOOL_ANNOTATIONS = {
    search_help_center: _mcpopenworldreadonlytoolannotationsconst.MCP_OPEN_WORLD_READ_ONLY_TOOL_ANNOTATIONS
};
const annotatePreloadedMcpTools = (toolSet)=>Object.fromEntries(Object.entries(toolSet).map(([name, toolDefinition])=>{
        const annotations = MCP_PRELOADED_TOOL_ANNOTATIONS[name];
        if (!(0, _utils.isDefined)(annotations)) {
            throw new Error(`Missing MCP annotations for preloaded tool "${name}"`);
        }
        return [
            name,
            {
                ...toolDefinition,
                annotations
            }
        ];
    }));
let McpProtocolService = class McpProtocolService {
    handleInitialize(requestId) {
        return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(requestId, {
            result: {
                protocolVersion: _mcpprotocolversionconst.MCP_PROTOCOL_VERSION,
                capabilities: {
                    tools: {
                        listChanged: false
                    },
                    resources: {
                        listChanged: false
                    },
                    prompts: {
                        listChanged: false
                    }
                },
                serverInfo: _mcpserverinfoconst.MCP_SERVER_INFO,
                instructions: _mcpserverinstructionsconst.MCP_SERVER_INSTRUCTIONS
            }
        });
    }
    async getRoleId(workspaceId, userWorkspaceId, apiKey) {
        if ((0, _utils.isDefined)(apiKey)) {
            return this.apiKeyRoleService.getRoleIdForApiKeyId(apiKey.id, workspaceId);
        }
        if (!userWorkspaceId) {
            throw new _common.HttpException('User workspace ID missing', _common.HttpStatus.FORBIDDEN);
        }
        const roleId = await this.userRoleService.getRoleIdForUserWorkspace({
            workspaceId,
            userWorkspaceId
        });
        if (!roleId) {
            throw new _common.HttpException('Role ID missing', _common.HttpStatus.FORBIDDEN);
        }
        return roleId;
    }
    async buildMcpToolSet(workspace, roleId, options) {
        const toolContext = {
            workspaceId: workspace.id,
            roleId,
            authContext: options?.authContext,
            userId: options?.userId,
            userWorkspaceId: options?.userWorkspaceId
        };
        const preloadedTools = await this.toolRegistry.getToolsByName(_commonpreloadtoolsconst.COMMON_PRELOAD_TOOLS, toolContext, {
            includeLoadingMessage: false
        });
        return {
            ...annotatePreloadedMcpTools(preloadedTools),
            [_gettoolcatalogtool.GET_TOOL_CATALOG_TOOL_NAME]: {
                ...(0, _gettoolcatalogtool.createGetToolCatalogTool)(this.toolRegistry, workspace.id, roleId, {
                    userId: options?.userId,
                    userWorkspaceId: options?.userWorkspaceId,
                    excludeTools: _mcpexcludedtoolnamesconst.MCP_EXCLUDED_TOOL_NAMES
                }),
                inputSchema: (0, _ai.zodSchema)(_gettoolcatalogtool.getToolCatalogInputSchema),
                annotations: _mcpclosedworldreadonlytoolannotationsconst.MCP_CLOSED_WORLD_READ_ONLY_TOOL_ANNOTATIONS
            },
            [_learntoolstool.LEARN_TOOLS_TOOL_NAME]: {
                ...(0, _learntoolstool.createLearnToolsTool)(this.toolRegistry, toolContext, _mcpexcludedtoolnamesconst.MCP_EXCLUDED_TOOL_NAMES),
                inputSchema: (0, _ai.zodSchema)(_learntoolstool.learnToolsInputSchema),
                annotations: _mcpclosedworldreadonlytoolannotationsconst.MCP_CLOSED_WORLD_READ_ONLY_TOOL_ANNOTATIONS
            },
            [_executetooltool.EXECUTE_TOOL_TOOL_NAME]: {
                ...(0, _executetooltool.createExecuteToolTool)(this.toolRegistry, toolContext, {
                    excludeTools: _mcpexcludedtoolnamesconst.MCP_EXCLUDED_TOOL_NAMES
                }),
                inputSchema: _executetooltool.executeToolInputSchema,
                annotations: _mcpexecutetoolannotationsconst.MCP_EXECUTE_TOOL_ANNOTATIONS
            },
            [_loadskilltool.LOAD_SKILL_TOOL_NAME]: {
                ...(0, _loadskilltool.createLoadSkillTool)((names)=>this.skillService.findFlatSkillsByNames(names, workspace.id), async ()=>{
                    const allSkills = await this.skillService.findAllFlatSkills(workspace.id);
                    return allSkills.map((skill)=>skill.name);
                }),
                inputSchema: (0, _ai.zodSchema)(_loadskilltool.loadSkillInputSchema),
                annotations: _mcpclosedworldreadonlytoolannotationsconst.MCP_CLOSED_WORLD_READ_ONLY_TOOL_ANNOTATIONS
            }
        };
    }
    // Returns null for JSON-RPC notifications (no id), which require no response body
    async handleMCPCoreQuery({ id, method, params }, { workspace, userId, userWorkspaceId, apiKey }, sseWriter) {
        try {
            // JSON-RPC notifications have no id and expect no response
            if (!(0, _utils.isDefined)(id)) {
                return null;
            }
            if (method === 'initialize') {
                return this.handleInitialize(id);
            }
            if (method === 'ping') {
                return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                    result: {}
                });
            }
            if (method === 'prompts/list') {
                return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                    result: {
                        prompts: []
                    }
                });
            }
            if (method === 'resources/list') {
                return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                    result: {
                        resources: []
                    }
                });
            }
            if (method !== 'tools/list' && method !== 'tools/call') {
                return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                    error: {
                        code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.METHOD_NOT_FOUND,
                        message: `Method '${method}' not found`
                    }
                });
            }
            const roleId = await this.getRoleId(workspace.id, userWorkspaceId, apiKey);
            const authContext = (0, _utils.isDefined)(apiKey) ? (0, _buildapikeyauthcontextutil.buildApiKeyAuthContext)({
                workspace,
                apiKey
            }) : undefined;
            const toolSet = await this.buildMcpToolSet(workspace, roleId, {
                authContext,
                userId,
                userWorkspaceId
            });
            if (method === 'tools/call') {
                if (!params) {
                    return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                        error: {
                            code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.INVALID_PARAMS,
                            message: 'tools/call requires params with name and arguments'
                        }
                    });
                }
                return await this.mcpToolExecutorService.handleToolCall(id, toolSet, params, sseWriter);
            }
            return this.mcpToolExecutorService.handleToolsListing(id, toolSet);
        } catch (error) {
            if (error instanceof _common.HttpException) {
                return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id ?? 0, {
                    error: {
                        code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.SERVER_ERROR,
                        message: error.message || 'Request failed'
                    }
                });
            }
            return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id ?? 0, {
                error: {
                    code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.INTERNAL_ERROR,
                    message: error instanceof Error ? error.message : 'Internal server error'
                }
            });
        }
    }
    constructor(toolRegistry, userRoleService, mcpToolExecutorService, apiKeyRoleService, skillService){
        this.toolRegistry = toolRegistry;
        this.userRoleService = userRoleService;
        this.mcpToolExecutorService = mcpToolExecutorService;
        this.apiKeyRoleService = apiKeyRoleService;
        this.skillService = skillService;
    }
};
McpProtocolService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _toolregistryservice.ToolRegistryService === "undefined" ? Object : _toolregistryservice.ToolRegistryService,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _mcptoolexecutorservice.McpToolExecutorService === "undefined" ? Object : _mcptoolexecutorservice.McpToolExecutorService,
        typeof _apikeyroleservice.ApiKeyRoleService === "undefined" ? Object : _apikeyroleservice.ApiKeyRoleService,
        typeof _skillservice.SkillService === "undefined" ? Object : _skillservice.SkillService
    ])
], McpProtocolService);

//# sourceMappingURL=mcp-protocol.service.js.map