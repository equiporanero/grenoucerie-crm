"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RebuildApplicationDefaultDepsCommand", {
    enumerable: true,
    get: function() {
        return RebuildApplicationDefaultDepsCommand;
    }
});
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _workspaceiteratorservice = require("./command-runners/workspace-iterator.service");
const _logger = require("./logger");
const _applicationservice = require("../../engine/core-modules/application/application.service");
const _workspacecacheservice = require("../../engine/workspace-cache/services/workspace-cache.service");
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
let RebuildApplicationDefaultDepsCommand = class RebuildApplicationDefaultDepsCommand extends _nestcommander.CommandRunner {
    parseWorkspaceId(val, previous) {
        const accumulator = previous ?? new Set();
        accumulator.add(val);
        return accumulator;
    }
    async run(_passedParams, options) {
        const workspaceIds = (0, _utils.isDefined)(options.workspaceId) ? Array.from(options.workspaceId) : undefined;
        const report = await this.workspaceIteratorService.iterate({
            workspaceIds,
            callback: async ({ workspaceId })=>{
                const { flatApplicationMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
                    'flatApplicationMaps'
                ]);
                const applications = Object.values(flatApplicationMaps.byId).filter((application)=>(0, _utils.isDefined)(application) && !(0, _utils.isDefined)(application.deletedAt));
                this.logger.log(`Found ${applications.length} application(s) in workspace ${workspaceId}`);
                for (const application of applications){
                    await this.applicationService.uploadDefaultPackageFilesAndSetFileIds({
                        id: application.id,
                        universalIdentifier: application.universalIdentifier,
                        workspaceId
                    });
                    this.logger.log(`Rebuilt default package files for application "${application.name}" (${application.id})`);
                }
            }
        });
        if (report.fail.length > 0) {
            throw new Error(`Command completed with ${report.fail.length} failure(s)`);
        }
        this.logger.log(_chalk.default.blue('Command completed!'));
    }
    constructor(workspaceIteratorService, applicationService, workspaceCacheService){
        super(), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService;
        this.logger = new _logger.CommandLogger({
            verbose: false,
            constructorName: this.constructor.name
        });
    }
};
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
], RebuildApplicationDefaultDepsCommand.prototype, "parseWorkspaceId", null);
RebuildApplicationDefaultDepsCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'application:rebuild-default-deps',
        description: 'Re-upload default package.json and yarn.lock to file storage for all applications in the workspace'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], RebuildApplicationDefaultDepsCommand);

//# sourceMappingURL=rebuild-application-default-deps.command.js.map