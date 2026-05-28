"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatApplicationVariableModule", {
    enumerable: true,
    get: function() {
        return FlatApplicationVariableModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _applicationvariableentity = require("../../core-modules/application/application-variable/application-variable.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspaceflatapplicationvariablemapcacheservice = require("./services/workspace-flat-application-variable-map-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatApplicationVariableModule = class FlatApplicationVariableModule {
};
FlatApplicationVariableModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _applicationvariableentity.ApplicationVariableEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatapplicationvariablemapcacheservice.WorkspaceFlatApplicationVariableMapCacheService
        ],
        exports: [
            _workspaceflatapplicationvariablemapcacheservice.WorkspaceFlatApplicationVariableMapCacheService
        ]
    })
], FlatApplicationVariableModule);

//# sourceMappingURL=flat-application-variable.module.js.map