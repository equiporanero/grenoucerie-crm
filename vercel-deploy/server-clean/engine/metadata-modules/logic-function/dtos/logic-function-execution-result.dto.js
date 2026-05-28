"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get LogicFunctionExecutionResultDTO () {
        return LogicFunctionExecutionResultDTO;
    },
    get LogicFunctionExecutionStatus () {
        return LogicFunctionExecutionStatus;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
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
var LogicFunctionExecutionStatus = /*#__PURE__*/ function(LogicFunctionExecutionStatus) {
    LogicFunctionExecutionStatus["IDLE"] = "IDLE";
    LogicFunctionExecutionStatus["SUCCESS"] = "SUCCESS";
    LogicFunctionExecutionStatus["ERROR"] = "ERROR";
    return LogicFunctionExecutionStatus;
}({});
(0, _graphql.registerEnumType)(LogicFunctionExecutionStatus, {
    name: 'LogicFunctionExecutionStatus',
    description: 'Status of the logic function execution'
});
let LogicFunctionExecutionResultDTO = class LogicFunctionExecutionResultDTO {
};
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Execution result in JSON format',
        nullable: true
    }),
    _ts_metadata("design:type", typeof JSON === "undefined" ? Object : JSON)
], LogicFunctionExecutionResultDTO.prototype, "data", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        description: 'Execution Logs'
    }),
    _ts_metadata("design:type", String)
], LogicFunctionExecutionResultDTO.prototype, "logs", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        description: 'Execution duration in milliseconds'
    }),
    _ts_metadata("design:type", Number)
], LogicFunctionExecutionResultDTO.prototype, "duration", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>LogicFunctionExecutionStatus, {
        description: 'Execution status'
    }),
    _ts_metadata("design:type", String)
], LogicFunctionExecutionResultDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        description: 'Execution error in JSON format',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], LogicFunctionExecutionResultDTO.prototype, "error", void 0);
LogicFunctionExecutionResultDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LogicFunctionExecutionResult')
], LogicFunctionExecutionResultDTO);

//# sourceMappingURL=logic-function-execution-result.dto.js.map