"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionCreateOnePreQueryHook", {
    enumerable: true,
    get: function() {
        return WorkflowVersionCreateOnePreQueryHook;
    }
});
const _workspacequeryhookdecorator = require("../../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _workflowqueryvalidationexception = require("../exceptions/workflow-query-validation.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowVersionCreateOnePreQueryHook = class WorkflowVersionCreateOnePreQueryHook {
    async execute(_authContext, _objectName, _payload) {
        throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Method not allowed.', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN);
    }
};
WorkflowVersionCreateOnePreQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)(`workflowVersion.createOne`)
], WorkflowVersionCreateOnePreQueryHook);

//# sourceMappingURL=workflow-version-create-one.pre-query.hook.js.map