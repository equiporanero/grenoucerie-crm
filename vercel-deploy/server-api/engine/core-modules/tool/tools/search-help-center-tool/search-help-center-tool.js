"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchHelpCenterTool", {
    enumerable: true,
    get: function() {
        return SearchHelpCenterTool;
    }
});
const _common = require("@nestjs/common");
const _axios = require("axios");
const _securehttpclientservice = require("../../../secure-http-client/secure-http-client.service");
const _searchhelpcentertoolschema = require("./search-help-center-tool.schema");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SearchHelpCenterTool = class SearchHelpCenterTool {
    async execute(parameters, _context) {
        const { query } = parameters;
        try {
            const MINTLIFY_API_KEY = this.twentyConfigService.get('MINTLIFY_API_KEY');
            const MINTLIFY_SUBDOMAIN = this.twentyConfigService.get('MINTLIFY_SUBDOMAIN');
            const useDirectApi = MINTLIFY_API_KEY && MINTLIFY_SUBDOMAIN;
            const endpoint = useDirectApi ? `https://api-dsc.mintlify.com/v1/search/${MINTLIFY_SUBDOMAIN}` : 'https://twenty-help-search.com/search/twenty';
            const headers = {
                'Content-Type': 'application/json',
                ...useDirectApi && {
                    Authorization: `Bearer ${MINTLIFY_API_KEY}`
                }
            };
            const httpClient = this.secureHttpClientService.getHttpClient();
            const response = await httpClient.post(endpoint, {
                query,
                pageSize: 10
            }, {
                headers
            });
            const results = response.data;
            if (results.length === 0) {
                return {
                    success: true,
                    message: `No help center articles found for "${query}"`,
                    result: []
                };
            }
            return {
                success: true,
                message: `Found ${results.length} relevant help center article${results.length === 1 ? '' : 's'} for "${query}"`,
                result: results
            };
        } catch (error) {
            const errorDetail = (0, _axios.isAxiosError)(error) ? error.response?.data?.message || error.message : error instanceof Error ? error.message : 'Help center search failed';
            return {
                success: false,
                message: `Failed to search help center for "${query}"`,
                error: errorDetail
            };
        }
    }
    constructor(twentyConfigService, secureHttpClientService){
        this.twentyConfigService = twentyConfigService;
        this.secureHttpClientService = secureHttpClientService;
        this.description = 'Search Twenty documentation and help center to find information about features, setup, usage, and troubleshooting.';
        this.inputSchema = _searchhelpcentertoolschema.SearchHelpCenterInputZodSchema;
    }
};
SearchHelpCenterTool = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], SearchHelpCenterTool);

//# sourceMappingURL=search-help-center-tool.js.map