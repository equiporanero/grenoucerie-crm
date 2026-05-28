"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InstallPreInstalledAppsCommand", {
    enumerable: true,
    get: function() {
        return InstallPreInstalledAppsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _activeorsuspendedworkspacecommandrunner = require("./command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("./command-runners/workspace-iterator.service");
const _preinstalledappsservice = require("../../engine/core-modules/application/pre-installed-apps/pre-installed-apps.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let InstallPreInstalledAppsCommand = class InstallPreInstalledAppsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options, index, total }) {
        const dryRun = options.dryRun ?? false;
        this.logger.log(`${dryRun ? '[DRY RUN] ' : ''}Installing pre-installed apps on workspace ${workspaceId} (${index + 1}/${total})`);
        if (dryRun) {
            return;
        }
        await this.preInstalledAppsService.installOnWorkspace(workspaceId);
    }
    constructor(workspaceIteratorService, preInstalledAppsService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.preInstalledAppsService = preInstalledAppsService;
    }
};
InstallPreInstalledAppsCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'install-pre-installed-apps',
        description: 'Install every application registration flagged `isPreInstalled` on every active and suspended workspace. Idempotent.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _preinstalledappsservice.PreInstalledAppsService === "undefined" ? Object : _preinstalledappsservice.PreInstalledAppsService
    ])
], InstallPreInstalledAppsCommand);

//# sourceMappingURL=install-pre-installed-apps.command.js.map