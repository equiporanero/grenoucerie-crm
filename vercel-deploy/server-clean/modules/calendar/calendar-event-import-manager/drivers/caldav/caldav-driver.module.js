"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalDavDriverModule", {
    enumerable: true,
    get: function() {
        return CalDavDriverModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _securehttpclientmodule = require("../../../../../engine/core-modules/secure-http-client/secure-http-client.module");
const _twentyconfigmodule = require("../../../../../engine/core-modules/twenty-config/twenty-config.module");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _caldavclientprovider = require("./providers/caldav-client.provider");
const _caldavclientservice = require("./services/caldav-client.service");
const _caldavfetcheventsservice = require("./services/caldav-fetch-events.service");
const _caldavgeteventsservice = require("./services/caldav-get-events.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalDavDriverModule = class CalDavDriverModule {
};
CalDavDriverModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _securehttpclientmodule.SecureHttpClientModule,
            _twentyconfigmodule.TwentyConfigModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity
            ])
        ],
        providers: [
            _caldavclientprovider.CalDavClientProvider,
            _caldavclientservice.CalDavClientService,
            _caldavfetcheventsservice.CalDavFetchEventsService,
            _caldavgeteventsservice.CalDavGetEventsService
        ],
        exports: [
            _caldavclientprovider.CalDavClientProvider,
            _caldavclientservice.CalDavClientService,
            _caldavfetcheventsservice.CalDavFetchEventsService,
            _caldavgeteventsservice.CalDavGetEventsService
        ]
    })
], CalDavDriverModule);

//# sourceMappingURL=caldav-driver.module.js.map