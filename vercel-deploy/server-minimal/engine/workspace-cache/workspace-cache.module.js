"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCacheModule", {
    enumerable: true,
    get: function() {
        return WorkspaceCacheModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _cachestoragemodule = require("../core-modules/cache-storage/cache-storage.module");
const _workspacecacheservice = require("./services/workspace-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceCacheModule = class WorkspaceCacheModule {
};
WorkspaceCacheModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _cachestoragemodule.CacheStorageModule,
            _core.DiscoveryModule
        ],
        providers: [
            _workspacecacheservice.WorkspaceCacheService
        ],
        exports: [
            _workspacecacheservice.WorkspaceCacheService
        ]
    })
], WorkspaceCacheModule);

//# sourceMappingURL=workspace-cache.module.js.map