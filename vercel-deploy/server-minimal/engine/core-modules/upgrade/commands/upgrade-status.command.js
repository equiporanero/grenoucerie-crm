"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeStatusCommand", {
    enumerable: true,
    get: function() {
        return UpgradeStatusCommand;
    }
});
const _common = require("@nestjs/common");
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _nestcommander = require("nest-commander");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _upgradestatusservice = require("../services/upgrade-status.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const HEALTH_LABELS = {
    [_types.UpgradeHealthEnum.UP_TO_DATE]: _chalk.default.green('Up to date'),
    [_types.UpgradeHealthEnum.BEHIND]: _chalk.default.yellow('Behind'),
    [_types.UpgradeHealthEnum.FAILED]: _chalk.default.red('Failed')
};
let UpgradeStatusCommand = class UpgradeStatusCommand extends _nestcommander.CommandRunner {
    parseWorkspaceId(value, previous) {
        const accumulator = previous ?? new Set();
        accumulator.add(value);
        return accumulator;
    }
    parseFailedOnly() {
        return true;
    }
    async run(_passedParams, options) {
        try {
            const lines = this.formatHeader();
            const instanceStatus = await this.upgradeStatusService.getInstanceStatus();
            lines.push(...this.formatInstanceStatus(instanceStatus));
            const requestedWorkspaceIds = options.workspaceId ? [
                ...options.workspaceId
            ] : undefined;
            const workspaceStatuses = await this.upgradeStatusService.getWorkspaceStatuses(requestedWorkspaceIds);
            const groupedWorkspaceUpgradeStatuses = this.groupWorkspaceUpgradeStatusesByHealth(workspaceStatuses);
            lines.push(...this.formatWorkspaceUpgradeStatuses(groupedWorkspaceUpgradeStatuses, options.failedOnly));
            lines.push(...this.formatSummary(instanceStatus, groupedWorkspaceUpgradeStatuses));
            // oxlint-disable-next-line no-console
            console.log(lines.join('\n'));
        } catch (error) {
            this.logger.error(_chalk.default.red(`Failed to retrieve upgrade status: ${error.message}`));
        }
    }
    formatHeader() {
        const appVersion = this.twentyConfigService.get('APP_VERSION') ?? 'unknown';
        return [
            '',
            _chalk.default.bold(`APP_VERSION: ${appVersion}`),
            ''
        ];
    }
    formatInstanceStatus(status) {
        return [
            _chalk.default.bold.underline('Instance'),
            ...this.formatCursorStatus(status),
            ''
        ];
    }
    formatWorkspaceUpgradeStatuses({ upToDate, behind, failed }, failedOnly) {
        const lines = [
            _chalk.default.bold.underline('Workspace')
        ];
        if (upToDate.length === 0 && behind.length === 0 && failed.length === 0) {
            lines.push(_chalk.default.dim('  No active/suspended workspaces found'));
            return lines;
        }
        if (!failedOnly) {
            for (const workspaceStatus of upToDate){
                lines.push(...this.formatWorkspaceUpgradeStatus(workspaceStatus));
            }
        }
        for (const workspaceStatus of behind){
            lines.push(...this.formatWorkspaceUpgradeStatus(workspaceStatus));
        }
        if (failed.length > 0) {
            const groupedByCommand = new Map();
            for (const workspaceStatus of failed){
                const commandName = workspaceStatus.latestCommand?.name ?? null;
                if (!groupedByCommand.has(commandName)) {
                    groupedByCommand.set(commandName, []);
                }
                groupedByCommand.get(commandName).push(workspaceStatus);
            }
            for (const [commandName, statuses] of groupedByCommand){
                const formattedCommandName = commandName ? (0, _utils.formatUpgradeCommandName)(commandName) : 'unknown';
                lines.push(_chalk.default.red.bold(`  Failed at: ${formattedCommandName}`));
                for (const workspaceStatus of statuses){
                    lines.push(...this.formatWorkspaceUpgradeStatus(workspaceStatus, true));
                }
            }
        }
        return lines;
    }
    formatWorkspaceUpgradeStatus(status, nested = false) {
        const baseIndent = nested ? '    ' : '  ';
        const detailIndent = nested ? '      ' : '    ';
        const label = status.displayName ? `${status.displayName} (${status.workspaceId})` : status.workspaceId;
        return [
            _chalk.default.bold(`${baseIndent}${label}`),
            ...this.formatCursorStatus(status, detailIndent),
            ''
        ];
    }
    formatCursorStatus(status, indent = '  ') {
        if (!status.latestCommand) {
            return [
                `${indent}Status:           ${HEALTH_LABELS[status.health]}`
            ];
        }
        const { latestCommand } = status;
        const lines = [
            `${indent}Inferred version: ${status.inferredVersion ?? _chalk.default.dim('unknown')}`,
            `${indent}Latest command:   ${(0, _utils.formatUpgradeCommandName)(latestCommand.name)}`,
            `${indent}Status:           ${HEALTH_LABELS[status.health]}`,
            `${indent}Executed by:      ${latestCommand.executedByVersion}`,
            `${indent}At:               ${latestCommand.createdAt.toISOString()}`
        ];
        if (latestCommand.status === 'failed' && latestCommand.errorMessage) {
            lines.push(_chalk.default.red(`${indent}Error:            ${latestCommand.errorMessage}`));
        }
        return lines;
    }
    formatSummary(instanceStatus, { upToDate, behind, failed }) {
        const lines = [
            _chalk.default.bold.underline('Summary')
        ];
        const totalCount = upToDate.length + behind.length + failed.length;
        lines.push(`  Instance: ${HEALTH_LABELS[instanceStatus.health]}`);
        if (totalCount === 0) {
            lines.push(_chalk.default.dim('  No workspaces'));
            return lines;
        }
        const parts = [
            _chalk.default.green(`${upToDate.length} up to date`),
            _chalk.default.yellow(`${behind.length} behind`),
            _chalk.default.red(`${failed.length} failed`)
        ];
        lines.push(`  Workspaces: ${parts.join(', ')} (${totalCount} total)`);
        if (behind.length > 0) {
            const behindCounts = new Map();
            for (const status of behind){
                const commandName = status.latestCommand?.name ?? null;
                behindCounts.set(commandName, (behindCounts.get(commandName) ?? 0) + 1);
            }
            for (const [commandName, count] of behindCounts){
                const formattedCommandName = commandName ? (0, _utils.formatUpgradeCommandName)(commandName) : 'no commands';
                lines.push(_chalk.default.yellow(`    ${count} behind at: ${formattedCommandName}`));
            }
        }
        if (failed.length > 0) {
            const failureCounts = new Map();
            for (const status of failed){
                const commandName = status.latestCommand?.name ?? null;
                failureCounts.set(commandName, (failureCounts.get(commandName) ?? 0) + 1);
            }
            for (const [commandName, count] of failureCounts){
                const formattedCommandName = commandName ? (0, _utils.formatUpgradeCommandName)(commandName) : 'unknown';
                lines.push(_chalk.default.red(`    ${count} failed at: ${formattedCommandName}`));
            }
        }
        lines.push('');
        return lines;
    }
    groupWorkspaceUpgradeStatusesByHealth(workspaceStatuses) {
        const upToDate = [];
        const behind = [];
        const failed = [];
        for (const status of workspaceStatuses){
            switch(status.health){
                case _types.UpgradeHealthEnum.UP_TO_DATE:
                    upToDate.push(status);
                    break;
                case _types.UpgradeHealthEnum.BEHIND:
                    behind.push(status);
                    break;
                case _types.UpgradeHealthEnum.FAILED:
                    failed.push(status);
                    break;
            }
        }
        return {
            upToDate,
            behind,
            failed
        };
    }
    constructor(upgradeStatusService, twentyConfigService){
        super(), this.upgradeStatusService = upgradeStatusService, this.twentyConfigService = twentyConfigService, this.logger = new _common.Logger(UpgradeStatusCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id [workspace_id]',
        description: 'Filter to specific workspace IDs. Can be passed multiple times.',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Set === "undefined" ? Object : Set
    ]),
    _ts_metadata("design:returntype", typeof Set === "undefined" ? Object : Set)
], UpgradeStatusCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-f, --failed-only',
        description: 'Hide up-to-date entries, only display failed and behind commands'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], UpgradeStatusCommand.prototype, "parseFailedOnly", null);
UpgradeStatusCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'upgrade:status',
        description: 'Display upgrade status for instance and workspace commands, inferring versions from migration history'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upgradestatusservice.UpgradeStatusService === "undefined" ? Object : _upgradestatusservice.UpgradeStatusService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], UpgradeStatusCommand);

//# sourceMappingURL=upgrade-status.command.js.map