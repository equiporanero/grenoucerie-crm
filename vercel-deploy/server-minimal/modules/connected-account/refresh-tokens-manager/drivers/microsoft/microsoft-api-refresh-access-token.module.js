"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIRefreshAccessTokenModule", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIRefreshAccessTokenModule;
    }
});
const _common = require("@nestjs/common");
const _jwtmodule = require("../../../../../engine/core-modules/jwt/jwt.module");
const _twentyconfigmodule = require("../../../../../engine/core-modules/twenty-config/twenty-config.module");
const _microsoftapirefreshtokensservice = require("./services/microsoft-api-refresh-tokens.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MicrosoftAPIRefreshAccessTokenModule = class MicrosoftAPIRefreshAccessTokenModule {
};
MicrosoftAPIRefreshAccessTokenModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule,
            _jwtmodule.JwtModule
        ],
        providers: [
            _microsoftapirefreshtokensservice.MicrosoftAPIRefreshAccessTokenService
        ],
        exports: [
            _microsoftapirefreshtokensservice.MicrosoftAPIRefreshAccessTokenService
        ]
    })
], MicrosoftAPIRefreshAccessTokenModule);

//# sourceMappingURL=microsoft-api-refresh-access-token.module.js.map