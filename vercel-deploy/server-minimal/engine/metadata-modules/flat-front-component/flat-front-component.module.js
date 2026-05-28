"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatFrontComponentModule", {
    enumerable: true,
    get: function() {
        return FlatFrontComponentModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspaceflatfrontcomponentmapcacheservice = require("./services/workspace-flat-front-component-map-cache.service");
const _frontcomponententity = require("../front-component/entities/front-component.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatFrontComponentModule = class FlatFrontComponentModule {
};
FlatFrontComponentModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _frontcomponententity.FrontComponentEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatfrontcomponentmapcacheservice.WorkspaceFlatFrontComponentMapCacheService
        ],
        exports: [
            _workspaceflatfrontcomponentmapcacheservice.WorkspaceFlatFrontComponentMapCacheService
        ]
    })
], FlatFrontComponentModule);

//# sourceMappingURL=flat-front-component.module.js.map