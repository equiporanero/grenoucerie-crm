"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RecordCRUDActionModule", {
    enumerable: true,
    get: function() {
        return RecordCRUDActionModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../../../../engine/core-modules/application/application.module");
const _recordcrudmodule = require("../../../../../engine/core-modules/record-crud/record-crud.module");
const _userworkspacemodule = require("../../../../../engine/core-modules/user-workspace/user-workspace.module");
const _rolemodule = require("../../../../../engine/metadata-modules/role/role.module");
const _userrolemodule = require("../../../../../engine/metadata-modules/user-role/user-role.module");
const _workflowcommonmodule = require("../../../common/workflow-common.module");
const _workflowexecutioncontextservice = require("../../services/workflow-execution-context.service");
const _createrecordworkflowaction = require("./create-record.workflow-action");
const _deleterecordworkflowaction = require("./delete-record.workflow-action");
const _findrecordsworkflowaction = require("./find-records.workflow-action");
const _updaterecordworkflowaction = require("./update-record.workflow-action");
const _upsertrecordworkflowaction = require("./upsert-record.workflow-action");
const _workflowrunmodule = require("../../../workflow-runner/workflow-run/workflow-run.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RecordCRUDActionModule = class RecordCRUDActionModule {
};
RecordCRUDActionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _recordcrudmodule.RecordCrudModule,
            _workflowrunmodule.WorkflowRunModule,
            _userworkspacemodule.UserWorkspaceModule,
            _userrolemodule.UserRoleModule,
            _rolemodule.RoleModule,
            _workflowcommonmodule.WorkflowCommonModule
        ],
        providers: [
            _workflowexecutioncontextservice.WorkflowExecutionContextService,
            _createrecordworkflowaction.CreateRecordWorkflowAction,
            _upsertrecordworkflowaction.UpsertRecordWorkflowAction,
            _updaterecordworkflowaction.UpdateRecordWorkflowAction,
            _deleterecordworkflowaction.DeleteRecordWorkflowAction,
            _findrecordsworkflowaction.FindRecordsWorkflowAction
        ],
        exports: [
            _createrecordworkflowaction.CreateRecordWorkflowAction,
            _upsertrecordworkflowaction.UpsertRecordWorkflowAction,
            _updaterecordworkflowaction.UpdateRecordWorkflowAction,
            _deleterecordworkflowaction.DeleteRecordWorkflowAction,
            _findrecordsworkflowaction.FindRecordsWorkflowAction
        ]
    })
], RecordCRUDActionModule);

//# sourceMappingURL=record-crud-action.module.js.map