"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LabModule", {
    enumerable: true,
    get: function() {
        return LabModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _labresolver = require("./lab.resolver");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LabModule = class LabModule {
};
LabModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule
        ],
        providers: [
            _labresolver.LabResolver
        ],
        exports: []
    })
], LabModule);

//# sourceMappingURL=lab.module.js.map