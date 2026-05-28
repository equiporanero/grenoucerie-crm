"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _servestatic = require("@nestjs/serve-static");
const _fs = require("fs");
const _path = require("path");
const _nestjs = require("@graphql-yoga/nestjs");
const _setup = require("@sentry/nestjs/setup");
const _adminpanelgraphqlapimodule = require("./engine/api/graphql/admin-panel-graphql-api.module");
const _coregraphqlapimodule = require("./engine/api/graphql/core-graphql-api.module");
const _graphqlconfigmodule = require("./engine/api/graphql/graphql-config/graphql-config.module");
const _graphqlconfigservice = require("./engine/api/graphql/graphql-config/graphql-config.service");
const _metadatagraphqlapimodule = require("./engine/api/graphql/metadata-graphql-api.module");
const _mcpmethodguardmiddleware = require("./engine/api/mcp/middlewares/mcp-method-guard.middleware");
const _mcpmodule = require("./engine/api/mcp/mcp.module");
const _restapimodule = require("./engine/api/rest/rest-api.module");
const _workspaceauthcontextmiddleware = require("./engine/core-modules/auth/middlewares/workspace-auth-context.middleware");
const _metricsmodule = require("./engine/core-modules/metrics/metrics.module");
const _dataloadermodule = require("./engine/dataloaders/dataloader.module");
const _workspacemetadataversionmodule = require("./engine/metadata-modules/workspace-metadata-version/workspace-metadata-version.module");
const _graphqlhydraterequestfromtokenmiddleware = require("./engine/middlewares/graphql-hydrate-request-from-token.middleware");
const _middlewaremodule = require("./engine/middlewares/middleware.module");
const _restcoremiddleware = require("./engine/middlewares/rest-core.middleware");
const _globalworkspacedatasourcemodule = require("./engine/twenty-orm/global-workspace-datasource/global-workspace-datasource.module");
const _twentyormmodule = require("./engine/twenty-orm/twenty-orm.module");
const _workspacecachestoragemodule = require("./engine/workspace-cache-storage/workspace-cache-storage.module");
const _modulesmodule = require("./modules/modules.module");
const _clickHousemodule = require("./database/clickHouse/clickHouse.module");
const _coreenginemodule = require("./engine/core-modules/core-engine.module");
const _i18nmodule = require("./engine/core-modules/i18n/i18n.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
// TODO: Remove this middleware when all the rest endpoints are migrated to TwentyORM
const MIGRATED_REST_METHODS = [
    _common.RequestMethod.DELETE,
    _common.RequestMethod.POST,
    _common.RequestMethod.PATCH,
    _common.RequestMethod.PUT,
    _common.RequestMethod.GET
];
let AppModule = class AppModule {
    static getConditionalModules() {
        const modules = [];
        const frontPath = (0, _path.join)(__dirname, 'front');
        // NestJS DevTools - can be useful for debugging and profiling
        /* if (process.env.NODE_ENV === NodeEnvironment.DEVELOPMENT) {
      modules.push(
        DevtoolsModule.register({
          http: true,
        }),
      );
    } */ if ((0, _fs.existsSync)(frontPath)) {
            modules.push(_servestatic.ServeStaticModule.forRoot({
                rootPath: frontPath
            }));
        }
        // Messaque Queue explorer only for sync driver
        // Maybe we don't need to conditionaly register the explorer, because we're creating a jobs module
        // that will expose classes that are only used in the queue worker
        /*
    if (process.env.MESSAGE_QUEUE_TYPE === MessageQueueDriverType.Sync) {
      modules.push(MessageQueueModule.registerExplorer());
    }
    */ return modules;
    }
    configure(consumer) {
        consumer.apply(_graphqlhydraterequestfromtokenmiddleware.GraphQLHydrateRequestFromTokenMiddleware, _workspaceauthcontextmiddleware.WorkspaceAuthContextMiddleware).forRoutes({
            path: 'graphql',
            method: _common.RequestMethod.ALL
        });
        consumer.apply(_graphqlhydraterequestfromtokenmiddleware.GraphQLHydrateRequestFromTokenMiddleware, _workspaceauthcontextmiddleware.WorkspaceAuthContextMiddleware).forRoutes({
            path: 'metadata',
            method: _common.RequestMethod.ALL
        });
        consumer.apply(_graphqlhydraterequestfromtokenmiddleware.GraphQLHydrateRequestFromTokenMiddleware, _workspaceauthcontextmiddleware.WorkspaceAuthContextMiddleware).forRoutes({
            path: 'admin-panel',
            method: _common.RequestMethod.ALL
        });
        consumer.apply(_mcpmethodguardmiddleware.McpMethodGuardMiddleware).forRoutes({
            path: 'mcp',
            method: _common.RequestMethod.ALL
        });
        for (const method of MIGRATED_REST_METHODS){
            consumer.apply(_restcoremiddleware.RestCoreMiddleware, _workspaceauthcontextmiddleware.WorkspaceAuthContextMiddleware).forRoutes({
                path: 'rest/*path',
                method
            });
        }
    }
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _setup.SentryModule.forRoot(),
            _graphql.GraphQLModule.forRootAsync({
                driver: _nestjs.YogaDriver,
                imports: [
                    _graphqlconfigmodule.GraphQLConfigModule,
                    _metricsmodule.MetricsModule,
                    _dataloadermodule.DataloaderModule
                ],
                useClass: _graphqlconfigservice.GraphQLConfigService
            }),
            _twentyormmodule.TwentyORMModule,
            _globalworkspacedatasourcemodule.GlobalWorkspaceDataSourceModule,
            _clickHousemodule.ClickHouseModule,
            // Core engine module, contains all the core modules
            _coreenginemodule.CoreEngineModule,
            // Modules module, contains all business logic modules
            _modulesmodule.ModulesModule,
            // Needed for the user workspace middleware
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            // Api modules
            _coregraphqlapimodule.CoreGraphQLApiModule,
            _metadatagraphqlapimodule.MetadataGraphQLApiModule,
            _adminpanelgraphqlapimodule.AdminPanelGraphQLApiModule,
            _restapimodule.RestApiModule,
            _mcpmodule.McpModule,
            _middlewaremodule.MiddlewareModule,
            _workspacemetadataversionmodule.WorkspaceMetadataVersionModule,
            // I18n module for translations
            _i18nmodule.I18nModule,
            // Conditional modules
            ...AppModule.getConditionalModules()
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map