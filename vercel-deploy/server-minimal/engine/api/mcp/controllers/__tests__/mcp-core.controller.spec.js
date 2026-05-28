"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _logicfunction = require("twenty-shared/logic-function");
const _mcpprotocolversionconst = require("../../constants/mcp-protocol-version.const");
const _mcpserverinfoconst = require("../../constants/mcp-server-info.const");
const _mcpserverinstructionsconst = require("../../constants/mcp-server-instructions.const");
const _mcpcorecontroller = require("../mcp-core.controller");
const _mcpauthguard = require("../../guards/mcp-auth.guard");
const _mcpprotocolservice = require("../../services/mcp-protocol.service");
const _accesstokenservice = require("../../../../core-modules/auth/token/services/access-token.service");
const _httpexceptionhandlerservice = require("../../../../core-modules/exception-handler/http-exception-handler.service");
const _twentyconfigservice = require("../../../../core-modules/twenty-config/twenty-config.service");
const _jwtauthguard = require("../../../../guards/jwt-auth.guard");
const _workspacecachestorageservice = require("../../../../workspace-cache-storage/workspace-cache-storage.service");
describe('McpCoreController', ()=>{
    let controller;
    let mcpProtocolService;
    beforeEach(async ()=>{
        const mockMcpProtocolService = {
            handleMCPCoreQuery: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _mcpcorecontroller.McpCoreController
            ],
            providers: [
                {
                    provide: _mcpprotocolservice.McpProtocolService,
                    useValue: mockMcpProtocolService
                },
                {
                    provide: _accesstokenservice.AccessTokenService,
                    useValue: jest.fn()
                },
                {
                    provide: _workspacecachestorageservice.WorkspaceCacheStorageService,
                    useValue: jest.fn()
                },
                {
                    provide: _httpexceptionhandlerservice.HttpExceptionHandlerService,
                    useValue: {
                        handleError: jest.fn()
                    }
                },
                {
                    provide: _jwtauthguard.JwtAuthGuard,
                    useValue: {
                        canActivate: jest.fn().mockReturnValue(true)
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('http://localhost:3000')
                    }
                },
                _mcpauthguard.McpAuthGuard
            ]
        }).compile();
        controller = module.get(_mcpcorecontroller.McpCoreController);
        mcpProtocolService = module.get(_mcpprotocolservice.McpProtocolService);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
    describe('handleMcpCore', ()=>{
        const mockWorkspace = {
            id: 'workspace-1'
        };
        const mockUser = {
            id: 'user-1'
        };
        const mockUserWorkspaceId = 'user-workspace-1';
        const mockApiKey = {
            id: 'api-key-1'
        };
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            setHeader: jest.fn(),
            write: jest.fn(),
            end: jest.fn()
        };
        beforeEach(()=>{
            mockRes.status.mockClear();
            mockRes.setHeader.mockClear();
            mockRes.write.mockClear();
            mockRes.end.mockClear();
        });
        it('should call mcpProtocolService.handleMCPCoreQuery with correct parameters', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: {
                    name: 'testTool',
                    arguments: {
                        arg1: 'value1'
                    }
                },
                id: '123'
            };
            const mockResponse = {
                id: '123',
                jsonrpc: '2.0',
                result: {
                    content: [
                        {
                            type: 'text',
                            text: '{"result":"success"}'
                        }
                    ],
                    isError: false
                }
            };
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(mockResponse);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, mockUser, mockUserWorkspaceId, undefined, mockRes);
            expect(mcpProtocolService.handleMCPCoreQuery).toHaveBeenCalledWith(mockRequest, {
                workspace: mockWorkspace,
                userId: mockUser.id,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: mockApiKey
            });
            expect(result).toEqual(mockResponse);
        });
        it('should handle initialize method', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'initialize',
                id: '123'
            };
            const mockResponse = {
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
            };
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(mockResponse);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, mockUser, mockUserWorkspaceId, undefined, mockRes);
            expect(mcpProtocolService.handleMCPCoreQuery).toHaveBeenCalledWith(mockRequest, {
                workspace: mockWorkspace,
                userId: mockUser.id,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: mockApiKey
            });
            expect(result).toEqual(mockResponse);
        });
        it('should handle tools listing', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/list',
                id: '123'
            };
            const mockResponse = {
                id: '123',
                jsonrpc: '2.0',
                result: {
                    tools: [
                        {
                            name: 'testTool',
                            description: 'A test tool',
                            inputSchema: _logicfunction.DEFAULT_TOOL_INPUT_SCHEMA
                        }
                    ]
                }
            };
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(mockResponse);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, mockUser, mockUserWorkspaceId, undefined, mockRes);
            expect(mcpProtocolService.handleMCPCoreQuery).toHaveBeenCalledWith(mockRequest, {
                workspace: mockWorkspace,
                userId: mockUser.id,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: mockApiKey
            });
            expect(result).toEqual(mockResponse);
        });
        it('should return 202 with no body for notifications', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'notifications/initialized'
            };
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(null);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, mockUser, mockUserWorkspaceId, undefined, mockRes);
            expect(result).toBeUndefined();
            expect(mockRes.status).toHaveBeenCalledWith(202);
        });
        it('should handle API key auth without user', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: {
                    name: 'get_tool_catalog',
                    arguments: {}
                },
                id: '456'
            };
            const mockResponse = {
                id: '456',
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
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(mockResponse);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, undefined, undefined, undefined, mockRes);
            expect(mcpProtocolService.handleMCPCoreQuery).toHaveBeenCalledWith(mockRequest, {
                workspace: mockWorkspace,
                userId: undefined,
                userWorkspaceId: undefined,
                apiKey: mockApiKey
            });
            expect(result).toEqual(mockResponse);
        });
        it('should respond with SSE when client accepts text/event-stream', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: {
                    name: 'testTool',
                    arguments: {}
                },
                id: '789'
            };
            const mockResponse = {
                id: '789',
                jsonrpc: '2.0',
                result: {
                    content: [
                        {
                            type: 'text',
                            text: '{"ok":true}'
                        }
                    ],
                    isError: false
                }
            };
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(mockResponse);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, mockUser, mockUserWorkspaceId, 'application/json, text/event-stream', mockRes);
            // SSE path returns nothing — response is written directly
            expect(result).toBeUndefined();
            expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/event-stream');
            expect(mockRes.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
            expect(mockRes.setHeader).toHaveBeenCalledWith('Connection', 'keep-alive');
            expect(mockRes.setHeader).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
            expect(mockRes.write).toHaveBeenCalledWith(`event: message\ndata: ${JSON.stringify(mockResponse)}\n\n`);
            expect(mockRes.end).toHaveBeenCalled();
            // sseWriter callback should be passed to protocol service
            expect(mcpProtocolService.handleMCPCoreQuery).toHaveBeenCalledWith(mockRequest, {
                workspace: mockWorkspace,
                userId: mockUser.id,
                userWorkspaceId: mockUserWorkspaceId,
                apiKey: mockApiKey
            }, expect.any(Function));
        });
        it('should return JSON when client only accepts application/json', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'ping',
                id: '101'
            };
            const mockResponse = {
                id: '101',
                jsonrpc: '2.0',
                result: {}
            };
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(mockResponse);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, mockUser, mockUserWorkspaceId, 'application/json', mockRes);
            expect(result).toEqual(mockResponse);
            expect(mockRes.setHeader).not.toHaveBeenCalled();
            expect(mockRes.write).not.toHaveBeenCalled();
            expect(mockRes.end).not.toHaveBeenCalled();
        });
        it('should return 202 for notifications even when client accepts SSE', async ()=>{
            const mockRequest = {
                jsonrpc: '2.0',
                method: 'notifications/initialized'
            };
            mcpProtocolService.handleMCPCoreQuery.mockResolvedValue(null);
            const result = await controller.handleMcpCore(mockRequest, mockWorkspace, mockApiKey, mockUser, mockUserWorkspaceId, 'application/json, text/event-stream', mockRes);
            expect(result).toBeUndefined();
            expect(mockRes.status).toHaveBeenCalledWith(202);
            expect(mockRes.setHeader).not.toHaveBeenCalled();
            expect(mockRes.end).not.toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=mcp-core.controller.spec.js.map