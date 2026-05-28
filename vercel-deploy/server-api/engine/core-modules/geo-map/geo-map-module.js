"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GeoMapModule", {
    enumerable: true,
    get: function() {
        return GeoMapModule;
    }
});
const _common = require("@nestjs/common");
const _tokenmodule = require("../auth/token/token.module");
const _geomapresolver = require("./resolver/geo-map.resolver");
const _geomapservice = require("./services/geo-map.service");
const _securehttpclientmodule = require("../secure-http-client/secure-http-client.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GeoMapModule = class GeoMapModule {
};
GeoMapModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _tokenmodule.TokenModule,
            _securehttpclientmodule.SecureHttpClientModule
        ],
        providers: [
            _geomapservice.GeoMapService,
            _geomapresolver.GeoMapResolver
        ],
        exports: []
    })
], GeoMapModule);

//# sourceMappingURL=geo-map-module.js.map