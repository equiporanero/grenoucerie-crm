"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCacheStorageModule", {
    enumerable: true,
    get: function() {
        return WorkspaceCacheStorageModule;
    }
});
const _common = require("@nestjs/common");
const _getdatafromcachewithrecomputeservice = require("./services/get-data-from-cache-with-recompute.service");
const _workspacecachestorageservice = require("./workspace-cache-storage.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceCacheStorageModule = class WorkspaceCacheStorageModule {
};
WorkspaceCacheStorageModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _workspacecachestorageservice.WorkspaceCacheStorageService,
            _getdatafromcachewithrecomputeservice.GetDataFromCacheWithRecomputeService
        ],
        exports: [
            _workspacecachestorageservice.WorkspaceCacheStorageService,
            _getdatafromcachewithrecomputeservice.GetDataFromCacheWithRecomputeService
        ]
    })
], WorkspaceCacheStorageModule);

//# sourceMappingURL=workspace-cache-storage.module.js.map