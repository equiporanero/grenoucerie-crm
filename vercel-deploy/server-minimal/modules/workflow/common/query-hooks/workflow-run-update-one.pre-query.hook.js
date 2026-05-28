"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunUpdateOnePreQueryHook", {
    enumerable: true,
    get: function() {
        return WorkflowRunUpdateOnePreQueryHook;
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
let WorkflowRunUpdateOnePreQueryHook = class WorkflowRunUpdateOnePreQueryHook {
    async execute(_authContext, _objectName, payload) {
        const allowedFields = [
            'name'
        ];
        const payloadKeys = Object.keys(payload.data);
        if (payloadKeys.every((key)=>allowedFields.includes(key))) {
            return payload;
        }
        throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Method not allowed.', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN);
    }
};
WorkflowRunUpdateOnePreQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)(`workflowRun.updateOne`)
], WorkflowRunUpdateOnePreQueryHook);

//# sourceMappingURL=workflow-run-update-one.pre-query.hook.js.map