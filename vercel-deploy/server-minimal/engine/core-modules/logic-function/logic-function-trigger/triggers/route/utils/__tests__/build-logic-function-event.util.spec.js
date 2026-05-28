"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _buildlogicfunctioneventutil = require("../build-logic-function-event.util");
describe('filterRequestHeaders', ()=>{
    it('should filter headers based on allowed names', ()=>{
        const requestHeaders = {
            'content-type': 'application/json',
            authorization: 'Bearer token123',
            'x-custom-header': 'custom-value',
            'user-agent': 'test-agent'
        };
        const forwardedRequestHeaders = [
            'content-type',
            'authorization'
        ];
        const result = (0, _buildlogicfunctioneventutil.filterRequestHeaders)({
            requestHeaders,
            forwardedRequestHeaders
        });
        expect(result).toEqual({
            'content-type': 'application/json',
            authorization: 'Bearer token123'
        });
    });
    it('should handle case-insensitive header names', ()=>{
        const requestHeaders = {
            'content-type': 'application/json',
            authorization: 'Bearer token123'
        };
        const forwardedRequestHeaders = [
            'Content-Type',
            'AUTHORIZATION'
        ];
        const result = (0, _buildlogicfunctioneventutil.filterRequestHeaders)({
            requestHeaders,
            forwardedRequestHeaders
        });
        expect(result).toEqual({
            'content-type': 'application/json',
            authorization: 'Bearer token123'
        });
    });
    it('should return empty object when no headers match', ()=>{
        const requestHeaders = {
            'content-type': 'application/json'
        };
        const forwardedRequestHeaders = [
            'x-custom-header'
        ];
        const result = (0, _buildlogicfunctioneventutil.filterRequestHeaders)({
            requestHeaders,
            forwardedRequestHeaders
        });
        expect(result).toEqual({});
    });
    it('should return empty object when forwardedRequestHeaders is empty', ()=>{
        const requestHeaders = {
            'content-type': 'application/json'
        };
        const result = (0, _buildlogicfunctioneventutil.filterRequestHeaders)({
            requestHeaders,
            forwardedRequestHeaders: []
        });
        expect(result).toEqual({});
    });
    it('should convert array header values to comma-separated string', ()=>{
        const requestHeaders = {
            'x-custom-array-header': [
                'value1',
                'value2',
                'value3'
            ]
        };
        const forwardedRequestHeaders = [
            'x-custom-array-header'
        ];
        const result = (0, _buildlogicfunctioneventutil.filterRequestHeaders)({
            requestHeaders,
            forwardedRequestHeaders
        });
        expect(result).toEqual({
            'x-custom-array-header': 'value1, value2, value3'
        });
    });
    it('should skip undefined header values', ()=>{
        const requestHeaders = {
            'content-type': 'application/json',
            'x-missing': undefined
        };
        const forwardedRequestHeaders = [
            'content-type',
            'x-missing'
        ];
        const result = (0, _buildlogicfunctioneventutil.filterRequestHeaders)({
            requestHeaders,
            forwardedRequestHeaders
        });
        expect(result).toEqual({
            'content-type': 'application/json'
        });
    });
});
describe('extractBody', ()=>{
    it('should return null for undefined body', ()=>{
        const request = {
            body: undefined
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toBeNull();
    });
    it('should return null for null body', ()=>{
        const request = {
            body: null
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toBeNull();
    });
    it('should parse string body as JSON', ()=>{
        const request = {
            body: '{"key":"value"}'
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toEqual({
            key: 'value'
        });
    });
    it('should wrap non-JSON string body in raw property', ()=>{
        const request = {
            body: 'plain text body'
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toEqual({
            raw: 'plain text body'
        });
    });
    it('should return object body as-is (parsed JSON)', ()=>{
        const request = {
            body: {
                key: 'value',
                nested: {
                    foo: 'bar'
                }
            }
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toEqual({
            key: 'value',
            nested: {
                foo: 'bar'
            }
        });
    });
    it('should parse Buffer body as JSON', ()=>{
        const request = {
            body: Buffer.from('{"buffered":"json"}')
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toEqual({
            buffered: 'json'
        });
    });
    it('should wrap non-JSON Buffer body in raw property', ()=>{
        const request = {
            body: Buffer.from('buffer content')
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toEqual({
            raw: 'buffer content'
        });
    });
    it('should handle empty object body', ()=>{
        const request = {
            body: {}
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toEqual({});
    });
    it('should handle array body', ()=>{
        const request = {
            body: [
                1,
                2,
                3
            ]
        };
        const result = (0, _buildlogicfunctioneventutil.extractBody)(request);
        expect(result).toEqual([
            1,
            2,
            3
        ]);
    });
});
describe('normalizeQueryStringParameters', ()=>{
    it('should handle simple string parameters', ()=>{
        const query = {
            page: '1',
            limit: '10'
        };
        const result = (0, _buildlogicfunctioneventutil.normalizeQueryStringParameters)(query);
        expect(result).toEqual({
            page: '1',
            limit: '10'
        });
    });
    it('should join array parameters with commas', ()=>{
        const query = {
            ids: [
                '1',
                '2',
                '3'
            ]
        };
        const result = (0, _buildlogicfunctioneventutil.normalizeQueryStringParameters)(query);
        expect(result).toEqual({
            ids: '1,2,3'
        });
    });
    it('should skip undefined parameters', ()=>{
        const query = {
            page: '1',
            missing: undefined
        };
        const result = (0, _buildlogicfunctioneventutil.normalizeQueryStringParameters)(query);
        expect(result).toEqual({
            page: '1'
        });
    });
    it('should handle empty query object', ()=>{
        const query = {};
        const result = (0, _buildlogicfunctioneventutil.normalizeQueryStringParameters)(query);
        expect(result).toEqual({});
    });
    it('should stringify nested objects', ()=>{
        const query = {
            filter: {
                name: 'test'
            }
        };
        const result = (0, _buildlogicfunctioneventutil.normalizeQueryStringParameters)(query);
        expect(result).toEqual({
            filter: '{"name":"test"}'
        });
    });
    it('should filter non-string values from arrays and join with commas', ()=>{
        const query = {
            ids: [
                '1',
                undefined,
                '2'
            ]
        };
        const result = (0, _buildlogicfunctioneventutil.normalizeQueryStringParameters)(query);
        expect(result).toEqual({
            ids: '1,2'
        });
    });
});
describe('normalizePathParameters', ()=>{
    it('should handle simple string parameters', ()=>{
        const pathParams = {
            id: '123',
            slug: 'test'
        };
        const result = (0, _buildlogicfunctioneventutil.normalizePathParameters)(pathParams);
        expect(result).toEqual({
            id: '123',
            slug: 'test'
        });
    });
    it('should join array parameters with commas', ()=>{
        const pathParams = {
            ids: [
                '1',
                '2',
                '3'
            ]
        };
        const result = (0, _buildlogicfunctioneventutil.normalizePathParameters)(pathParams);
        expect(result).toEqual({
            ids: '1,2,3'
        });
    });
    it('should skip undefined parameters', ()=>{
        const pathParams = {
            id: '123',
            missing: undefined
        };
        const result = (0, _buildlogicfunctioneventutil.normalizePathParameters)(pathParams);
        expect(result).toEqual({
            id: '123'
        });
    });
    it('should handle empty object', ()=>{
        const pathParams = {};
        const result = (0, _buildlogicfunctioneventutil.normalizePathParameters)(pathParams);
        expect(result).toEqual({});
    });
});
describe('extractRawBody', ()=>{
    it('returns the raw body as utf-8 string when present', ()=>{
        const request = {
            rawBody: Buffer.from('{"a":1}', 'utf-8')
        };
        expect((0, _buildlogicfunctioneventutil.extractRawBody)(request)).toBe('{"a":1}');
    });
    it('preserves byte-exact representation, including whitespace', ()=>{
        const original = '{ "a" : 1,\n  "b": "héllo"\n}';
        const request = {
            rawBody: Buffer.from(original, 'utf-8')
        };
        expect((0, _buildlogicfunctioneventutil.extractRawBody)(request)).toBe(original);
    });
    it('returns undefined when rawBody is missing', ()=>{
        expect((0, _buildlogicfunctioneventutil.extractRawBody)({})).toBeUndefined();
    });
    it('returns empty string when rawBody is an empty buffer', ()=>{
        const request = {
            rawBody: Buffer.alloc(0)
        };
        expect((0, _buildlogicfunctioneventutil.extractRawBody)(request)).toBe('');
    });
});
describe('buildLogicFunctionEvent', ()=>{
    const createMockRequest = (overrides = {})=>({
            headers: {},
            query: {},
            body: undefined,
            method: 'GET',
            path: '/test',
            ...overrides
        });
    it('should build a complete event from Express request', ()=>{
        const request = createMockRequest({
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer token',
                'user-agent': 'test'
            },
            query: {
                page: '1'
            },
            body: {
                data: 'test'
            },
            method: 'POST',
            path: '/s/users/123'
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {
                id: '123'
            },
            forwardedRequestHeaders: [
                'content-type',
                'authorization'
            ],
            userWorkspaceId: 'uws-1'
        });
        expect(result).toEqual({
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer token'
            },
            queryStringParameters: {
                page: '1'
            },
            pathParameters: {
                id: '123'
            },
            body: {
                data: 'test'
            },
            isBase64Encoded: false,
            requestContext: {
                http: {
                    method: 'POST',
                    path: '/s/users/123'
                }
            },
            userWorkspaceId: 'uws-1'
        });
    });
    it('should preserve the request path as-is', ()=>{
        const request = createMockRequest({
            path: '/s/api/users'
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {},
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.requestContext.http.path).toBe('/s/api/users');
    });
    it('should preserve path without prefix', ()=>{
        const request = createMockRequest({
            path: '/api/users'
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {},
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.requestContext.http.path).toBe('/api/users');
    });
    it('should handle GET request with no body', ()=>{
        const request = createMockRequest({
            method: 'GET',
            query: {
                search: 'test'
            },
            body: undefined
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {},
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.body).toBeNull();
        expect(result.queryStringParameters).toEqual({
            search: 'test'
        });
    });
    it('should handle DELETE request with path parameters', ()=>{
        const request = createMockRequest({
            method: 'DELETE',
            path: '/s/users/456'
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {
                userId: '456'
            },
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.requestContext.http.method).toBe('DELETE');
        expect(result.pathParameters).toEqual({
            userId: '456'
        });
    });
    it('should filter only allowed headers', ()=>{
        const request = createMockRequest({
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer secret',
                'x-api-key': 'key123',
                cookie: 'session=abc'
            }
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {},
            forwardedRequestHeaders: [
                'x-api-key'
            ],
            userWorkspaceId: null
        });
        expect(result.headers).toEqual({
            'x-api-key': 'key123'
        });
        expect(result.headers['authorization']).toBeUndefined();
        expect(result.headers['cookie']).toBeUndefined();
    });
    it('should set isBase64Encoded to false', ()=>{
        const request = createMockRequest();
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {},
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.isBase64Encoded).toBe(false);
    });
    it('should forward rawBody when NestJS preserves it on the request', ()=>{
        const original = '{"action":"opened","number":42}';
        const request = createMockRequest({
            method: 'POST',
            body: {
                action: 'opened',
                number: 42
            }
        });
        request.rawBody = Buffer.from(original, 'utf-8');
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {},
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.rawBody).toBe(original);
        expect(result.body).toEqual({
            action: 'opened',
            number: 42
        });
    });
    it('should omit rawBody when the request has none', ()=>{
        const request = createMockRequest({
            method: 'POST',
            body: {
                data: 'test'
            }
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {},
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.rawBody).toBeUndefined();
        expect('rawBody' in result).toBe(false);
    });
    it('should handle complex path parameters', ()=>{
        const request = createMockRequest({
            path: '/s/organizations/org1/users/user1/posts'
        });
        const result = (0, _buildlogicfunctioneventutil.buildLogicFunctionEvent)({
            request,
            pathParameters: {
                orgId: 'org1',
                userId: 'user1'
            },
            forwardedRequestHeaders: [],
            userWorkspaceId: null
        });
        expect(result.pathParameters).toEqual({
            orgId: 'org1',
            userId: 'user1'
        });
    });
});

//# sourceMappingURL=build-logic-function-event.util.spec.js.map