"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateLabPublicFeatureFlagInput", {
    enumerable: true,
    get: function() {
        return UpdateLabPublicFeatureFlagInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateLabPublicFeatureFlagInput = class UpdateLabPublicFeatureFlagInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.FeatureFlagKey === "undefined" ? Object : _types.FeatureFlagKey)
], UpdateLabPublicFeatureFlagInput.prototype, "publicFeatureFlag", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], UpdateLabPublicFeatureFlagInput.prototype, "value", void 0);
UpdateLabPublicFeatureFlagInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateLabPublicFeatureFlagInput);

//# sourceMappingURL=update-lab-public-feature-flag.input.js.map