"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionToolProvider", {
    enumerable: true,
    get: function() {
        return LogicFunctionToolProvider;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _logicfunction = require("twenty-shared/logic-function");
const _ai = require("twenty-shared/ai");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionToolProvider = class LogicFunctionToolProvider {
    async isAvailable(_context) {
        return true;
    }
    // Logic function tools emit `executionRef.kind === 'logic_function'`
    // descriptors and are dispatched inline by ToolExecutorService. The
    // static-tool path is unreachable for this provider; this method exists
    // only to satisfy the interface.
    async executeStaticTool(toolName, _args, _context) {
        throw new Error(`LogicFunctionToolProvider does not emit static-kind descriptors (tool: ${toolName})`);
    }
    async generateDescriptors(context, options) {
        const includeSchemas = options?.includeSchemas ?? true;
        const { flatLogicFunctionMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: context.workspaceId,
            flatMapsKeys: [
                'flatLogicFunctionMaps'
            ]
        });
        const logicFunctionsWithSchema = Object.values(flatLogicFunctionMaps.byUniversalIdentifier).filter((fn)=>(0, _utils.isDefined)(fn) && (0, _utils.isDefined)(fn.toolTriggerSettings) && fn.deletedAt === null);
        const descriptors = [];
        for (const logicFunction of logicFunctionsWithSchema){
            const toolName = this.buildLogicFunctionToolName(logicFunction.name);
            const base = {
                name: toolName,
                description: logicFunction.description || `Execute the ${logicFunction.name} logic function`,
                category: _ai.ToolCategory.LOGIC_FUNCTION,
                executionRef: {
                    kind: 'logic_function',
                    logicFunctionId: logicFunction.id
                }
            };
            if (includeSchemas) {
                descriptors.push({
                    ...base,
                    inputSchema: logicFunction.toolTriggerSettings?.inputSchema ?? _logicfunction.DEFAULT_TOOL_INPUT_SCHEMA
                });
            } else {
                descriptors.push(base);
            }
        }
        return descriptors;
    }
    buildLogicFunctionToolName(functionName) {
        return `app_${functionName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')}`;
    }
    constructor(flatEntityMapsCacheService){
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.category = _ai.ToolCategory.LOGIC_FUNCTION;
    }
};
LogicFunctionToolProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], LogicFunctionToolProvider);

//# sourceMappingURL=logic-function-tool.provider.js.map