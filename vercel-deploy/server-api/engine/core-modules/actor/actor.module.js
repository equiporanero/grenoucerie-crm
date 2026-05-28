"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActorModule", {
    enumerable: true,
    get: function() {
        return ActorModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _createdbycreatemanyprequeryhook = require("./query-hooks/created-by.create-many.pre-query-hook");
const _createdbycreateoneprequeryhook = require("./query-hooks/created-by.create-one.pre-query-hook");
const _updatedbyupdatemanyprequeryhook = require("./query-hooks/updated-by.update-many.pre-query-hook");
const _updatedbyupdateoneprequeryhook = require("./query-hooks/updated-by.update-one.pre-query-hook");
const _fieldmetadataentity = require("../../metadata-modules/field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _actorfromauthcontextservice = require("./services/actor-from-auth-context.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ActorModule = class ActorModule {
};
ActorModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _fieldmetadataentity.FieldMetadataEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _createdbycreatemanyprequeryhook.CreatedByCreateManyPreQueryHook,
            _createdbycreateoneprequeryhook.CreatedByCreateOnePreQueryHook,
            _updatedbyupdatemanyprequeryhook.UpdatedByUpdateManyPreQueryHook,
            _updatedbyupdateoneprequeryhook.UpdatedByUpdateOnePreQueryHook,
            _actorfromauthcontextservice.ActorFromAuthContextService
        ],
        exports: [
            _createdbycreatemanyprequeryhook.CreatedByCreateManyPreQueryHook,
            _createdbycreateoneprequeryhook.CreatedByCreateOnePreQueryHook,
            _updatedbyupdatemanyprequeryhook.UpdatedByUpdateManyPreQueryHook,
            _updatedbyupdateoneprequeryhook.UpdatedByUpdateOnePreQueryHook,
            _actorfromauthcontextservice.ActorFromAuthContextService
        ]
    })
], ActorModule);

//# sourceMappingURL=actor.module.js.map