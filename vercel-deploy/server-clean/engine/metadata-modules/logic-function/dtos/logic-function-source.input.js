"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionSourceInput", {
    enumerable: true,
    get: function() {
        return LogicFunctionSourceInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _handlercontant = require("../constants/handler.contant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionSourceInput = class LogicFunctionSourceInput {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionSourceInput.prototype, "sourceHandlerCode", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.Matches)(_handlercontant.HANDLER_NAME_REGEX, {
        message: 'handlerName must be a valid JavaScript identifier or dotted path'
    }),
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], LogicFunctionSourceInput.prototype, "handlerName", void 0);
LogicFunctionSourceInput = _ts_decorate([
    (0, _graphql.InputType)()
], LogicFunctionSourceInput);

//# sourceMappingURL=logic-function-source.input.js.map