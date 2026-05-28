"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreCommonApiModule", {
    enumerable: true,
    get: function() {
        return CoreCommonApiModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _commonargsprocessors = require("./common-args-processors/common-args-processors");
const _groupbyargprocessorservice = require("./common-args-processors/group-by-arg-processor/group-by-arg-processor.service");
const _processnestedrelationsv2helper = require("./common-nested-relations-processor/process-nested-relations-v2.helper");
const _processnestedrelationshelper = require("./common-nested-relations-processor/process-nested-relations.helper");
const _commonqueryrunners = require("./common-query-runners/common-query-runners");
const _commonresultgettersservice = require("./common-result-getters/common-result-getters.service");
const _groupbywithrecordsservice = require("../graphql/graphql-query-runner/group-by/services/group-by-with-records.service");
const _processaggregatehelper = require("../graphql/graphql-query-runner/helpers/process-aggregate.helper");
const _workspacequeryhookmodule = require("../graphql/workspace-query-runner/workspace-query-hook/workspace-query-hook.module");
const _workspacequeryrunnermodule = require("../graphql/workspace-query-runner/workspace-query-runner.module");
const _apikeymodule = require("../../core-modules/api-key/api-key.module");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _filemodule = require("../../core-modules/file/file.module");
const _metricsmodule = require("../../core-modules/metrics/metrics.module");
const _recordpositionmodule = require("../../core-modules/record-position/record-position.module");
const _recordtransformermodule = require("../../core-modules/record-transformer/record-transformer.module");
const _throttlermodule = require("../../core-modules/throttler/throttler.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _roletargetentity = require("../../metadata-modules/role-target/role-target.entity");
const _userrolemodule = require("../../metadata-modules/user-role/user-role.module");
const _viewfiltergroupmodule = require("../../metadata-modules/view-filter-group/view-filter-group.module");
const _viewfiltermodule = require("../../metadata-modules/view-filter/view-filter.module");
const _viewmodule = require("../../metadata-modules/view/view.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CoreCommonApiModule = class CoreCommonApiModule {
};
CoreCommonApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacequeryhookmodule.WorkspaceQueryHookModule,
            _workspacequeryrunnermodule.WorkspaceQueryRunnerModule,
            _permissionsmodule.PermissionsModule,
            _typeorm.TypeOrmModule.forFeature([
                _roletargetentity.RoleTargetEntity
            ]),
            _userrolemodule.UserRoleModule,
            _apikeymodule.ApiKeyModule,
            _filemodule.FileModule,
            _viewmodule.ViewModule,
            _viewfiltermodule.ViewFilterModule,
            _viewfiltergroupmodule.ViewFilterGroupModule,
            _throttlermodule.ThrottlerModule,
            _metricsmodule.MetricsModule,
            _recordpositionmodule.RecordPositionModule,
            _recordtransformermodule.RecordTransformerModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _processnestedrelationshelper.ProcessNestedRelationsHelper,
            _processnestedrelationsv2helper.ProcessNestedRelationsV2Helper,
            ..._commonargsprocessors.CommonArgsProcessors,
            _processaggregatehelper.ProcessAggregateHelper,
            ..._commonqueryrunners.CommonQueryRunners,
            _commonresultgettersservice.CommonResultGettersService,
            _groupbywithrecordsservice.GroupByWithRecordsService
        ],
        exports: [
            ..._commonqueryrunners.CommonQueryRunners,
            _groupbyargprocessorservice.GroupByArgProcessorService
        ]
    })
], CoreCommonApiModule);

//# sourceMappingURL=core-common-api.module.js.map