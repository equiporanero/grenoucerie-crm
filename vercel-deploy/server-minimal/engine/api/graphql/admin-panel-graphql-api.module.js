"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelGraphQLApiModule", {
    enumerable: true,
    get: function() {
        return AdminPanelGraphQLApiModule;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _nestjs = require("@graphql-yoga/nestjs");
const _adminpanelmodulefactory = require("./admin-panel.module-factory");
const _graphqlconfigmodule = require("./graphql-config/graphql-config.module");
const _adminpanelmodule = require("../../core-modules/admin-panel/admin-panel.module");
const _exceptionhandlerservice = require("../../core-modules/exception-handler/exception-handler.service");
const _i18nmodule = require("../../core-modules/i18n/i18n.module");
const _i18nservice = require("../../core-modules/i18n/i18n.service");
const _metricsmodule = require("../../core-modules/metrics/metrics.module");
const _metricsservice = require("../../core-modules/metrics/metrics.service");
const _twentyconfigservice = require("../../core-modules/twenty-config/twenty-config.service");
const _dataloadermodule = require("../../dataloaders/dataloader.module");
const _dataloaderservice = require("../../dataloaders/dataloader.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AdminPanelGraphQLApiModule = class AdminPanelGraphQLApiModule {
};
AdminPanelGraphQLApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _graphql.GraphQLModule.forRootAsync({
                driver: _nestjs.YogaDriver,
                useFactory: _adminpanelmodulefactory.adminPanelModuleFactory,
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
                    _metricsservice.MetricsService,
                    _i18nservice.I18nService
                ]
            }),
            _adminpanelmodule.AdminPanelModule
        ]
    })
], AdminPanelGraphQLApiModule);

//# sourceMappingURL=admin-panel-graphql-api.module.js.map