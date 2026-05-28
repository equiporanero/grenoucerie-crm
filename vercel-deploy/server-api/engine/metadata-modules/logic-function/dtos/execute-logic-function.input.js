"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExecuteOneLogicFunctionInput", {
    enumerable: true,
    get: function() {
        return ExecuteOneLogicFunctionInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
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
let ExecuteOneLogicFunctionInput = class ExecuteOneLogicFunctionInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'Id of the logic function to execute'
    }),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], ExecuteOneLogicFunctionInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Payload in JSON format'
    }),
    (0, _classvalidator.IsObject)(),
    _ts_metadata("design:type", typeof JSON === "undefined" ? Object : JSON)
], ExecuteOneLogicFunctionInput.prototype, "payload", void 0);
ExecuteOneLogicFunctionInput = _ts_decorate([
    (0, _graphql.InputType)()
], ExecuteOneLogicFunctionInput);

//# sourceMappingURL=execute-logic-function.input.js.map