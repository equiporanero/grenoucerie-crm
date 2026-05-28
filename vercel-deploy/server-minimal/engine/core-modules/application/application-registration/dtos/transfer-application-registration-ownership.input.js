"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransferApplicationRegistrationOwnershipInput", {
    enumerable: true,
    get: function() {
        return TransferApplicationRegistrationOwnershipInput;
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
let TransferApplicationRegistrationOwnershipInput = class TransferApplicationRegistrationOwnershipInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], TransferApplicationRegistrationOwnershipInput.prototype, "applicationRegistrationId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], TransferApplicationRegistrationOwnershipInput.prototype, "targetWorkspaceSubdomain", void 0);
TransferApplicationRegistrationOwnershipInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], TransferApplicationRegistrationOwnershipInput);

//# sourceMappingURL=transfer-application-registration-ownership.input.js.map