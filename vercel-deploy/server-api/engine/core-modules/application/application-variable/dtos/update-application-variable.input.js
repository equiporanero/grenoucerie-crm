"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateApplicationVariableEntityInput", {
    enumerable: true,
    get: function() {
        return UpdateApplicationVariableEntityInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateApplicationVariableEntityInput = class UpdateApplicationVariableEntityInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpdateApplicationVariableEntityInput.prototype, "key", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpdateApplicationVariableEntityInput.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpdateApplicationVariableEntityInput.prototype, "applicationId", void 0);
UpdateApplicationVariableEntityInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], UpdateApplicationVariableEntityInput);

//# sourceMappingURL=update-application-variable.input.js.map