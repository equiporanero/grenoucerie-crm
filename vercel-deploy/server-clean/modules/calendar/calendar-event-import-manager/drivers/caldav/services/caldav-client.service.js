"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalDavClientService", {
    enumerable: true,
    get: function() {
        return CalDavClientService;
    }
});
const _common = require("@nestjs/common");
const _tsdav = require("tsdav");
const _securehttpclientservice = require("../../../../../../engine/core-modules/secure-http-client/secure-http-client.service");
const _createbasicdigestauthfetch = require("../lib/auth/create-basic-digest-auth-fetch");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CalDavClientService = class CalDavClientService {
    async getClient(input) {
        const ssrfSafeFetch = this.secureHttpClientService.createSsrfSafeFetch();
        const fetch = (0, _createbasicdigestauthfetch.createBasicDigestAuthFetch)(input.username, input.password, ssrfSafeFetch);
        const client = new _tsdav.DAVClient({
            serverUrl: input.serverUrl,
            credentials: {
                username: input.username,
                password: input.password
            },
            authMethod: 'Custom',
            // our fetch handles Basic+Digest itself; no-op authFunction so tsdav doesn't add its own header on top
            authFunction: async ()=>({}),
            defaultAccountType: 'caldav',
            fetch
        });
        await client.login();
        return client;
    }
    constructor(secureHttpClientService){
        this.secureHttpClientService = secureHttpClientService;
    }
};
CalDavClientService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], CalDavClientService);

//# sourceMappingURL=caldav-client.service.js.map