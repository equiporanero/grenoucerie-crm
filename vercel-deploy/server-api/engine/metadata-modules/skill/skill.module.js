"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SkillModule", {
    enumerable: true,
    get: function() {
        return SkillModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatskillmodule = require("../flat-skill/flat-skill.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _skillgraphqlapiexceptioninterceptor = require("./interceptors/skill-graphql-api-exception.interceptor");
const _skillresolver = require("./skill.resolver");
const _skillservice = require("./skill.service");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SkillModule = class SkillModule {
};
SkillModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _applicationmodule.ApplicationModule,
            _permissionsmodule.PermissionsModule,
            _flatskillmodule.FlatSkillModule
        ],
        providers: [
            _skillservice.SkillService,
            _skillresolver.SkillResolver,
            _skillgraphqlapiexceptioninterceptor.SkillGraphqlApiExceptionInterceptor,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ],
        exports: [
            _skillservice.SkillService
        ]
    })
], SkillModule);

//# sourceMappingURL=skill.module.js.map