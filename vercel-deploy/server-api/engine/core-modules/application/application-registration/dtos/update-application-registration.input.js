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
    get UpdateApplicationRegistrationInput () {
        return UpdateApplicationRegistrationInput;
    },
    get UpdateApplicationRegistrationPayload () {
        return UpdateApplicationRegistrationPayload;
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
let UpdateApplicationRegistrationPayload = class UpdateApplicationRegistrationPayload {
};
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MaxLength)(256),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateApplicationRegistrationPayload.prototype, "name", void 0);
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
], UpdateApplicationRegistrationPayload.prototype, "oAuthRedirectUris", void 0);
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
], UpdateApplicationRegistrationPayload.prototype, "oAuthScopes", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], UpdateApplicationRegistrationPayload.prototype, "isListed", void 0);
UpdateApplicationRegistrationPayload = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateApplicationRegistrationPayload);
let UpdateApplicationRegistrationInput = class UpdateApplicationRegistrationInput {
};
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], UpdateApplicationRegistrationInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateApplicationRegistrationPayload),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateApplicationRegistrationPayload),
    _ts_metadata("design:type", typeof UpdateApplicationRegistrationPayload === "undefined" ? Object : UpdateApplicationRegistrationPayload)
], UpdateApplicationRegistrationInput.prototype, "update", void 0);
UpdateApplicationRegistrationInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateApplicationRegistrationInput);

//# sourceMappingURL=update-application-registration.input.js.map