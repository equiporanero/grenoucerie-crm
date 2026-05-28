"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphQLConfigService", {
    enumerable: true,
    get: function() {
        return GraphQLConfigService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _nodeenvironmentinterface = require("../../../core-modules/twenty-config/interfaces/node-environment.interface");
const _directexecutionservice = require("../direct-execution/direct-execution.service");
const _usedirectexecutionhook = require("../direct-execution/hooks/use-direct-execution.hook");
const _coreenginemodule = require("../../../core-modules/core-engine.module");
const _exceptionhandlerservice = require("../../../core-modules/exception-handler/exception-handler.service");
const _usesentrytracing = require("../../../core-modules/exception-handler/hooks/use-sentry-tracing");
const _featureflagservice = require("../../../core-modules/feature-flag/services/feature-flag.service");
const _usedisableintrospectionandsuggestionsforunauthenticatedusershook = require("../../../core-modules/graphql/hooks/use-disable-introspection-and-suggestions-for-unauthenticated-users.hook");
const _usegraphqlerrorhandlerhook = require("../../../core-modules/graphql/hooks/use-graphql-error-handler.hook");
const _usevalidategraphqlquerycomplexityhook = require("../../../core-modules/graphql/hooks/use-validate-graphql-query-complexity.hook");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _metricsservice = require("../../../core-modules/metrics/metrics.service");
const _twentyconfigservice = require("../../../core-modules/twenty-config/twenty-config.service");
const _dataloaderservice = require("../../../dataloaders/dataloader.service");
const _renderapolloplaygroundutil = require("../../../utils/render-apollo-playground.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GraphQLConfigService = class GraphQLConfigService {
    createGqlOptions() {
        const isDebugMode = this.twentyConfigService.get('NODE_ENV') === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT;
        const plugins = [
            (0, _usedirectexecutionhook.useDirectExecution)({
                directExecutionService: this.directExecutionService,
                featureFlagService: this.featureFlagService
            }),
            (0, _usegraphqlerrorhandlerhook.useGraphQLErrorHandlerHook)({
                metricsService: this.metricsService,
                exceptionHandlerService: this.exceptionHandlerService,
                i18nService: this.i18nService,
                twentyConfigService: this.twentyConfigService
            }),
            (0, _usedisableintrospectionandsuggestionsforunauthenticatedusershook.useDisableIntrospectionAndSuggestionsForUnauthenticatedUsers)(this.twentyConfigService.get('NODE_ENV') === _nodeenvironmentinterface.NodeEnvironment.PRODUCTION),
            (0, _usevalidategraphqlquerycomplexityhook.useValidateGraphqlQueryComplexity)({
                maximumAllowedFields: this.twentyConfigService.get('GRAPHQL_MAX_FIELDS'),
                maximumAllowedRootResolvers: this.twentyConfigService.get('GRAPHQL_MAX_ROOT_RESOLVERS'),
                checkDuplicateRootResolvers: true
            })
        ];
        if (_node.isInitialized()) {
            plugins.push((0, _usesentrytracing.useSentryTracing)());
        }
        const config = {
            autoSchemaFile: true,
            include: [
                _coreenginemodule.CoreEngineModule
            ],
            resolverSchemaScope: 'core',
            buildSchemaOptions: {},
            resolvers: {
                JSON: _graphqltypejson.default
            },
            plugins: plugins,
            context: ()=>({
                    loaders: this.dataloaderService.createLoaders()
                })
        };
        if (isDebugMode) {
            config.renderGraphiQL = ()=>{
                return (0, _renderapolloplaygroundutil.renderApolloPlayground)();
            };
        }
        return config;
    }
    constructor(exceptionHandlerService, twentyConfigService, moduleRef, metricsService, dataloaderService, i18nService, directExecutionService, featureFlagService){
        this.exceptionHandlerService = exceptionHandlerService;
        this.twentyConfigService = twentyConfigService;
        this.moduleRef = moduleRef;
        this.metricsService = metricsService;
        this.dataloaderService = dataloaderService;
        this.i18nService = i18nService;
        this.directExecutionService = directExecutionService;
        this.featureFlagService = featureFlagService;
    }
};
GraphQLConfigService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _core.ModuleRef === "undefined" ? Object : _core.ModuleRef,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _dataloaderservice.DataloaderService === "undefined" ? Object : _dataloaderservice.DataloaderService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _directexecutionservice.DirectExecutionService === "undefined" ? Object : _directexecutionservice.DirectExecutionService,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService
    ])
], GraphQLConfigService);

//# sourceMappingURL=graphql-config.service.js.map