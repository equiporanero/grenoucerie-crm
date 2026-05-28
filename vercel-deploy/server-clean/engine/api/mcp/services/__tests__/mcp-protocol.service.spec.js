"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _testing = require("@nestjs/testing");
const _jsonrpcerrorcodeconst = require("../../constants/json-rpc-error-code.const");
const _mcpclosedworldreadonlytoolannotationsconst = require("../../constants/mcp-closed-world-read-only-tool-annotations.const");
const _mcpexecutetoolannotationsconst = require("../../constants/mcp-execute-tool-annotations.const");
const _mcpopenworldreadonlytoolannotationsconst = require("../../constants/mcp-open-world-read-only-tool-annotations.const");
const _mcpprotocolversionconst = require("../../constants/mcp-protocol-version.const");
const _mcpserverinfoconst = require("../../constants/mcp-server-info.const");
const _mcpserverinstructionsconst = require("../../constants/mcp-server-instructions.const");
const _mcpprotocolservice = require("../mcp-protocol.service");
const _mcptoolexecutorservice = require("../mcp-tool-executor.service");
const _apikeyroleservice = require("../../../../core-modules/api-key/services/api-key-role.service");
const _executetooltool = require("../../../../core-modules/tool-provider/tools/execute-tool.tool");
const _gettoolcatalogtool = require("../../../../core-modules/tool-provider/tools/get-tool-catalog.tool");
const _learntoolstool = require("../../../../core-modules/tool-provider/tools/learn-tools.tool");
const _loadskilltool = require("../../../../core-modules/tool-provider/tools/load-skill.tool");
const _toolregistryservice = require("../../../../core-modules/tool-provider/services/tool-registry.service");
const _skillservice = require("../../../../metadata-modules/skill/skill.service");
const _userroleservice = require("../../../../metadata-modules/user-role/user-role.service");
describe('McpProtocolService', ()=>{
    let service;
    let _toolRegistryService;
    let userRoleService;
    let mcpToolExecutorService;
    let apiKeyRoleService;
    const mockWorkspace = {
        id: 'workspace-1'
    };
    const mockUserWorkspaceId = 'user-workspace-1';
    const mockRoleId = 'role-1';
    const mockAdminRoleId = 'admin-role-1';
    const mockApiKey = {
        id: 'api-key-1',
        workspaceId: mockWorkspace.id
    };
    const EXPECTED_MCP_TOOL_NAMES = [
        _gettoolcatalogtool.GET_TOOL_CATALOG_TOOL_NAME,
        _learntoolstool.LEARN_TOOLS_TOOL_NAME,
        _executetooltool.EXECUTE_TOOL_TOOL_NAME,
        _loadskilltool.LOAD_SKILL_TOOL_NAME,
        'search_help_center'
    ];
    const EXPECTED_MCP_TOOL_ANNOTATIONS = {
        [_gettoolcatalogtool.GET_TOOL_CATALOG_TOOL_NAME]: _mcpclosedworldreadonlytoolannotationsconst.MCP_CLOSED_WORLD_READ_ONLY_TOOL_ANNOTATIONS,
        [_learntoolstool.LEARN_TOOLS_TOOL_NAME]: _mcpclosedworldreadonlytoolannotationsconst.MCP_CLOSED_WORLD_READ_ONLY_TOOL_ANNOTATIONS,
        [_executetooltool.EXECUTE_TOOL_TOOL_NAME]: _mcpexecutetoolannotationsconst.MCP_EXECUTE_TOOL_ANNOTATIONS,
        [_loadskilltool.LOAD_SKILL_TOOL_NAME]: _mcpclosedworldreadonlytoolannotationsconst.MCP_CLOSED_WORLD_READ_ONLY_TOOL_ANNOTATIONS,
        search_help_center: _mcpopenworldreadonlytoolannotationsconst.MCP_OPEN_WORLD_READ_ONLY_TOOL_ANNOTATIONS
    };
    beforeEach(async ()=>{
        const mockSearchHelpCenterTool = {
            description: 'Search help center',
            inputSchema: {
                jsonSchema: {
                    type: 'object'
                }
            },
            execute: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _mcpprotocolservice.McpProtocolService,
                {
                    provide: _toolregistryservice.ToolRegistryService,
                    useValue: {
                        buildToolIndex: jest.fn().mockResolvedValue([]),
                        getToolsByName: jest.fn().mockResolvedValue({
                            search_help_center: mockSearchHelpCenterTool
                        }),
                        getToolInfo: jest.fn().mockResolvedValue([]),
                        resolveAndExecute: jest.fn()
                    }
                },
                {
                    provide: _userroleservice.UserRoleService,
                    useValue: {
                        getRoleIdForUserWorkspace: jest.fn()
                    }
                },
                {
                    provide: _mcptoolexecutorservice.McpToolExecutorService,
                    useValue: {
                        handleToolCall: jest.fn(),
                        handleToolsListing: jest.fn()
                    }
                },
                {
                    provide: _apikeyroleservice.ApiKeyRoleService,
                    useValue: {
                        getRoleIdForApiKeyId: jest.fn().mockResolvedValue(mockAdminRoleId)
                    }
                },
                {
                    provide: _skillservice.SkillService,
                    useValue: {
                        findFlatSkillsByNames: jest.fn().mockResolvedValue([]),
                        findAllFlatSkills: jest.fn().mockResolvedValue([])
                    }
                }
            ]
        }).compile();
        service = module.get(_mcpprotocolservice.McpProtocolService);
        _toolRegistryService = module.get(_toolregistryservice.ToolRegistryService);
        userRoleService = module.get(_userroleservice.UserRoleService);
        mcpToolExecutorService = module.get(_mcptoolexecutorservice.McpToolExecutorService);
        apiKeyRoleService = module.get(_apikeyroleservice.ApiKeyRoleService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('handleInitialize', ()=>{
        it('should return spec-compliant initialization response', ()=>{
            const requestId = '123';
            const result = service.handleInitialize(requestId);
            expect(result).toEqual({
                id: requestId,
                jsonrpc: '2.0',
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
        });
    });
    describe('getRoleId', ()=>{
        it('should return role ID when available', async ()=>{
            userRoleService.getRoleIdForUserWorkspace.mockResolvedValue(mockRoleId);
            const result = await service.getRoleId('workspace-1', 'user-workspace-1');
            expect(result).toBe(mockRoleId);
            expect(userRoleService.getRoleIdForUserWorkspace).toHaveBeenCalledWith({
                workspaceId: 'workspace-1',
                userWorkspaceId: 'user-workspace-1'
            });
        });
        it('should throw when userWorkspaceId is missing and no apiKey is provided', async ()=>{
            await expect(service.getRoleId('workspace-1', undefined)).rejects.toThrow(new _common.HttpException('User workspace ID missing', _common.HttpStatus.FORBIDDEN));
        });
        it('should throw when role ID is missing', async ()=>{
            userRoleService.getRoleIdForUserWorkspace.mockResolvedValue(undefined);
            await expect(service.getRoleId('workspace-1', 'user-workspace-1')).rejects.toThrow(new _common.HttpException('Role ID missing', _common.HttpStatus.FORBIDDEN));
        });
        it('should return role ID from ApiKeyRoleService when apiKey is provided', async ()=>{
            const result = await service.getRoleId('workspace-1', undefined, mockApiKey);
            expect(result).toBe(mockAdminRoleId);
            expect(apiKeyRoleService.getRoleIdForApiKeyId).toHaveBeenCalledWith(mockApiKey.id, 'workspace-1');
        });
    });
    describe('handleMCPCoreQuery', ()=>{
        it('should handle initialize method', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'initialize',
                id: '123'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(result).toEqual({
                id: '123',
                jsonrpc: '2.0',
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
        });
        it('should return null for notifications (no id)', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'notifications/initialized'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(result).toBeNull();
        });
        it('should build a ToolSet with exactly 5 tools and pass it to executor for tools/call', async ()=>{
            userRoleService.getRoleIdForUserWorkspace.mockResolvedValue(mockRoleId);
            const mockToolCallResponse = {
                id: '123',
                jsonrpc: '2.0',
                result: {
                    content: [
                        {
                            type: 'text',
                            text: '{}'
                        }
                    ],
                    isError: false
                }
            };
            mcpToolExecutorService.handleToolCall.mockResolvedValue(mockToolCallResponse);
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: {
                    name: 'execute_tool',
                    arguments: {
                        toolName: 'find_companies',
                        arguments: {}
                    }
                },
                id: '123'
            };
            await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(mcpToolExecutorService.handleToolCall).toHaveBeenCalledWith('123', expect.objectContaining(Object.fromEntries(EXPECTED_MCP_TOOL_NAMES.map((name)=>[
                    name,
                    expect.objectContaining({
                        description: expect.any(String),
                        annotations: EXPECTED_MCP_TOOL_ANNOTATIONS[name],
                        execute: expect.any(Function)
                    })
                ]))), mockRequest.params, undefined);
        });
        it('should build a ToolSet with exactly 5 tools and pass it to executor for tools/list', async ()=>{
            userRoleService.getRoleIdForUserWorkspace.mockResolvedValue(mockRoleId);
            mcpToolExecutorService.handleToolsListing.mockReturnValue({
                id: '123',
                jsonrpc: '2.0',
                result: {
                    tools: []
                }
            });
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/list',
                id: '123'
            };
            await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(mcpToolExecutorService.handleToolsListing).toHaveBeenCalledWith('123', expect.objectContaining(Object.fromEntries(EXPECTED_MCP_TOOL_NAMES.map((name)=>[
                    name,
                    expect.objectContaining({
                        description: expect.any(String),
                        annotations: EXPECTED_MCP_TOOL_ANNOTATIONS[name]
                    })
                ]))));
        });
        it('should return prompts list without role resolution', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'prompts/list',
                id: '123'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(result).toEqual({
                id: '123',
                jsonrpc: '2.0',
                result: {
                    prompts: []
                }
            });
            expect(userRoleService.getRoleIdForUserWorkspace).not.toHaveBeenCalled();
        });
        it('should return resources list without role resolution', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'resources/list',
                id: '123'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(result).toEqual({
                id: '123',
                jsonrpc: '2.0',
                result: {
                    resources: []
                }
            });
            expect(userRoleService.getRoleIdForUserWorkspace).not.toHaveBeenCalled();
        });
        it('should return method not found for unknown methods', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'unknown/method',
                id: '123'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(result).toEqual({
                id: '123',
                jsonrpc: '2.0',
                error: {
                    code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.METHOD_NOT_FOUND,
                    message: "Method 'unknown/method' not found"
                }
            });
        });
        it('should handle tools/call with apiKey authentication', async ()=>{
            const mockToolCallResponse = {
                id: '123',
                jsonrpc: '2.0',
                result: {
                    content: [
                        {
                            type: 'text',
                            text: '{}'
                        }
                    ],
                    isError: false
                }
            };
            mcpToolExecutorService.handleToolCall.mockResolvedValue(mockToolCallResponse);
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: {
                    name: 'get_tool_catalog',
                    arguments: {}
                },
                id: '123'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                apiKey: mockApiKey
            });
            expect(result).toEqual(mockToolCallResponse);
            expect(apiKeyRoleService.getRoleIdForApiKeyId).toHaveBeenCalledWith(mockApiKey.id, mockWorkspace.id);
        });
        it('should wrap unexpected errors with INTERNAL_ERROR code', async ()=>{
            userRoleService.getRoleIdForUserWorkspace.mockResolvedValue(mockRoleId);
            mcpToolExecutorService.handleToolCall.mockRejectedValue(new Error('Something went wrong'));
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: {
                    name: 'execute_tool',
                    arguments: {}
                },
                id: '123'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(result).toEqual({
                id: '123',
                jsonrpc: '2.0',
                error: {
                    code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.INTERNAL_ERROR,
                    message: 'Something went wrong'
                }
            });
        });
        it('should wrap HttpException errors with SERVER_ERROR code', async ()=>{
            userRoleService.getRoleIdForUserWorkspace.mockRejectedValue(new _common.HttpException('Role ID missing', _common.HttpStatus.FORBIDDEN));
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: {
                    name: 'execute_tool',
                    arguments: {}
                },
                id: '123'
            };
            const result = await service.handleMCPCoreQuery(mockRequest, {
                workspace: mockWorkspace,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: undefined
            });
            expect(result).toEqual({
                id: '123',
                jsonrpc: '2.0',
                error: {
                    code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.SERVER_ERROR,
                    message: 'Role ID missing'
                }
            });
        });
    });
});

//# sourceMappingURL=mcp-protocol.service.spec.js.map