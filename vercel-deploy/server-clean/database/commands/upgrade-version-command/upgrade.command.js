"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeCommand", {
    enumerable: true,
    get: function() {
        return UpgradeCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _logger = require("../logger");
const _upgradesequencereaderservice = require("../../../engine/core-modules/upgrade/services/upgrade-sequence-reader.service");
const _upgradesequencerunnerservice = require("../../../engine/core-modules/upgrade/services/upgrade-sequence-runner.service");
const _formatupgradelogutil = require("../../../engine/core-modules/upgrade/utils/format-upgrade-log.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpgradeCommand = class UpgradeCommand extends _nestcommander.CommandRunner {
    parseDryRun() {
        return true;
    }
    parseVerbose() {
        return true;
    }
    parseWorkspaceId(val, previous) {
        const accumulator = previous ?? new Set();
        accumulator.add(val);
        return accumulator;
    }
    parseStartFromWorkspaceId(val) {
        return val;
    }
    parseWorkspaceCountLimit(val) {
        const limit = parseInt(val);
        if (isNaN(limit)) {
            throw new Error('Workspace count limit must be a number');
        }
        if (limit <= 0) {
            throw new Error('Workspace count limit must be greater than 0');
        }
        return limit;
    }
    async run(_passedParams, options) {
        if (options.verbose) {
            this.logger = new _logger.CommandLogger({
                verbose: true,
                constructorName: this.constructor.name
            });
        }
        if ((0, _utils.isDefined)(options.workspaceId) && (0, _utils.isDefined)(options.startFromWorkspaceId)) {
            throw new Error('Cannot use --start-from-workspace-id together with -w/--workspace-id');
        }
        try {
            const sequence = this.upgradeSequenceReaderService.getUpgradeSequence();
            this.logger.log((0, _formatupgradelogutil.formatUpgradeLog)({
                humanMessage: `Initialized upgrade sequence: ${sequence.length} step(s)`,
                event: 'sequence.initialized',
                logFields: {
                    stepCount: sequence.length,
                    dryRun: options.dryRun ?? false
                }
            }));
            for (const [index, step] of sequence.entries()){
                this.logger.verbose((0, _formatupgradelogutil.formatUpgradeLog)({
                    humanMessage: `  [${index}] ${step.kind} — ${step.name} (${step.version})`,
                    event: 'sequence.step',
                    logFields: {
                        index,
                        kind: step.kind,
                        name: step.name,
                        version: step.version
                    }
                }));
            }
            const { totalSuccesses, totalFailures } = await this.upgradeSequenceRunnerService.run({
                sequence,
                options: {
                    ...options,
                    workspaceIds: (0, _utils.isDefined)(options.workspaceId) ? Array.from(options.workspaceId) : undefined
                }
            });
            this.logger.log((0, _formatupgradelogutil.formatUpgradeLog)({
                humanMessage: `Upgrade summary: ${totalSuccesses} workspace(s) succeeded, ${totalFailures} workspace(s) failed`,
                event: 'summary',
                logFields: {
                    totalSuccesses,
                    totalFailures,
                    dryRun: options.dryRun ?? false
                }
            }));
            if (totalFailures > 0) {
                throw new Error(`Upgrade completed with ${totalFailures} workspace failure(s)`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error((0, _formatupgradelogutil.formatUpgradeLog)({
                humanMessage: `Upgrade failed: ${errorMessage}`,
                event: 'aborted'
            }));
            throw error;
        }
    }
    constructor(upgradeSequenceReaderService, upgradeSequenceRunnerService){
        super(), this.upgradeSequenceReaderService = upgradeSequenceReaderService, this.upgradeSequenceRunnerService = upgradeSequenceRunnerService;
        this.logger = new _logger.CommandLogger({
            verbose: false,
            constructorName: this.constructor.name
        });
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-d, --dry-run',
        description: 'Simulate the command without making actual changes',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], UpgradeCommand.prototype, "parseDryRun", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-v, --verbose',
        description: 'Verbose output',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], UpgradeCommand.prototype, "parseVerbose", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id [workspace_id]',
        description: 'workspace id. Command runs on all active/suspended workspaces if not provided.',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Set === "undefined" ? Object : Set
    ]),
    _ts_metadata("design:returntype", typeof Set === "undefined" ? Object : Set)
], UpgradeCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--start-from-workspace-id [workspace_id]',
        description: 'Start from a specific workspace id. Workspaces are processed in ascending order of id.',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], UpgradeCommand.prototype, "parseStartFromWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--workspace-count-limit [count]',
        description: 'Limit the number of workspaces to process. Workspaces are processed in ascending order of id.',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Number)
], UpgradeCommand.prototype, "parseWorkspaceCountLimit", null);
UpgradeCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'upgrade',
        description: 'Upgrade workspaces to the latest version'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upgradesequencereaderservice.UpgradeSequenceReaderService === "undefined" ? Object : _upgradesequencereaderservice.UpgradeSequenceReaderService,
        typeof _upgradesequencerunnerservice.UpgradeSequenceRunnerService === "undefined" ? Object : _upgradesequencerunnerservice.UpgradeSequenceRunnerService
    ])
], UpgradeCommand);

//# sourceMappingURL=upgrade.command.js.map