"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatCommandMenuItemModule", {
    enumerable: true,
    get: function() {
        return FlatCommandMenuItemModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _commandmenuitementity = require("../command-menu-item/entities/command-menu-item.entity");
const _workspaceflatcommandmenuitemmapcacheservice = require("./services/workspace-flat-command-menu-item-map-cache.service");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _frontcomponententity = require("../front-component/entities/front-component.entity");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _pagelayoutentity = require("../page-layout/entities/page-layout.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatCommandMenuItemModule = class FlatCommandMenuItemModule {
};
FlatCommandMenuItemModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _commandmenuitementity.CommandMenuItemEntity,
                _applicationentity.ApplicationEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _frontcomponententity.FrontComponentEntity,
                _pagelayoutentity.PageLayoutEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatcommandmenuitemmapcacheservice.WorkspaceFlatCommandMenuItemMapCacheService
        ],
        exports: [
            _workspaceflatcommandmenuitemmapcacheservice.WorkspaceFlatCommandMenuItemMapCacheService
        ]
    })
], FlatCommandMenuItemModule);

//# sourceMappingURL=flat-command-menu-item.module.js.map