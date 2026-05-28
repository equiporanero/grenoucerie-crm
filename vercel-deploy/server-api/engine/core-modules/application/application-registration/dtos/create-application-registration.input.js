"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateApplicationRegistrationInput", {
    enumerable: true,
    get: function() {
        return CreateApplicationRegistrationInput;
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
let CreateApplicationRegistrationInput = class CreateApplicationRegistrationInput {
};
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(256),
    _ts_metadata("design:type", String)
], CreateApplicationRegistrationInput.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateApplicationRegistrationInput.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ArrayMaxSize)(20),
    (0, _classvalidator.IsString)({
        each: true
    }),
    (0, _classvalidator.MaxLength)(2048, {
        each: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], CreateApplicationRegistrationInput.prototype, "oAuthRedirectUris", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ArrayMaxSize)(50),
    (0, _classvalidator.IsString)({
        each: true
    }),
    (0, _classvalidator.MaxLength)(256, {
        each: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], CreateApplicationRegistrationInput.prototype, "oAuthScopes", void 0);
CreateApplicationRegistrationInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateApplicationRegistrationInput);

//# sourceMappingURL=create-application-registration.input.js.map