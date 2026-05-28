"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WebhookModule", {
    enumerable: true,
    get: function() {
        return WebhookModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _applicationmodule = require("../../core-modules/application/application.module");
const _tokenmodule = require("../../core-modules/auth/token/token.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatwebhookmodule = require("../flat-webhook/flat-webhook.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _webhookcontroller = require("./controllers/webhook.controller");
const _webhookentity = require("./entities/webhook.entity");
const _webhookgraphqlapiexceptioninterceptor = require("./interceptors/webhook-graphql-api-exception.interceptor");
const _webhooktoolworkspaceservice = require("./tools/services/webhook-tool.workspace-service");
const _webhookresolver = require("./webhook.resolver");
const _webhookservice = require("./webhook.service");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WebhookModule = class WebhookModule {
};
WebhookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _webhookentity.WebhookEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _applicationmodule.ApplicationModule,
            _tokenmodule.TokenModule,
            _permissionsmodule.PermissionsModule,
            _flatwebhookmodule.FlatWebhookModule
        ],
        controllers: [
            _webhookcontroller.WebhookController
        ],
        providers: [
            _webhookservice.WebhookService,
            _webhookresolver.WebhookResolver,
            _webhookgraphqlapiexceptioninterceptor.WebhookGraphqlApiExceptionInterceptor,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor,
            _webhooktoolworkspaceservice.WebhookToolWorkspaceService
        ],
        exports: [
            _webhookservice.WebhookService,
            _webhooktoolworkspaceservice.WebhookToolWorkspaceService
        ]
    })
], WebhookModule);

//# sourceMappingURL=webhook.module.js.map