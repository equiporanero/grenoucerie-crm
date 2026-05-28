"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateApplicationRegistrationVariableInput", {
    enumerable: true,
    get: function() {
        return CreateApplicationRegistrationVariableInput;
    }
});
const _graphql = require("@nestjs/graphql");
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
let CreateApplicationRegistrationVariableInput = class CreateApplicationRegistrationVariableInput {
};
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], CreateApplicationRegistrationVariableInput.prototype, "applicationRegistrationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(256),
    _ts_metadata("design:type", String)
], CreateApplicationRegistrationVariableInput.prototype, "key", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(10000),
    _ts_metadata("design:type", String)
], CreateApplicationRegistrationVariableInput.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(2000),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateApplicationRegistrationVariableInput.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], CreateApplicationRegistrationVariableInput.prototype, "isSecret", void 0);
CreateApplicationRegistrationVariableInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateApplicationRegistrationVariableInput);

//# sourceMappingURL=create-application-registration-variable.input.js.map