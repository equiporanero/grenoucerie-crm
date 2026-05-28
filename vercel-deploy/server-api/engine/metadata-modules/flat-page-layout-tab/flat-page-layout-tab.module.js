"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPageLayoutTabModule", {
    enumerable: true,
    get: function() {
        return FlatPageLayoutTabModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspaceflatpagelayouttabmapcacheservice = require("./services/workspace-flat-page-layout-tab-map-cache.service");
const _pagelayouttabentity = require("../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutwidgetentity = require("../page-layout-widget/entities/page-layout-widget.entity");
const _pagelayoutentity = require("../page-layout/entities/page-layout.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatPageLayoutTabModule = class FlatPageLayoutTabModule {
};
FlatPageLayoutTabModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _pagelayouttabentity.PageLayoutTabEntity,
                _pagelayoutwidgetentity.PageLayoutWidgetEntity,
                _applicationentity.ApplicationEntity,
                _pagelayoutentity.PageLayoutEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatpagelayouttabmapcacheservice.WorkspaceFlatPageLayoutTabMapCacheService
        ],
        exports: [
            _workspaceflatpagelayouttabmapcacheservice.WorkspaceFlatPageLayoutTabMapCacheService
        ]
    })
], FlatPageLayoutTabModule);

//# sourceMappingURL=flat-page-layout-tab.module.js.map