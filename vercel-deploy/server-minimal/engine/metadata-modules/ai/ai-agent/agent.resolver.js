"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentResolver", {
    enumerable: true,
    get: function() {
        return AgentResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _guards = require("@sniptt/guards");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _fromagententitytoagentdtoutil = require("../../flat-agent/utils/from-agent-entity-to-agent-dto.util");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _aimodelregistryservice = require("../ai-models/services/ai-model-registry.service");
const _agentservice = require("./agent.service");
const _agentidinput = require("./dtos/agent-id.input");
const _agentdto = require("./dtos/agent.dto");
const _createagentinput = require("./dtos/create-agent.input");
const _updateagentinput = require("./dtos/update-agent.input");
const _aigraphqlapiexceptioninterceptor = require("../interceptors/ai-graphql-api-exception.interceptor");
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
let AgentResolver = class AgentResolver {
    async findManyAgents({ id: workspaceId }) {
        const flatAgentsWithRoleId = await this.agentService.findManyAgents(workspaceId);
        return flatAgentsWithRoleId.map(_fromagententitytoagentdtoutil.fromFlatAgentWithRoleIdToAgentDto);
    }
    async findOneAgent({ id }, { id: workspaceId }) {
        const fatAgentWithRoleId = await this.agentService.findOneAgentById({
            workspaceId,
            id
        });
        return (0, _fromagententitytoagentdtoutil.fromFlatAgentWithRoleIdToAgentDto)(fatAgentWithRoleId);
    }
    async createOneAgent(input, workspace) {
        if ((0, _guards.isNonEmptyString)(input.modelId)) {
            this.aiModelRegistryService.validateModelAvailability(input.modelId, workspace);
        }
        const createdAgent = await this.agentService.createOneAgent({
            ...input,
            isCustom: true
        }, workspace.id);
        return (0, _fromagententitytoagentdtoutil.fromFlatAgentWithRoleIdToAgentDto)(createdAgent);
    }
    async updateOneAgent(input, workspace) {
        if ((0, _guards.isNonEmptyString)(input.modelId)) {
            this.aiModelRegistryService.validateModelAvailability(input.modelId, workspace);
        }
        const updatedAgent = await this.agentService.updateOneAgent({
            input,
            workspaceId: workspace.id
        });
        return (0, _fromagententitytoagentdtoutil.fromFlatAgentWithRoleIdToAgentDto)(updatedAgent);
    }
    async deleteOneAgent({ id }, { id: workspaceId }) {
        const deletedFlatAgent = await this.agentService.deleteOneAgent(id, workspaceId);
        return (0, _fromagententitytoagentdtoutil.fromFlatAgentWithRoleIdToAgentDto)(deletedFlatAgent);
    }
    constructor(agentService, aiModelRegistryService){
        this.agentService = agentService;
        this.aiModelRegistryService = aiModelRegistryService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _agentdto.AgentDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentResolver.prototype, "findManyAgents", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_agentdto.AgentDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentidinput.AgentIdInput === "undefined" ? Object : _agentidinput.AgentIdInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentResolver.prototype, "findOneAgent", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_agentdto.AgentDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI_SETTINGS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createagentinput.CreateAgentInput === "undefined" ? Object : _createagentinput.CreateAgentInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentResolver.prototype, "createOneAgent", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_agentdto.AgentDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI_SETTINGS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateagentinput.UpdateAgentInput === "undefined" ? Object : _updateagentinput.UpdateAgentInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentResolver.prototype, "updateOneAgent", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_agentdto.AgentDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI_SETTINGS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentidinput.AgentIdInput === "undefined" ? Object : _agentidinput.AgentIdInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentResolver.prototype, "deleteOneAgent", null);
AgentResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI)),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor, _aigraphqlapiexceptioninterceptor.AiGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentservice.AgentService === "undefined" ? Object : _agentservice.AgentService,
        typeof _aimodelregistryservice.AiModelRegistryService === "undefined" ? Object : _aimodelregistryservice.AiModelRegistryService
    ])
], AgentResolver);

//# sourceMappingURL=agent.resolver.js.map