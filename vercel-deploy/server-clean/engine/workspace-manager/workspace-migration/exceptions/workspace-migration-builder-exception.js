"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationBuilderException", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationBuilderException;
    }
});
let WorkspaceMigrationBuilderException = class WorkspaceMigrationBuilderException extends Error {
    constructor(failedWorkspaceMigrationBuildResult, message = 'Workspace migration builder failed'){
        super(message), this.failedWorkspaceMigrationBuildResult = failedWorkspaceMigrationBuildResult;
        this.name = 'WorkspaceMigrationBuilderException';
    }
};

//# sourceMappingURL=workspace-migration-builder-exception.js.map