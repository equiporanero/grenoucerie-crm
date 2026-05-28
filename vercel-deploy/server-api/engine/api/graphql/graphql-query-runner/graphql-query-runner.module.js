"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQueryRunnerModule", {
    enumerable: true,
    get: function() {
        return GraphqlQueryRunnerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _processnestedrelationsv2helper = require("../../common/common-nested-relations-processor/process-nested-relations-v2.helper");
const _processnestedrelationshelper = require("../../common/common-nested-relations-processor/process-nested-relations.helper");
const _processaggregatehelper = require("./helpers/process-aggregate.helper");
const _workspacequeryhookmodule = require("../workspace-query-runner/workspace-query-hook/workspace-query-hook.module");
const _workspacequeryrunnermodule = require("../workspace-query-runner/workspace-query-runner.module");
const _apikeymodule = require("../../../core-modules/api-key/api-key.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _roletargetentity = require("../../../metadata-modules/role-target/role-target.entity");
const _userrolemodule = require("../../../metadata-modules/user-role/user-role.module");
const _viewfiltergroupmodule = require("../../../metadata-modules/view-filter-group/view-filter-group.module");
const _viewfiltermodule = require("../../../metadata-modules/view-filter/view-filter.module");
const _viewmodule = require("../../../metadata-modules/view/view.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GraphqlQueryRunnerModule = class GraphqlQueryRunnerModule {
};
GraphqlQueryRunnerModule = _ts_decorate([
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
            _viewmodule.ViewModule,
            _viewfiltermodule.ViewFilterModule,
            _viewfiltergroupmodule.ViewFilterGroupModule
        ],
        providers: [
            _processnestedrelationshelper.ProcessNestedRelationsHelper,
            _processnestedrelationsv2helper.ProcessNestedRelationsV2Helper,
            _processaggregatehelper.ProcessAggregateHelper
        ]
    })
], GraphqlQueryRunnerModule);

//# sourceMappingURL=graphql-query-runner.module.js.map