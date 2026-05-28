"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPageLayoutModule", {
    enumerable: true,
    get: function() {
        return FlatPageLayoutModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _workspaceflatpagelayoutmapcacheservice = require("./services/workspace-flat-page-layout-map-cache.service");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _pagelayouttabentity = require("../page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutentity = require("../page-layout/entities/page-layout.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatPageLayoutModule = class FlatPageLayoutModule {
};
FlatPageLayoutModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _pagelayoutentity.PageLayoutEntity,
                _pagelayouttabentity.PageLayoutTabEntity,
                _applicationentity.ApplicationEntity,
                _objectmetadataentity.ObjectMetadataEntity
            ])
        ],
        providers: [
            _workspaceflatpagelayoutmapcacheservice.WorkspaceFlatPageLayoutMapCacheService
        ],
        exports: [
            _workspaceflatpagelayoutmapcacheservice.WorkspaceFlatPageLayoutMapCacheService
        ]
    })
], FlatPageLayoutModule);

//# sourceMappingURL=flat-page-layout.module.js.map