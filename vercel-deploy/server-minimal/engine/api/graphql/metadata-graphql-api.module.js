"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataGraphQLApiModule", {
    enumerable: true,
    get: function() {
        return MetadataGraphQLApiModule;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _nestjs = require("@graphql-yoga/nestjs");
const _graphqlconfigmodule = require("./graphql-config/graphql-config.module");
const _metadatamodulefactory = require("./metadata.module-factory");
const _cachestoragenamespaceenum = require("../../core-modules/cache-storage/types/cache-storage-namespace.enum");
const _exceptionhandlerservice = require("../../core-modules/exception-handler/exception-handler.service");
const _featureflagservice = require("../../core-modules/feature-flag/services/feature-flag.service");
const _i18nmodule = require("../../core-modules/i18n/i18n.module");
const _i18nservice = require("../../core-modules/i18n/i18n.service");
const _metricsmodule = require("../../core-modules/metrics/metrics.module");
const _metricsservice = require("../../core-modules/metrics/metrics.service");
const _twentyconfigservice = require("../../core-modules/twenty-config/twenty-config.service");
const _dataloadermodule = require("../../dataloaders/dataloader.module");
const _dataloaderservice = require("../../dataloaders/dataloader.service");
const _metadataenginemodule = require("../../metadata-modules/metadata-engine.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MetadataGraphQLApiModule = class MetadataGraphQLApiModule {
};
MetadataGraphQLApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _graphql.GraphQLModule.forRootAsync({
                driver: _nestjs.YogaDriver,
                useFactory: _metadatamodulefactory.metadataModuleFactory,
                imports: [
                    _graphqlconfigmodule.GraphQLConfigModule,
                    _dataloadermodule.DataloaderModule,
                    _metricsmodule.MetricsModule,
                    _i18nmodule.I18nModule
                ],
                inject: [
                    _twentyconfigservice.TwentyConfigService,
                    _exceptionhandlerservice.ExceptionHandlerService,
                    _dataloaderservice.DataloaderService,
                    _cachestoragenamespaceenum.CacheStorageNamespace.EngineWorkspace,
                    _metricsservice.MetricsService,
                    _i18nservice.I18nService,
                    _featureflagservice.FeatureFlagService
                ]
            }),
            _metadataenginemodule.MetadataEngineModule
        ]
    })
], MetadataGraphQLApiModule);

//# sourceMappingURL=metadata-graphql-api.module.js.map