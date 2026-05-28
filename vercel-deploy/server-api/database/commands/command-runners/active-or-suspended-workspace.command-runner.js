"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActiveOrSuspendedWorkspaceCommandRunner", {
    enumerable: true,
    get: function() {
        return ActiveOrSuspendedWorkspaceCommandRunner;
    }
});
const _workspace = require("twenty-shared/workspace");
const _workspacecommandrunner = require("./workspace.command-runner");
let ActiveOrSuspendedWorkspaceCommandRunner = class ActiveOrSuspendedWorkspaceCommandRunner extends _workspacecommandrunner.WorkspaceCommandRunner {
    constructor(workspaceIteratorService){
        super(workspaceIteratorService, [
            _workspace.WorkspaceActivationStatus.ACTIVE,
            _workspace.WorkspaceActivationStatus.SUSPENDED
        ]), this.workspaceIteratorService = workspaceIteratorService;
    }
};

//# sourceMappingURL=active-or-suspended-workspace.command-runner.js.map