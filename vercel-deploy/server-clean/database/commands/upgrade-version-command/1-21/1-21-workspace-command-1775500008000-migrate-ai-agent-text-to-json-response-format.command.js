"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateAiAgentTextToJsonResponseFormatCommand", {
    enumerable: true,
    get: function() {
        return MigrateAiAgentTextToJsonResponseFormatCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const TEXT_AGENT_DEFAULT_JSON_RESPONSE_FORMAT = {
    type: 'json',
    schema: {
        type: 'object',
        properties: {
            response: {
                type: 'string',
                description: 'Response of the agent'
            }
        },
        required: [
            'response'
        ],
        additionalProperties: false
    }
};
const TEXT_AGENT_DEFAULT_OUTPUT_SCHEMA = {
    response: {
        isLeaf: true,
        type: 'string',
        label: 'Response',
        value: null
    }
};
let MigrateAiAgentTextToJsonResponseFormatCommand = class MigrateAiAgentTextToJsonResponseFormatCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const textAgents = await this.findTextFormatCustomAgents(workspaceId);
        if (textAgents.length === 0) {
            this.logger.log(`No text-format agents found for workspace ${workspaceId}, skipping`);
            return;
        }
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Found ${textAgents.length} text-format agent(s) for workspace ${workspaceId}`);
        if (isDryRun) {
            return;
        }
        await this.migrateAgentsToJson(workspaceId, textAgents);
        const textAgentIds = textAgents.map((agent)=>agent.id);
        await this.updateWorkflowStepOutputSchemas(workspaceId, textAgentIds);
        this.logger.log(`Successfully migrated ${textAgents.length} agent(s) to JSON response format for workspace ${workspaceId}`);
    }
    async findTextFormatCustomAgents(workspaceId) {
        const { flatAgentMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatAgentMaps'
        ]);
        return Object.values(flatAgentMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((flatAgent)=>this.isTextFormatCustomAgent(flatAgent));
    }
    isTextFormatCustomAgent(flatAgent) {
        if (!flatAgent.isCustom) {
            return false;
        }
        const responseFormat = flatAgent.responseFormat;
        return !(0, _utils.isDefined)(responseFormat?.type) || responseFormat.type === 'text';
    }
    async migrateAgentsToJson(workspaceId, textAgents) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                agent: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: textAgents.map((textAgent)=>({
                            ...textAgent,
                            responseFormat: TEXT_AGENT_DEFAULT_JSON_RESPONSE_FORMAT
                        }))
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to migrate agents to JSON response format:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to migrate text-format agents for workspace ${workspaceId}`);
        }
    }
    async updateWorkflowStepOutputSchemas(workspaceId, agentIds) {
        const workflowVersionRepository = await this.twentyORMGlobalManager.getRepository(workspaceId, 'workflowVersion', {
            shouldBypassPermissionChecks: true
        });
        const allVersions = await workflowVersionRepository.find();
        let updatedVersionCount = 0;
        for (const version of allVersions){
            if (!version.steps || !Array.isArray(version.steps)) {
                continue;
            }
            let versionModified = false;
            const updatedSteps = version.steps.map((step)=>{
                if (step.type !== 'AI_AGENT') {
                    return step;
                }
                const agentId = step.settings?.input?.agentId;
                if (!agentId || !agentIds.includes(agentId)) {
                    return step;
                }
                const currentOutputSchema = step.settings?.outputSchema;
                if (currentOutputSchema && Object.keys(currentOutputSchema).length > 0) {
                    return step;
                }
                versionModified = true;
                return {
                    ...step,
                    settings: {
                        ...step.settings,
                        outputSchema: TEXT_AGENT_DEFAULT_OUTPUT_SCHEMA
                    }
                };
            });
            if (versionModified) {
                await workflowVersionRepository.update(version.id, {
                    steps: updatedSteps
                });
                updatedVersionCount++;
            }
        }
        if (updatedVersionCount > 0) {
            this.logger.log(`Updated output schemas in ${updatedVersionCount} workflow version(s) for workspace ${workspaceId}`);
        }
    }
    constructor(workspaceIteratorService, twentyORMGlobalManager, workspaceCacheService, applicationService, workspaceMigrationValidateBuildAndRunService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.twentyORMGlobalManager = twentyORMGlobalManager, this.workspaceCacheService = workspaceCacheService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
MigrateAiAgentTextToJsonResponseFormatCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500008000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:migrate-ai-agent-text-to-json-response-format',
        description: 'Migrate AI agents with text response format to JSON with a default response field'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], MigrateAiAgentTextToJsonResponseFormatCommand);

//# sourceMappingURL=1-21-workspace-command-1775500008000-migrate-ai-agent-text-to-json-response-format.command.js.map