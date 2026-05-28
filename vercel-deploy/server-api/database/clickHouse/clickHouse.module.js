"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClickHouseModule", {
    enumerable: true,
    get: function() {
        return ClickHouseModule;
    }
});
const _common = require("@nestjs/common");
const _twentyconfigmodule = require("../../engine/core-modules/twenty-config/twenty-config.module");
const _clickHouseservice = require("./clickHouse.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ClickHouseModule = class ClickHouseModule {
};
ClickHouseModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule
        ],
        providers: [
            _clickHouseservice.ClickHouseService
        ],
        exports: [
            _clickHouseservice.ClickHouseService
        ]
    })
], ClickHouseModule);

//# sourceMappingURL=clickHouse.module.js.map