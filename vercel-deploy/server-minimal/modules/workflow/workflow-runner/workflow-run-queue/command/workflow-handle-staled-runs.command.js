"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowHandleStaledRunsCommand", {
    enumerable: true,
    get: function() {
        return WorkflowHandleStaledRunsCommand;
    }
});
const _common = require("@nestjs/common");
const _nestcommander = require("nest-commander");
const _workflowhandlestaledrunsworkspaceservice = require("../workspace-services/workflow-handle-staled-runs.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowHandleStaledRunsCommand = class WorkflowHandleStaledRunsCommand extends _nestcommander.CommandRunner {
    parseWorkspaceIds(val) {
        return val.split(',');
    }
    async run(_passedParam, options) {
        const { workspaceIds } = options;
        this.logger.log('Starting WorkflowHandleStaledRunsCommand command');
        for(let i = 0; i < workspaceIds.length; i++){
            const workspaceId = workspaceIds[i];
            this.logger.log(`Processing workspace ${workspaceId} (${i + 1}/${workspaceIds.length})`);
            try {
                await this.workflowHandleStaledRunsWorkspaceService.handleStaledRunsForWorkspace(workspaceId);
            } catch (error) {
                this.logger.error(`Failed to handle staled runs for workspace ${workspaceId}`, error instanceof Error ? error.stack : String(error));
            }
        }
        this.logger.log('Completed WorkflowHandleStaledRunsCommand command');
    }
    constructor(workflowHandleStaledRunsWorkspaceService){
        super(), this.workflowHandleStaledRunsWorkspaceService = workflowHandleStaledRunsWorkspaceService, this.logger = new _common.Logger(WorkflowHandleStaledRunsCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-ids [workspace_ids]',
        description: 'comma separated workspace ids - mandatory',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Array)
], WorkflowHandleStaledRunsCommand.prototype, "parseWorkspaceIds", null);
WorkflowHandleStaledRunsCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workflow:handle-staled-runs',
        description: 'Handles staled workflow runs'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowhandlestaledrunsworkspaceservice.WorkflowHandleStaledRunsWorkspaceService === "undefined" ? Object : _workflowhandlestaledrunsworkspaceservice.WorkflowHandleStaledRunsWorkspaceService
    ])
], WorkflowHandleStaledRunsCommand);

//# sourceMappingURL=workflow-handle-staled-runs.command.js.map