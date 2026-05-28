"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouteTriggerModule", {
    enumerable: true,
    get: function() {
        return RouteTriggerModule;
    }
});
const _common = require("@nestjs/common");
const _routetriggercontroller = require("./route-trigger.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RouteTriggerModule = class RouteTriggerModule {
};
RouteTriggerModule = _ts_decorate([
    (0, _common.Module)({
        controllers: [
            _routetriggercontroller.RouteTriggerController
        ]
    })
], RouteTriggerModule);

//# sourceMappingURL=route-trigger.module.js.map