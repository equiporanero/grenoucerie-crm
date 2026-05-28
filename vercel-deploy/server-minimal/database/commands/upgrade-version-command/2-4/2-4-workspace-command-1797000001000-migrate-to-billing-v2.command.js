/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateToBillingV2Command", {
    enumerable: true,
    get: function() {
        return MigrateToBillingV2Command;
    }
});
const _nestcommander = require("nest-commander");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MigrateToBillingV2Command = class MigrateToBillingV2Command extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId }) {
        this.logger.debug(`Workspace ${workspaceId}: already on resource-credit billing, nothing to do`);
    }
    constructor(workspaceIteratorService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService;
    }
};
MigrateToBillingV2Command = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.4.0', 1797000001000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-4:migrate-to-billing-v2',
        description: 'No-op: all workspaces are now on the resource-credit billing model'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService
    ])
], MigrateToBillingV2Command);

//# sourceMappingURL=2-4-workspace-command-1797000001000-migrate-to-billing-v2.command.js.map