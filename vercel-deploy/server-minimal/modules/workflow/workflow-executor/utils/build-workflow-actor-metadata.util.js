"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWorkflowActorMetadata", {
    enumerable: true,
    get: function() {
        return buildWorkflowActorMetadata;
    }
});
const _types = require("twenty-shared/types");
const buildWorkflowActorMetadata = (executionContext)=>{
    if (executionContext.isActingOnBehalfOfUser) {
        return executionContext.initiator;
    }
    return {
        source: _types.FieldActorSource.WORKFLOW,
        name: 'Workflow',
        workspaceMemberId: null,
        context: {}
    };
};

//# sourceMappingURL=build-workflow-actor-metadata.util.js.map