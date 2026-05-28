"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemModule", {
    enumerable: true,
    get: function() {
        return CommandMenuItemModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _i18nmodule = require("../../core-modules/i18n/i18n.module");
const _commandmenuitemresolver = require("./command-menu-item.resolver");
const _frontcomponentmodule = require("../front-component/front-component.module");
const _commandmenuitemservice = require("./command-menu-item.service");
const _commandmenuitemgraphqlapiexceptioninterceptor = require("./interceptors/command-menu-item-graphql-api-exception.interceptor");
const _flatcommandmenuitemmodule = require("../flat-command-menu-item/flat-command-menu-item.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommandMenuItemModule = class CommandMenuItemModule {
};
CommandMenuItemModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _applicationmodule.ApplicationModule,
            _flatcommandmenuitemmodule.FlatCommandMenuItemModule,
            _frontcomponentmodule.FrontComponentModule,
            _featureflagmodule.FeatureFlagModule,
            _i18nmodule.I18nModule
        ],
        providers: [
            _commandmenuitemservice.CommandMenuItemService,
            _commandmenuitemresolver.CommandMenuItemResolver,
            _commandmenuitemgraphqlapiexceptioninterceptor.CommandMenuItemGraphqlApiExceptionInterceptor,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ],
        exports: [
            _commandmenuitemservice.CommandMenuItemService
        ]
    })
], CommandMenuItemModule);

//# sourceMappingURL=command-menu-item.module.js.map