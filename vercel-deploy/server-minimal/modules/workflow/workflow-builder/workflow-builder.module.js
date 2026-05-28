"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowBuilderModule", {
    enumerable: true,
    get: function() {
        return WorkflowBuilderModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workflowschemamodule = require("./workflow-schema/workflow-schema.module");
const _workflowversionstepmodule = require("./workflow-version-step/workflow-version-step.module");
const _workflowversionmodule = require("./workflow-version/workflow-version.module");
const _workflowversionedgemodule = require("./workflow-version-edge/workflow-version-edge.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkflowBuilderModule = class WorkflowBuilderModule {
};
WorkflowBuilderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workflowschemamodule.WorkflowSchemaModule,
            _workflowversionmodule.WorkflowVersionModule,
            _workflowversionstepmodule.WorkflowVersionStepModule,
            _workflowversionedgemodule.WorkflowVersionEdgeModule,
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity
            ])
        ],
        exports: [
            _workflowschemamodule.WorkflowSchemaModule,
            _workflowversionmodule.WorkflowVersionModule,
            _workflowversionstepmodule.WorkflowVersionStepModule,
            _workflowversionedgemodule.WorkflowVersionEdgeModule
        ]
    })
], WorkflowBuilderModule);

//# sourceMappingURL=workflow-builder.module.js.map