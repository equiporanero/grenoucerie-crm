"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JsonRpc", {
    enumerable: true,
    get: function() {
        return JsonRpc;
    }
});
const _classvalidator = require("class-validator");
const _stringornumber = require("../decorators/string-or-number");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let JsonRpc = class JsonRpc {
    constructor(){
        this.jsonrpc = '2.0';
    }
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Matches)(/^2\.0$/, {
        message: 'jsonrpc must be exactly "2.0"'
    })
], JsonRpc.prototype, "jsonrpc", void 0);
_ts_decorate([
    (0, _classvalidator.IsDefined)({
        message: 'method is required'
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], JsonRpc.prototype, "method", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsObject)(),
    _ts_metadata("design:type", Object)
], JsonRpc.prototype, "params", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.Validate)(_stringornumber.IsNumberOrString),
    _ts_metadata("design:type", Object)
], JsonRpc.prototype, "id", void 0);

//# sourceMappingURL=json-rpc.js.map