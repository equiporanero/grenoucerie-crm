"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratormodule = require("../command-runners/workspace-iterator.module");
const _upgradecommand = require("./upgrade.command");
const _upgrademodule = require("../../../engine/core-modules/upgrade/upgrade.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UpgradeVersionCommandModule = class UpgradeVersionCommandModule {
};
UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _upgrademodule.UpgradeModule,
            _workspaceiteratormodule.WorkspaceIteratorModule
        ],
        providers: [
            _upgradecommand.UpgradeCommand
        ]
    })
], UpgradeVersionCommandModule);

//# sourceMappingURL=upgrade-version-command.module.js.map