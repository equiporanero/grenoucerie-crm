"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionModule", {
    enumerable: true,
    get: function() {
        return WorkflowVersionModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _cachelockmodule = require("../../../../engine/core-modules/cache-lock/cache-lock.module");
const _recordpositionmodule = require("../../../../engine/core-modules/record-position/record-position.module");
const _logicfunctionmodule = require("../../../../engine/metadata-modules/logic-function/logic-function.module");
const _objectmetadataentity = require("../../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workflowschemamodule = require("../workflow-schema/workflow-schema.module");
const _workflowversionstepmodule = require("../workflow-version-step/workflow-version-step.module");
const _workflowversionworkspaceservice = require("./workflow-version.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowVersionModule = class WorkflowVersionModule {
};
WorkflowVersionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowschemamodule.WorkflowSchemaModule,
            _logicfunctionmodule.LogicFunctionModule,
            _workflowversionstepmodule.WorkflowVersionStepModule,
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity
            ]),
            _recordpositionmodule.RecordPositionModule,
            _cachelockmodule.CacheLockModule
        ],
        providers: [
            _workflowversionworkspaceservice.WorkflowVersionWorkspaceService
        ],
        exports: [
            _workflowversionworkspaceservice.WorkflowVersionWorkspaceService
        ]
    })
], WorkflowVersionModule);

//# sourceMappingURL=workflow-version.module.js.map