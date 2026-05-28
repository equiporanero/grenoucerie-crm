"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemModule", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _filemodule = require("../../core-modules/file/file.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatnavigationmenuitemmodule = require("../flat-navigation-menu-item/flat-navigation-menu-item.module");
const _navigationmenuitemgraphqlapiexceptioninterceptor = require("./interceptors/navigation-menu-item-graphql-api-exception.interceptor");
const _navigationmenuitemdeletionjob = require("./jobs/navigation-menu-item-deletion.job");
const _navigationmenuitemdeletionlistener = require("./listeners/navigation-menu-item-deletion.listener");
const _navigationmenuitemresolver = require("./navigation-menu-item.resolver");
const _navigationmenuitemservice = require("./navigation-menu-item.service");
const _navigationmenuitemaccessservice = require("./services/navigation-menu-item-access.service");
const _navigationmenuitemdeletionservice = require("./services/navigation-menu-item-deletion.service");
const _navigationmenuitemrecordidentifierservice = require("./services/navigation-menu-item-record-identifier.service");
const _navigationmenuitemtoolworkspaceservice = require("./tools/services/navigation-menu-item-tool.workspace-service");
const _permissionsmodule = require("../permissions/permissions.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let NavigationMenuItemModule = class NavigationMenuItemModule {
};
NavigationMenuItemModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _applicationmodule.ApplicationModule,
            _flatnavigationmenuitemmodule.FlatNavigationMenuItemModule,
            _permissionsmodule.PermissionsModule,
            _filemodule.FileModule
        ],
        providers: [
            _navigationmenuitemservice.NavigationMenuItemService,
            _navigationmenuitemaccessservice.NavigationMenuItemAccessService,
            _navigationmenuitemdeletionservice.NavigationMenuItemDeletionService,
            _navigationmenuitemdeletionlistener.NavigationMenuItemDeletionListener,
            _navigationmenuitemdeletionjob.NavigationMenuItemDeletionJob,
            _navigationmenuitemresolver.NavigationMenuItemResolver,
            _navigationmenuitemrecordidentifierservice.NavigationMenuItemRecordIdentifierService,
            _navigationmenuitemgraphqlapiexceptioninterceptor.NavigationMenuItemGraphqlApiExceptionInterceptor,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor,
            _navigationmenuitemtoolworkspaceservice.NavigationMenuItemToolWorkspaceService
        ],
        exports: [
            _navigationmenuitemservice.NavigationMenuItemService,
            _navigationmenuitemrecordidentifierservice.NavigationMenuItemRecordIdentifierService,
            _navigationmenuitemtoolworkspaceservice.NavigationMenuItemToolWorkspaceService
        ]
    })
], NavigationMenuItemModule);

//# sourceMappingURL=navigation-menu-item.module.js.map