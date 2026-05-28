"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatNavigationMenuItemModule", {
    enumerable: true,
    get: function() {
        return FlatNavigationMenuItemModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspaceflatnavigationmenuitemmapcacheservice = require("./services/workspace-flat-navigation-menu-item-map-cache.service");
const _navigationmenuitementity = require("../navigation-menu-item/entities/navigation-menu-item.entity");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _pagelayoutentity = require("../page-layout/entities/page-layout.entity");
const _viewentity = require("../view/entities/view.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatNavigationMenuItemModule = class FlatNavigationMenuItemModule {
};
FlatNavigationMenuItemModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _navigationmenuitementity.NavigationMenuItemEntity,
                _applicationentity.ApplicationEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _pagelayoutentity.PageLayoutEntity,
                _viewentity.ViewEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatnavigationmenuitemmapcacheservice.WorkspaceFlatNavigationMenuItemMapCacheService
        ],
        exports: [
            _workspaceflatnavigationmenuitemmapcacheservice.WorkspaceFlatNavigationMenuItemMapCacheService
        ]
    })
], FlatNavigationMenuItemModule);

//# sourceMappingURL=flat-navigation-menu-item.module.js.map