"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelVersionService", {
    enumerable: true,
    get: function() {
        return AdminPanelVersionService;
    }
});
const _common = require("@nestjs/common");
const _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
const _zod = /*#__PURE__*/ _interop_require_wildcard(require("zod"));
const _securehttpclientservice = require("../../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelVersionService = class AdminPanelVersionService {
    async getVersionInfo() {
        const currentVersion = this.twentyConfigService.get('APP_VERSION');
        try {
            const httpClient = this.secureHttpClientService.getHttpClient();
            const rawResponse = await httpClient.get('https://hub.docker.com/v2/repositories/twentycrm/twenty/tags?page_size=100');
            const response = _zod.object({
                data: _zod.object({
                    results: _zod.array(_zod.object({
                        name: _zod.string()
                    }))
                })
            }).parse(rawResponse);
            const versions = response.data.results.map((tag)=>tag.name).filter((name)=>name !== 'latest' && _semver.default.valid(name));
            if (versions.length === 0) {
                return {
                    currentVersion,
                    latestVersion: 'latest'
                };
            }
            versions.sort((a, b)=>_semver.default.compare(b, a));
            const latestVersion = versions[0];
            return {
                currentVersion,
                latestVersion
            };
        } catch  {
            return {
                currentVersion,
                latestVersion: 'latest'
            };
        }
    }
    constructor(twentyConfigService, secureHttpClientService){
        this.twentyConfigService = twentyConfigService;
        this.secureHttpClientService = secureHttpClientService;
    }
};
AdminPanelVersionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], AdminPanelVersionService);

//# sourceMappingURL=admin-panel-version.service.js.map