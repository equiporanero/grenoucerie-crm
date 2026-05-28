"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCommandRunner", {
    enumerable: true,
    get: function() {
        return WorkspaceCommandRunner;
    }
});
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _nestcommander = require("nest-commander");
const _logger = require("../logger");
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
let WorkspaceCommandRunner = class WorkspaceCommandRunner extends _nestcommander.CommandRunner {
    parseDryRun() {
        return true;
    }
    parseVerbose() {
        return true;
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
    parseWorkspaceId(val, previous) {
        const accumulator = previous ?? new Set();
        accumulator.add(val);
        return accumulator;
    }
    async run(_passedParams, options) {
        if (options.verbose) {
            this.logger = new _logger.CommandLogger({
                verbose: true,
                constructorName: this.constructor.name
            });
        }
        try {
            await this.workspaceIteratorService.iterate({
                workspaceIds: options.workspaceId && options.workspaceId.size > 0 ? Array.from(options.workspaceId) : undefined,
                activationStatuses: this.activationStatuses,
                startFromWorkspaceId: options.startFromWorkspaceId,
                workspaceCountLimit: options.workspaceCountLimit,
                dryRun: options.dryRun,
                callback: async (context)=>{
                    await this.runOnWorkspace({
                        options,
                        workspaceId: context.workspaceId,
                        dataSource: context.dataSource,
                        index: context.index,
                        total: context.total
                    });
                }
            });
            this.logger.log(_chalk.default.blue('Command completed!'));
        } catch (error) {
            this.logger.error(_chalk.default.red(`Command failed`));
            throw error;
        }
    }
    constructor(workspaceIteratorService, activationStatuses){
        super(), this.workspaceIteratorService = workspaceIteratorService, this.activationStatuses = activationStatuses;
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
], WorkspaceCommandRunner.prototype, "parseDryRun", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-v, --verbose',
        description: 'Verbose output',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], WorkspaceCommandRunner.prototype, "parseVerbose", null);
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
], WorkspaceCommandRunner.prototype, "parseStartFromWorkspaceId", null);
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
], WorkspaceCommandRunner.prototype, "parseWorkspaceCountLimit", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id [workspace_id]',
        description: 'workspace id. Command runs on all workspaces matching the activation statuses if not provided.',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Set === "undefined" ? Object : Set
    ]),
    _ts_metadata("design:returntype", typeof Set === "undefined" ? Object : Set)
], WorkspaceCommandRunner.prototype, "parseWorkspaceId", null);

//# sourceMappingURL=workspace.command-runner.js.map