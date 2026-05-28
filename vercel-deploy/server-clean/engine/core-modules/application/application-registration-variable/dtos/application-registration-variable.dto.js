"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationVariableDTO", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationVariableDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _classvalidator = require("class-validator");
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
let ApplicationRegistrationVariableDTO = class ApplicationRegistrationVariableDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableDTO.prototype, "key", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationVariableDTO.prototype, "value", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ApplicationRegistrationVariableDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationVariableDTO.prototype, "isSecret", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationVariableDTO.prototype, "isRequired", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], ApplicationRegistrationVariableDTO.prototype, "isFilled", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationRegistrationVariableDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApplicationRegistrationVariableDTO.prototype, "updatedAt", void 0);
ApplicationRegistrationVariableDTO = _ts_decorate([
    (0, _graphql.ObjectType)()
], ApplicationRegistrationVariableDTO);

//# sourceMappingURL=application-registration-variable.dto.js.map