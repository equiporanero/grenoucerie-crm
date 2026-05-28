"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCommandProviderModule", {
    enumerable: true,
    get: function() {
        return WorkspaceCommandProviderModule;
    }
});
const _common = require("@nestjs/common");
const _121upgradeversioncommandmodule = require("./1-21/1-21-upgrade-version-command.module");
const _122upgradeversioncommandmodule = require("./1-22/1-22-upgrade-version-command.module");
const _123upgradeversioncommandmodule = require("./1-23/1-23-upgrade-version-command.module");
const _20upgradeversioncommandmodule = require("./2-0/2-0-upgrade-version-command.module");
const _21upgradeversioncommandmodule = require("./2-1/2-1-upgrade-version-command.module");
const _22upgradeversioncommandmodule = require("./2-2/2-2-upgrade-version-command.module");
const _23upgradeversioncommandmodule = require("./2-3/2-3-upgrade-version-command.module");
const _24upgradeversioncommandmodule = require("./2-4/2-4-upgrade-version-command.module");
const _25upgradeversioncommandmodule = require("./2-5/2-5-upgrade-version-command.module");
const _27upgradeversioncommandmodule = require("./2-7/2-7-upgrade-version-command.module");
const _28upgradeversioncommandmodule = require("./2-8/2-8-upgrade-version-command.module");
const _29upgradeversioncommandmodule = require("./2-9/2-9-upgrade-version-command.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceCommandProviderModule = class WorkspaceCommandProviderModule {
};
WorkspaceCommandProviderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _121upgradeversioncommandmodule.V1_21_UpgradeVersionCommandModule,
            _122upgradeversioncommandmodule.V1_22_UpgradeVersionCommandModule,
            _123upgradeversioncommandmodule.V1_23_UpgradeVersionCommandModule,
            _20upgradeversioncommandmodule.V2_0_UpgradeVersionCommandModule,
            _21upgradeversioncommandmodule.V2_1_UpgradeVersionCommandModule,
            _22upgradeversioncommandmodule.V2_2_UpgradeVersionCommandModule,
            _23upgradeversioncommandmodule.V2_3_UpgradeVersionCommandModule,
            _24upgradeversioncommandmodule.V2_4_UpgradeVersionCommandModule,
            _25upgradeversioncommandmodule.V2_5_UpgradeVersionCommandModule,
            _27upgradeversioncommandmodule.V2_7_UpgradeVersionCommandModule,
            _28upgradeversioncommandmodule.V2_8_UpgradeVersionCommandModule,
            _29upgradeversioncommandmodule.V2_9_UpgradeVersionCommandModule
        ]
    })
], WorkspaceCommandProviderModule);

//# sourceMappingURL=workspace-command-provider.module.js.map