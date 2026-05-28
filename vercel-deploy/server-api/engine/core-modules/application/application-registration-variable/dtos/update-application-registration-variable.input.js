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
    get UpdateApplicationRegistrationVariableInput () {
        return UpdateApplicationRegistrationVariableInput;
    },
    get UpdateApplicationRegistrationVariablePayload () {
        return UpdateApplicationRegistrationVariablePayload;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateApplicationRegistrationVariablePayload = class UpdateApplicationRegistrationVariablePayload {
};
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(10000),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateApplicationRegistrationVariablePayload.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], UpdateApplicationRegistrationVariablePayload.prototype, "resetValue", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(2000),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateApplicationRegistrationVariablePayload.prototype, "description", void 0);
UpdateApplicationRegistrationVariablePayload = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateApplicationRegistrationVariablePayload);
let UpdateApplicationRegistrationVariableInput = class UpdateApplicationRegistrationVariableInput {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], UpdateApplicationRegistrationVariableInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateApplicationRegistrationVariablePayload),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateApplicationRegistrationVariablePayload),
    _ts_metadata("design:type", typeof UpdateApplicationRegistrationVariablePayload === "undefined" ? Object : UpdateApplicationRegistrationVariablePayload)
], UpdateApplicationRegistrationVariableInput.prototype, "update", void 0);
UpdateApplicationRegistrationVariableInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateApplicationRegistrationVariableInput);

//# sourceMappingURL=update-application-registration-variable.input.js.map