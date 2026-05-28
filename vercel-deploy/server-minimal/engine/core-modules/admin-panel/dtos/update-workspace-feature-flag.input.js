"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateWorkspaceFeatureFlagInput", {
    enumerable: true,
    get: function() {
        return UpdateWorkspaceFeatureFlagInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
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
let UpdateWorkspaceFeatureFlagInput = class UpdateWorkspaceFeatureFlagInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], UpdateWorkspaceFeatureFlagInput.prototype, "workspaceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.FeatureFlagKey === "undefined" ? Object : _types.FeatureFlagKey)
], UpdateWorkspaceFeatureFlagInput.prototype, "featureFlag", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], UpdateWorkspaceFeatureFlagInput.prototype, "value", void 0);
UpdateWorkspaceFeatureFlagInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], UpdateWorkspaceFeatureFlagInput);

//# sourceMappingURL=update-workspace-feature-flag.input.js.map