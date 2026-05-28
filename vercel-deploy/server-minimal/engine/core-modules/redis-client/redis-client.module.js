"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedisClientModule", {
    enumerable: true,
    get: function() {
        return RedisClientModule;
    }
});
const _common = require("@nestjs/common");
const _redisclientservice = require("./redis-client.service");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RedisClientModule = class RedisClientModule {
};
RedisClientModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule
        ],
        providers: [
            _redisclientservice.RedisClientService
        ],
        exports: [
            _redisclientservice.RedisClientService
        ]
    })
], RedisClientModule);

//# sourceMappingURL=redis-client.module.js.map