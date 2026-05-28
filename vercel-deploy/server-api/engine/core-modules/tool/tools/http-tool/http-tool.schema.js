"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HttpRequestInputZodSchema", {
    enumerable: true,
    get: function() {
        return HttpRequestInputZodSchema;
    }
});
const _zod = require("zod");
const HttpRequestInputZodSchema = _zod.z.object({
    url: _zod.z.string().url().refine((value)=>{
        const protocol = new URL(value).protocol;
        return protocol === 'http:' || protocol === 'https:';
    }, {
        message: 'Only HTTP and HTTPS URLs are allowed'
    }).describe('The URL to make the request to (HTTP or HTTPS only)'),
    method: _zod.z.enum([
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE'
    ]).describe('The HTTP method to use'),
    headers: _zod.z.record(_zod.z.string(), _zod.z.string()).optional().describe('HTTP headers to include in the request'),
    body: _zod.z.any().optional().describe('Request body for POST, PUT, PATCH requests')
});

//# sourceMappingURL=http-tool.schema.js.map