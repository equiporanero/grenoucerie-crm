"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TestHttpRequestDTO", {
    enumerable: true,
    get: function() {
        return TestHttpRequestDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
let TestHttpRequestDTO = class TestHttpRequestDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        description: 'Whether the request was successful'
    }),
    _ts_metadata("design:type", Boolean)
], TestHttpRequestDTO.prototype, "success", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Message describing the result'
    }),
    _ts_metadata("design:type", String)
], TestHttpRequestDTO.prototype, "message", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Response data',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], TestHttpRequestDTO.prototype, "result", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Error information',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], TestHttpRequestDTO.prototype, "error", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        description: 'HTTP status code',
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], TestHttpRequestDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'HTTP status text',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], TestHttpRequestDTO.prototype, "statusText", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Response headers',
        nullable: true
    }),
    _ts_metadata("design:type", typeof Record === "undefined" ? Object : Record)
], TestHttpRequestDTO.prototype, "headers", void 0);
TestHttpRequestDTO = _ts_decorate([
    (0, _graphql.ObjectType)('TestHttpRequest')
], TestHttpRequestDTO);

//# sourceMappingURL=test-http-request.dto.js.map