"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SendEmailViaDomainInput", {
    enumerable: true,
    get: function() {
        return SendEmailViaDomainInput;
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
let SendEmailViaDomainInput = class SendEmailViaDomainInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SendEmailViaDomainInput.prototype, "emailingDomainId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ArrayMinSize)(1),
    (0, _classvalidator.IsEmail)({}, {
        each: true
    }),
    _ts_metadata("design:type", Array)
], SendEmailViaDomainInput.prototype, "to", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsEmail)({}, {
        each: true
    }),
    _ts_metadata("design:type", Array)
], SendEmailViaDomainInput.prototype, "cc", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsEmail)({}, {
        each: true
    }),
    _ts_metadata("design:type", Array)
], SendEmailViaDomainInput.prototype, "bcc", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.MinLength)(1),
    _ts_metadata("design:type", String)
], SendEmailViaDomainInput.prototype, "subject", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SendEmailViaDomainInput.prototype, "text", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], SendEmailViaDomainInput.prototype, "html", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsEmail)(),
    _ts_metadata("design:type", String)
], SendEmailViaDomainInput.prototype, "from", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsEmail)({}, {
        each: true
    }),
    _ts_metadata("design:type", Array)
], SendEmailViaDomainInput.prototype, "replyTo", void 0);
SendEmailViaDomainInput = _ts_decorate([
    (0, _graphql.InputType)()
], SendEmailViaDomainInput);

//# sourceMappingURL=send-email-via-domain.input.js.map