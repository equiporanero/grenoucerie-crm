"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "McpToolExecutorService", {
    enumerable: true,
    get: function() {
        return McpToolExecutorService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _metricskeystype = require("../../../core-modules/metrics/types/metrics-keys.type");
const _metricsservice = require("../../../core-modules/metrics/metrics.service");
const _jsonrpcerrorcodeconst = require("../constants/json-rpc-error-code.const");
const _mcpprogressnotificationconst = require("../constants/mcp-progress-notification.const");
const _wrapjsonrpcresponseutil = require("../utils/wrap-jsonrpc-response.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const unwrapJsonSchema = (schema)=>schema && typeof schema === 'object' && 'jsonSchema' in schema ? schema.jsonSchema : schema;
let McpToolExecutorService = class McpToolExecutorService {
    async handleToolCall(id, toolSet, params, sseWriter) {
        const toolName = params.name;
        const tool = toolSet[toolName];
        if (!(0, _utils.isDefined)(tool) || !(0, _utils.isDefined)(tool.execute)) {
            return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                error: {
                    code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.INVALID_PARAMS,
                    message: `Unknown tool: ${String(params.name)}`
                }
            });
        }
        if ((0, _utils.isDefined)(sseWriter)) {
            sseWriter({
                jsonrpc: '2.0',
                method: _mcpprogressnotificationconst.MCP_PROGRESS_NOTIFICATION_METHOD,
                params: {
                    progressToken: `${_mcpprogressnotificationconst.TOOL_CALL_PROGRESS_TOKEN_PREFIX}${String(id)}`,
                    progress: 0,
                    total: 1
                }
            });
        }
        try {
            const result = await tool.execute(params.arguments, {
                toolCallId: '1',
                messages: []
            });
            void this.metricsService.incrementCounterBy({
                key: _metricskeystype.MetricsKeys.McpToolExecutionSucceeded,
                amount: 1
            });
            return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                result: {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(result)
                        }
                    ],
                    isError: false
                }
            });
        } catch (executionError) {
            void this.metricsService.incrementCounterBy({
                key: _metricskeystype.MetricsKeys.McpToolExecutionFailed,
                amount: 1
            });
            return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
                result: {
                    content: [
                        {
                            type: 'text',
                            text: executionError instanceof Error ? executionError.message : 'Tool execution failed'
                        }
                    ],
                    isError: true
                }
            });
        }
    }
    handleToolsListing(id, toolSet) {
        const toolsArray = Object.entries(toolSet).filter(([, def])=>!!def.inputSchema).map(([name, def])=>{
            const toolDefinition = def;
            // Unwrap the AI SDK's jsonSchema wrapper if present
            // The AI SDK serializes schemas as { jsonSchema: {...} } but MCP expects {...} directly
            const inputSchema = unwrapJsonSchema(toolDefinition.inputSchema);
            return {
                name,
                description: toolDefinition.description,
                inputSchema,
                ...(0, _utils.isDefined)(toolDefinition.annotations) && {
                    annotations: toolDefinition.annotations
                }
            };
        });
        return (0, _wrapjsonrpcresponseutil.wrapJsonRpcResponse)(id, {
            result: {
                tools: toolsArray
            }
        });
    }
    constructor(metricsService){
        this.metricsService = metricsService;
    }
};
McpToolExecutorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], McpToolExecutorService);

//# sourceMappingURL=mcp-tool-executor.service.js.map