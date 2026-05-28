"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V2_9_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V2_9_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _29workspacecommand1799000000000migrateaimodelpreferencescommand = require("./2-9-workspace-command-1799000000000-migrate-ai-model-preferences.command");
const _keyvaluepairentity = require("../../../../engine/core-modules/key-value-pair/key-value-pair.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V2_9_UpgradeVersionCommandModule = class V2_9_UpgradeVersionCommandModule {
};
V2_9_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _keyvaluepairentity.KeyValuePairEntity
            ]),
            _workspaceiteratormodule.WorkspaceIteratorModule
        ],
        providers: [
            _29workspacecommand1799000000000migrateaimodelpreferencescommand.MigrateAiModelPreferencesCommand
        ]
    })
], V2_9_UpgradeVersionCommandModule);

//# sourceMappingURL=2-9-upgrade-version-command.module.js.map