"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MinimalMetadataModule", {
    enumerable: true,
    get: function() {
        return MinimalMetadataModule;
    }
});
const _common = require("@nestjs/common");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _minimalmetadataresolver = require("./minimal-metadata.resolver");
const _minimalmetadataservice = require("./minimal-metadata.service");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MinimalMetadataModule = class MinimalMetadataModule {
};
MinimalMetadataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _minimalmetadataresolver.MinimalMetadataResolver,
            _minimalmetadataservice.MinimalMetadataService
        ],
        exports: [
            _minimalmetadataservice.MinimalMetadataService
        ]
    })
], MinimalMetadataModule);

//# sourceMappingURL=minimal-metadata.module.js.map