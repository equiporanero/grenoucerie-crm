"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationConnectionsModule", {
    enumerable: true,
    get: function() {
        return ApplicationConnectionsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _connectionproviderentity = require("../connection-provider.entity");
const _applicationconnectionscontroller = require("./application-connections.controller");
const _applicationconnectionslistservice = require("./services/application-connections-list.service");
const _tokenmodule = require("../../../auth/token/token.module");
const _connectedaccountentity = require("../../../../metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../../metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _workspacecachestoragemodule = require("../../../../workspace-cache-storage/workspace-cache-storage.module");
const _connectedaccountrefreshtokensmanagermodule = require("../../../../../modules/connected-account/refresh-tokens-manager/connected-account-refresh-tokens-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationConnectionsModule = class ApplicationConnectionsModule {
};
ApplicationConnectionsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity,
                _connectionproviderentity.ConnectionProviderEntity
            ]),
            _tokenmodule.TokenModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _connectedaccountrefreshtokensmanagermodule.RefreshTokensManagerModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule
        ],
        providers: [
            _applicationconnectionslistservice.ApplicationConnectionsListService
        ],
        controllers: [
            _applicationconnectionscontroller.ApplicationConnectionsController
        ],
        exports: [
            _applicationconnectionslistservice.ApplicationConnectionsListService
        ]
    })
], ApplicationConnectionsModule);

//# sourceMappingURL=application-connections.module.js.map