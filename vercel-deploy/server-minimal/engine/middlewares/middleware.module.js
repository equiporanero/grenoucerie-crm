"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MiddlewareModule", {
    enumerable: true,
    get: function() {
        return MiddlewareModule;
    }
});
const _common = require("@nestjs/common");
const _tokenmodule = require("../core-modules/auth/token/token.module");
const _jwtmodule = require("../core-modules/jwt/jwt.module");
const _workspacemanyorallflatentitymapscachemodule = require("../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _middlewareservice = require("./middleware.service");
const _workspacecachestoragemodule = require("../workspace-cache-storage/workspace-cache-storage.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MiddlewareModule = class MiddlewareModule {
};
MiddlewareModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _tokenmodule.TokenModule,
            _jwtmodule.JwtModule
        ],
        providers: [
            _middlewareservice.MiddlewareService
        ],
        exports: [
            _middlewareservice.MiddlewareService
        ]
    })
], MiddlewareModule);

//# sourceMappingURL=middleware.module.js.map