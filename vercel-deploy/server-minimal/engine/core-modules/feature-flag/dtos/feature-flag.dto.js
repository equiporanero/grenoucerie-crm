"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FeatureFlagDTO", {
    enumerable: true,
    get: function() {
        return FeatureFlagDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
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
let FeatureFlagDTO = class FeatureFlagDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_types.FeatureFlagKey),
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", typeof _types.FeatureFlagKey === "undefined" ? Object : _types.FeatureFlagKey)
], FeatureFlagDTO.prototype, "key", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], FeatureFlagDTO.prototype, "value", void 0);
FeatureFlagDTO = _ts_decorate([
    (0, _graphql.ObjectType)('FeatureFlag')
], FeatureFlagDTO);

//# sourceMappingURL=feature-flag.dto.js.map