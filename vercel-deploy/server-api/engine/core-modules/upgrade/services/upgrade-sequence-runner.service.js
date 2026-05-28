"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeSequenceRunnerService", {
    enumerable: true,
    get: function() {
        return UpgradeSequenceRunnerService;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratorservice = require("../../../../database/commands/command-runners/workspace-iterator.service");
const _instancecommandrunnerservice = require("./instance-command-runner.service");
const _upgrademigrationservice = require("./upgrade-migration.service");
const _upgradesequencereaderservice = require("./upgrade-sequence-reader.service");
const _workspacecommandrunnerservice = require("./workspace-command-runner.service");
const _formatupgradelogutil = require("../utils/format-upgrade-log.util");
const _upgradeawareentitymetadataadapter = require("../../../twenty-orm/upgrade-aware/upgrade-aware-entity-metadata.adapter");
const _workspaceversionservice = require("../../../workspace-manager/workspace-version/services/workspace-version.service");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpgradeSequenceRunnerService = class UpgradeSequenceRunnerService {
    async run({ sequence, options }) {
        if (sequence.length === 0) {
            return {
                totalSuccesses: 0,
                totalFailures: 0
            };
        }
        await this.upgradeAwareEntityMetadataAdapter.refresh();
        try {
            return await this.runInner({
                sequence,
                options
            });
        } finally{
            try {
                await this.upgradeAwareEntityMetadataAdapter.refresh();
            } catch (refreshError) {
                this.logger.error(`Failed to refresh upgrade-aware entity metadata after run`, refreshError instanceof Error ? refreshError.stack : String(refreshError));
            }
        }
    }
    async runInner({ sequence, options }) {
        const allActiveOrSuspendedWorkspaceIds = await this.workspaceVersionService.getActiveOrSuspendedWorkspaceIds();
        const startCursor = await this.resolveStartCursor({
            sequence,
            allActiveOrSuspendedWorkspaceIds
        });
        let totalSuccesses = 0;
        let totalFailures = 0;
        let cursor = startCursor;
        let workspaceCursors = await this.fetchWorkspaceCursors(allActiveOrSuspendedWorkspaceIds);
        while(cursor < sequence.length){
            const step = sequence[cursor];
            if (step.kind === 'fast-instance' || step.kind === 'slow-instance') {
                if ((0, _utils.isDefined)(options.workspaceIds) && options.workspaceIds.length > 0 || (0, _utils.isDefined)(options.startFromWorkspaceId) || (0, _utils.isDefined)(options.workspaceCountLimit)) {
                    this.logger.log((0, _formatupgradelogutil.formatUpgradeLog)({
                        humanMessage: `Stopping before instance step "${step.name}": ` + 'upgrade was run with a workspace filter (-w, --start-from-workspace-id, or --workspace-count-limit). ' + 'Instance commands require all workspaces to be aligned.',
                        event: 'sequence.stopped',
                        logFields: {
                            before: step.name,
                            reason: 'workspace-filter-active'
                        }
                    }));
                    break;
                }
                const previousStep = cursor > 0 ? sequence[cursor - 1] : undefined;
                if (previousStep?.kind === 'workspace') {
                    this.enforceWorkspacesCompletedPreviousWorkspaceSegment({
                        sequence,
                        previousWorkspaceStep: previousStep,
                        workspaceCursors
                    });
                }
                await this.runInstanceStep({
                    instanceStep: step,
                    skipDataMigration: allActiveOrSuspendedWorkspaceIds.length === 0
                });
                await this.upgradeAwareEntityMetadataAdapter.refresh();
                cursor++;
                continue;
            }
            const workspaceCommandsSegment = this.upgradeSequenceReaderService.collectWorkspaceCommandsStartingFrom({
                sequence,
                fromWorkspaceCommand: step
            });
            const report = await this.resumeWorkspaceCommandsFromCursors({
                workspaceCommandsSegment,
                workspaceCursors,
                allActiveOrSuspendedWorkspaceIds,
                options
            });
            totalSuccesses += report.success.length;
            totalFailures += report.fail.length;
            if (report.fail.length > 0) {
                this.logger.error((0, _formatupgradelogutil.formatUpgradeLog)({
                    humanMessage: `Workspace steps ended with ${report.fail.length} failure(s). ` + 'Aborting — cannot proceed to next instance step.',
                    event: 'sequence.aborted',
                    logFields: {
                        failures: report.fail.length,
                        reason: 'workspace-failures'
                    }
                }));
                return {
                    totalSuccesses,
                    totalFailures
                };
            }
            cursor += workspaceCommandsSegment.length;
            workspaceCursors = await this.fetchWorkspaceCursors(allActiveOrSuspendedWorkspaceIds);
        }
        return {
            totalSuccesses,
            totalFailures
        };
    }
    async resolveStartCursor({ sequence, allActiveOrSuspendedWorkspaceIds }) {
        const lastAttempted = await this.upgradeMigrationService.getLastAttemptedCommandNameOrThrow(allActiveOrSuspendedWorkspaceIds);
        const lastAttemptedCursor = this.upgradeSequenceReaderService.locateStepInSequenceOrThrow({
            sequence,
            stepName: lastAttempted.name
        });
        const lastAttemptedStep = sequence[lastAttemptedCursor];
        switch(lastAttemptedStep.kind){
            case 'fast-instance':
            case 'slow-instance':
                {
                    return lastAttempted.status === 'completed' ? lastAttemptedCursor + 1 : lastAttemptedCursor;
                }
            case 'workspace':
                {
                    const workspaceSliceBounds = this.upgradeSequenceReaderService.getWorkspaceSegmentBounds({
                        sequence,
                        workspaceCommand: lastAttemptedStep
                    });
                    await this.validateWorkspaceCursorsAreInWorkspaceSegment({
                        sequence,
                        allActiveOrSuspendedWorkspaceIds,
                        workspaceSliceBounds
                    });
                    return workspaceSliceBounds.startCursor;
                }
            default:
                (0, _utils.assertUnreachable)(lastAttemptedStep);
        }
    }
    async validateWorkspaceCursorsAreInWorkspaceSegment({ allActiveOrSuspendedWorkspaceIds, sequence, workspaceSliceBounds: { startCursor, endCursor } }) {
        const workspaceCursors = await this.upgradeMigrationService.getWorkspaceLastAttemptedCommandNameOrThrow(allActiveOrSuspendedWorkspaceIds);
        const precedingStep = startCursor > 0 ? sequence[startCursor - 1] : undefined;
        const invalidWorkspaces = [];
        for (const [workspaceId, workspaceCursor] of workspaceCursors){
            const cursorPosition = this.upgradeSequenceReaderService.locateStepInSequenceOrThrow({
                sequence,
                stepName: workspaceCursor.name
            });
            const isWithinSegment = cursorPosition >= startCursor && cursorPosition <= endCursor;
            const isAtPrecedingInstanceCommandCompleted = (0, _utils.isDefined)(precedingStep) && precedingStep.kind !== 'workspace' && cursorPosition === startCursor - 1 && workspaceCursor.status === 'completed';
            if (!isWithinSegment && !isAtPrecedingInstanceCommandCompleted) {
                invalidWorkspaces.push({
                    workspaceId,
                    cursorName: workspaceCursor.name,
                    cursorStatus: workspaceCursor.status
                });
            }
        }
        if (invalidWorkspaces.length > 0) {
            const details = invalidWorkspaces.map(({ workspaceId, cursorName, cursorStatus })=>`${workspaceId} at "${cursorName}" (${cursorStatus})`).join(', ');
            throw new Error(`${invalidWorkspaces.length} workspace(s) have invalid cursors for ` + `workspace segment [${startCursor}..${endCursor}]: ${details}`);
        }
    }
    async fetchWorkspaceCursors(allActiveOrSuspendedWorkspaceIds) {
        return this.upgradeMigrationService.getWorkspaceLastAttemptedCommandNameOrThrow(allActiveOrSuspendedWorkspaceIds);
    }
    async runInstanceStep({ instanceStep, skipDataMigration }) {
        switch(instanceStep.kind){
            case 'fast-instance':
                {
                    const result = await this.instanceCommandRunnerService.runFastInstanceCommand({
                        command: instanceStep.command,
                        name: instanceStep.name
                    });
                    if (result.status === 'failed') {
                        throw result.error;
                    }
                    return;
                }
            case 'slow-instance':
                {
                    const result = await this.instanceCommandRunnerService.runSlowInstanceCommand({
                        command: instanceStep.command,
                        name: instanceStep.name,
                        skipDataMigration
                    });
                    if (result.status === 'failed') {
                        throw result.error;
                    }
                    return;
                }
            default:
                (0, _utils.assertUnreachable)(instanceStep);
        }
    }
    async resumeWorkspaceCommandsFromCursors({ workspaceCommandsSegment, workspaceCursors, allActiveOrSuspendedWorkspaceIds, options }) {
        const workspaceIds = this.deriveWorkspaceIdsToProcess({
            allActiveOrSuspendedWorkspaceIds,
            options
        });
        return this.workspaceIteratorService.iterate({
            workspaceIds,
            dryRun: options.dryRun,
            callback: async (context)=>{
                const workspaceCursor = workspaceCursors.get(context.workspaceId);
                if (!workspaceCursor) {
                    throw new Error(`No upgrade migration found for workspace ${context.workspaceId}. This should never occur.`);
                }
                const pendingCommands = this.upgradeSequenceReaderService.getPendingWorkspaceCommands({
                    workspaceCommands: workspaceCommandsSegment,
                    workspaceCursor
                });
                await this.workspaceCommandRunnerService.runWorkspaceCommands({
                    iteratorContext: context,
                    options,
                    workspaceCommands: pendingCommands
                });
            }
        });
    }
    deriveWorkspaceIdsToProcess({ allActiveOrSuspendedWorkspaceIds, options }) {
        if ((0, _utils.isDefined)(options.workspaceIds) && options.workspaceIds.length > 0) {
            return options.workspaceIds;
        }
        let workspaceIds = allActiveOrSuspendedWorkspaceIds;
        if ((0, _utils.isDefined)(options.startFromWorkspaceId)) {
            workspaceIds = workspaceIds.filter((id)=>id >= options.startFromWorkspaceId);
        }
        if ((0, _utils.isDefined)(options.workspaceCountLimit)) {
            workspaceIds = workspaceIds.slice(0, options.workspaceCountLimit);
        }
        return workspaceIds;
    }
    enforceWorkspacesCompletedPreviousWorkspaceSegment({ sequence, previousWorkspaceStep, workspaceCursors }) {
        const barrierCursor = this.upgradeSequenceReaderService.locateStepInSequenceOrThrow({
            sequence,
            stepName: previousWorkspaceStep.name
        });
        for (const [workspaceId, workspaceCursor] of workspaceCursors){
            const cursorPosition = this.upgradeSequenceReaderService.locateStepInSequenceOrThrow({
                sequence,
                stepName: workspaceCursor.name
            });
            const isAtBarrierAndCompleted = cursorPosition === barrierCursor && workspaceCursor.status === 'completed';
            if (!isAtBarrierAndCompleted) {
                throw new Error(`Cannot run instance step: workspace ${workspaceId} ` + `has not completed "${previousWorkspaceStep.name}" ` + `(cursor: "${workspaceCursor.name}", status: "${workspaceCursor.status}")`);
            }
        }
    }
    constructor(upgradeMigrationService, instanceCommandRunnerService, workspaceCommandRunnerService, upgradeSequenceReaderService, upgradeAwareEntityMetadataAdapter, workspaceIteratorService, workspaceVersionService){
        this.upgradeMigrationService = upgradeMigrationService;
        this.instanceCommandRunnerService = instanceCommandRunnerService;
        this.workspaceCommandRunnerService = workspaceCommandRunnerService;
        this.upgradeSequenceReaderService = upgradeSequenceReaderService;
        this.upgradeAwareEntityMetadataAdapter = upgradeAwareEntityMetadataAdapter;
        this.workspaceIteratorService = workspaceIteratorService;
        this.workspaceVersionService = workspaceVersionService;
        this.logger = new _common.Logger(UpgradeSequenceRunnerService.name);
    }
};
UpgradeSequenceRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService,
        typeof _instancecommandrunnerservice.InstanceCommandRunnerService === "undefined" ? Object : _instancecommandrunnerservice.InstanceCommandRunnerService,
        typeof _workspacecommandrunnerservice.WorkspaceCommandRunnerService === "undefined" ? Object : _workspacecommandrunnerservice.WorkspaceCommandRunnerService,
        typeof _upgradesequencereaderservice.UpgradeSequenceReaderService === "undefined" ? Object : _upgradesequencereaderservice.UpgradeSequenceReaderService,
        typeof _upgradeawareentitymetadataadapter.UpgradeAwareEntityMetadataAdapter === "undefined" ? Object : _upgradeawareentitymetadataadapter.UpgradeAwareEntityMetadataAdapter,
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _workspaceversionservice.WorkspaceVersionService === "undefined" ? Object : _workspaceversionservice.WorkspaceVersionService
    ])
], UpgradeSequenceRunnerService);

//# sourceMappingURL=upgrade-sequence-runner.service.js.map