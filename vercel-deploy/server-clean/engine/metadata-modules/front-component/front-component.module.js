"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FrontComponentModule", {
    enumerable: true,
    get: function() {
        return FrontComponentModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _tokenmodule = require("../../core-modules/auth/token/token.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatfrontcomponentmodule = require("../flat-front-component/flat-front-component.module");
const _frontcomponentcontroller = require("./controllers/front-component.controller");
const _frontcomponentrestapiexceptionfilter = require("./filters/front-component-rest-api-exception.filter");
const _frontcomponentresolver = require("./front-component.resolver");
const _frontcomponentservice = require("./front-component.service");
const _frontcomponentgraphqlapiexceptioninterceptor = require("./interceptors/front-component-graphql-api-exception.interceptor");
const _permissionsmodule = require("../permissions/permissions.module");
const _subscriptionsmodule = require("../../subscriptions/subscriptions.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FrontComponentModule = class FrontComponentModule {
};
FrontComponentModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _applicationmodule.ApplicationModule,
            _tokenmodule.TokenModule,
            _permissionsmodule.PermissionsModule,
            _flatfrontcomponentmodule.FlatFrontComponentModule,
            _subscriptionsmodule.SubscriptionsModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        controllers: [
            _frontcomponentcontroller.FrontComponentController
        ],
        providers: [
            _frontcomponentservice.FrontComponentService,
            _frontcomponentresolver.FrontComponentResolver,
            _frontcomponentgraphqlapiexceptioninterceptor.FrontComponentGraphqlApiExceptionInterceptor,
            _frontcomponentrestapiexceptionfilter.FrontComponentRestApiExceptionFilter,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ],
        exports: [
            _frontcomponentservice.FrontComponentService
        ]
    })
], FrontComponentModule);

//# sourceMappingURL=front-component.module.js.map