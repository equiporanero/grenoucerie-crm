"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyWorkspaceSentryContextFromJobData", {
    enumerable: true,
    get: function() {
        return applyWorkspaceSentryContextFromJobData;
    }
});
const _applyworkspacesentryfieldsutil = require("./apply-workspace-sentry-fields.util");
const applyWorkspaceSentryContextFromJobData = (jobData)=>{
    if (typeof jobData !== 'object' || jobData === null) {
        return;
    }
    const workspaceId = jobData.workspaceId;
    const userWorkspaceId = jobData.userWorkspaceId;
    if (typeof workspaceId !== 'string' || workspaceId.length === 0) {
        return;
    }
    (0, _applyworkspacesentryfieldsutil.applyWorkspaceSentryFields)({
        workspaceId,
        userWorkspaceId: typeof userWorkspaceId === 'string' && userWorkspaceId.length > 0 ? userWorkspaceId : undefined
    });
};

//# sourceMappingURL=apply-workspace-sentry-context-from-job-data.util.js.map