"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HttpTool", {
    enumerable: true,
    get: function() {
        return HttpTool;
    }
});
const _common = require("@nestjs/common");
const _axios = require("axios");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _securehttpclientservice = require("../../../secure-http-client/secure-http-client.service");
const _httptoolschema = require("./http-tool.schema");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let HttpTool = class HttpTool {
    async execute(parameters, context) {
        const { url, method, headers, body } = parameters;
        const headersCopy = {
            ...headers
        };
        const isMethodForBody = [
            'POST',
            'PUT',
            'PATCH'
        ].includes(method);
        try {
            const axiosConfig = {
                url,
                method: method,
                headers: headersCopy
            };
            if (isMethodForBody && body) {
                const contentType = headers?.['content-type'];
                axiosConfig.data = (0, _workflow.parseDataFromContentType)(body, contentType);
                if ((0, _utils.isDefined)(headersCopy) && contentType === 'multipart/form-data') {
                    delete headersCopy['content-type'];
                }
            }
            const axiosClient = this.secureHttpClientService.getHttpClient(undefined, {
                workspaceId: context.workspaceId,
                userId: context.userId,
                source: 'workflow-http'
            });
            const response = await axiosClient(axiosConfig);
            return {
                success: true,
                message: `HTTP ${method} request to ${url} completed successfully`,
                result: response.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            };
        } catch (error) {
            if ((0, _axios.isAxiosError)(error)) {
                return {
                    success: false,
                    message: `HTTP ${method} request to ${url} failed`,
                    error: error.response?.data || error.message || 'HTTP request failed'
                };
            }
            return {
                success: false,
                message: `HTTP ${method} request to ${url} failed`,
                error: error instanceof Error ? error.message : 'HTTP request failed'
            };
        }
    }
    constructor(secureHttpClientService){
        this.secureHttpClientService = secureHttpClientService;
        this.description = 'Make an HTTP request to any URL with configurable method, headers, and body.';
        this.inputSchema = _httptoolschema.HttpRequestInputZodSchema;
    }
};
HttpTool = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], HttpTool);

//# sourceMappingURL=http-tool.js.map