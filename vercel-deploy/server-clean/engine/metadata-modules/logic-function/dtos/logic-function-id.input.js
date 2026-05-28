"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionIdInput", {
    enumerable: true,
    get: function() {
        return LogicFunctionIdInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionIdInput = class LogicFunctionIdInput {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_graphql.ID, {
        description: 'The id of the function.'
    }),
    _ts_metadata("design:type", String)
], LogicFunctionIdInput.prototype, "id", void 0);
LogicFunctionIdInput = _ts_decorate([
    (0, _graphql.InputType)()
], LogicFunctionIdInput);

//# sourceMappingURL=logic-function-id.input.js.map