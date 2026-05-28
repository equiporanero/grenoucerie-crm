"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatConnectionProviderModule", {
    enumerable: true,
    get: function() {
        return FlatConnectionProviderModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _connectionproviderentity = require("../../core-modules/application/connection-provider/connection-provider.entity");
const _applicationentity = require("../../core-modules/application/application.entity");
const _workspaceflatconnectionprovidermapcacheservice = require("./services/workspace-flat-connection-provider-map-cache.service");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatConnectionProviderModule = class FlatConnectionProviderModule {
};
FlatConnectionProviderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _connectionproviderentity.ConnectionProviderEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatconnectionprovidermapcacheservice.WorkspaceFlatConnectionProviderMapCacheService
        ],
        exports: [
            _workspaceflatconnectionprovidermapcacheservice.WorkspaceFlatConnectionProviderMapCacheService
        ]
    })
], FlatConnectionProviderModule);

//# sourceMappingURL=flat-connection-provider.module.js.map