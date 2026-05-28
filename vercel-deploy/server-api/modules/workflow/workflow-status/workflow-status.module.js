"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowStatusModule", {
    enumerable: true,
    get: function() {
        return WorkflowStatusModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _logicfunctionentity = require("../../../engine/metadata-modules/logic-function/logic-function.entity");
const _logicfunctionmodule = require("../../../engine/metadata-modules/logic-function/logic-function.module");
const _workspaceeventemittermodule = require("../../../engine/workspace-event-emitter/workspace-event-emitter.module");
const _workflowstatusesupdatejob = require("./jobs/workflow-statuses-update.job");
const _workflowversionstatuslistener = require("./listeners/workflow-version-status.listener");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowStatusModule = class WorkflowStatusModule {
};
WorkflowStatusModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _logicfunctionmodule.LogicFunctionModule,
            _workspaceeventemittermodule.WorkspaceEventEmitterModule,
            _typeorm.TypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity,
                _logicfunctionentity.LogicFunctionEntity
            ])
        ],
        providers: [
            _workflowstatusesupdatejob.WorkflowStatusesUpdateJob,
            _workflowversionstatuslistener.WorkflowVersionStatusListener
        ]
    })
], WorkflowStatusModule);

//# sourceMappingURL=workflow-status.module.js.map