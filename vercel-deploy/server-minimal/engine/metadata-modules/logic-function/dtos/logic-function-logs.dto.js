"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionLogsDTO", {
    enumerable: true,
    get: function() {
        return LogicFunctionLogsDTO;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LogicFunctionLogsDTO = class LogicFunctionLogsDTO {
};
_ts_decorate([
    (0, _graphql.Field)({
        description: 'Execution Logs'
    }),
    _ts_metadata("design:type", String)
], LogicFunctionLogsDTO.prototype, "logs", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], LogicFunctionLogsDTO.prototype, "applicationUniversalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], LogicFunctionLogsDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], LogicFunctionLogsDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], LogicFunctionLogsDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], LogicFunctionLogsDTO.prototype, "universalIdentifier", void 0);
LogicFunctionLogsDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LogicFunctionLogs')
], LogicFunctionLogsDTO);

//# sourceMappingURL=logic-function-logs.dto.js.map