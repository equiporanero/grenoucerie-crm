"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SendInvitationsInput", {
    enumerable: true,
    get: function() {
        return SendInvitationsInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SendInvitationsInput = class SendInvitationsInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsEmail)({}, {
        each: true
    }),
    (0, _classvalidator.ArrayUnique)(),
    _ts_metadata("design:type", Array)
], SendInvitationsInput.prototype, "emails", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", Object)
], SendInvitationsInput.prototype, "roleId", void 0);
SendInvitationsInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], SendInvitationsInput);

//# sourceMappingURL=send-invitations.input.js.map