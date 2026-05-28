"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionDTO", {
    enumerable: true,
    get: function() {
        return LogicFunctionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _application = require("twenty-shared/application");
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
let LogicFunctionDTO = class LogicFunctionDTO {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "runtime", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Number)
], LogicFunctionDTO.prototype, "timeoutSeconds", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "sourceHandlerPath", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "handlerName", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _application.CronTriggerSettings === "undefined" ? Object : _application.CronTriggerSettings)
], LogicFunctionDTO.prototype, "cronTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _application.DatabaseEventTriggerSettings === "undefined" ? Object : _application.DatabaseEventTriggerSettings)
], LogicFunctionDTO.prototype, "databaseEventTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _application.HttpRouteTriggerSettings === "undefined" ? Object : _application.HttpRouteTriggerSettings)
], LogicFunctionDTO.prototype, "httpRouteTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _application.ToolTriggerSettings === "undefined" ? Object : _application.ToolTriggerSettings)
], LogicFunctionDTO.prototype, "toolTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _application.WorkflowActionTriggerSettings === "undefined" ? Object : _application.WorkflowActionTriggerSettings)
], LogicFunctionDTO.prototype, "workflowActionTriggerSettings", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.HideField)(),
    _ts_metadata("design:type", String)
], LogicFunctionDTO.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LogicFunctionDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _classvalidator.IsDateString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], LogicFunctionDTO.prototype, "updatedAt", void 0);
LogicFunctionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LogicFunction'),
    (0, _nestjsquerygraphql.Authorize)({
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        authorize: (context)=>({
                workspaceId: {
                    eq: context?.req?.workspace?.id
                }
            })
    }),
    (0, _nestjsquerygraphql.QueryOptions)({
        defaultResultSize: 10,
        maxResultsSize: 1000
    })
], LogicFunctionDTO);

//# sourceMappingURL=logic-function.dto.js.map