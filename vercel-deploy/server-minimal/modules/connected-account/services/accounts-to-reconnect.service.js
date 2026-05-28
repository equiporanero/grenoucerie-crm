"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccountsToReconnectService", {
    enumerable: true,
    get: function() {
        return AccountsToReconnectService;
    }
});
const _common = require("@nestjs/common");
const _uservarsservice = require("../../../engine/core-modules/user/user-vars/services/user-vars.service");
const _accountstoreconnectkeyvaluetype = require("../types/accounts-to-reconnect-key-value.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AccountsToReconnectService = class AccountsToReconnectService {
    async removeAccountToReconnect(userId, workspaceId, connectedAccountId) {
        for (const key of Object.values(_accountstoreconnectkeyvaluetype.AccountsToReconnectKeys)){
            await this.removeAccountToReconnectByKey(key, userId, workspaceId, connectedAccountId);
        }
    }
    async removeAccountToReconnectByKey(key, userId, workspaceId, connectedAccountId) {
        const accountsToReconnect = await this.userVarsService.get({
            userId,
            workspaceId,
            key
        });
        if (!accountsToReconnect) {
            return;
        }
        const updatedAccountsToReconnect = accountsToReconnect.filter((id)=>id !== connectedAccountId);
        if (updatedAccountsToReconnect.length === 0) {
            await this.userVarsService.delete({
                userId,
                workspaceId,
                key
            });
            return;
        }
        await this.userVarsService.set({
            userId,
            workspaceId,
            key,
            value: updatedAccountsToReconnect
        });
    }
    async addAccountToReconnectByKey(key, userId, workspaceId, connectedAccountId) {
        const accountsToReconnect = await this.userVarsService.get({
            userId,
            workspaceId,
            key
        }) ?? [];
        if (accountsToReconnect.includes(connectedAccountId)) {
            return;
        }
        accountsToReconnect.push(connectedAccountId);
        await this.userVarsService.set({
            userId,
            workspaceId,
            key,
            value: accountsToReconnect
        });
    }
    constructor(userVarsService){
        this.userVarsService = userVarsService;
    }
};
AccountsToReconnectService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _uservarsservice.UserVarsService === "undefined" ? Object : _uservarsservice.UserVarsService
    ])
], AccountsToReconnectService);

//# sourceMappingURL=accounts-to-reconnect.service.js.map