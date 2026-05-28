"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountModule", {
    enumerable: true,
    get: function() {
        return ConnectedAccountModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _userworkspaceentity = require("../../engine/core-modules/user-workspace/user-workspace.entity");
const _uservarsmodule = require("../../engine/core-modules/user/user-vars/user-vars.module");
const _connectedaccountentity = require("../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _deleteworkspacememberconnectedaccountsjob = require("./jobs/delete-workspace-member-connected-accounts.job");
const _connectedaccountworkspacememberlistener = require("./listeners/connected-account-workspace-member.listener");
const _connectedaccountlistener = require("./listeners/connected-account.listener");
const _accountstoreconnectservice = require("./services/accounts-to-reconnect.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ConnectedAccountModule = class ConnectedAccountModule {
};
ConnectedAccountModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _uservarsmodule.UserVarsModule
        ],
        providers: [
            _accountstoreconnectservice.AccountsToReconnectService,
            _connectedaccountlistener.ConnectedAccountListener,
            _deleteworkspacememberconnectedaccountsjob.DeleteWorkspaceMemberConnectedAccountsCleanupJob,
            _connectedaccountworkspacememberlistener.ConnectedAccountWorkspaceMemberListener
        ],
        exports: [
            _accountstoreconnectservice.AccountsToReconnectService
        ]
    })
], ConnectedAccountModule);

//# sourceMappingURL=connected-account.module.js.map