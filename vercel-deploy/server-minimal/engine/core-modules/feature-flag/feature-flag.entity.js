"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FeatureFlagEntity", {
    enumerable: true,
    get: function() {
        return FeatureFlagEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _workspacerelatedentity = require("../../workspace-manager/types/workspace-related-entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FeatureFlagEntity = class FeatureFlagEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], FeatureFlagEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false,
        type: 'text'
    }),
    _ts_metadata("design:type", typeof _types.FeatureFlagKey === "undefined" ? Object : _types.FeatureFlagKey)
], FeatureFlagEntity.prototype, "key", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], FeatureFlagEntity.prototype, "value", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FeatureFlagEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], FeatureFlagEntity.prototype, "updatedAt", void 0);
FeatureFlagEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'featureFlag',
        schema: 'core'
    }),
    (0, _typeorm.Unique)('IDX_FEATURE_FLAG_KEY_WORKSPACE_ID_UNIQUE', [
        'key',
        'workspaceId'
    ])
], FeatureFlagEntity);
(0, _graphql.registerEnumType)(_types.FeatureFlagKey, {
    name: 'FeatureFlagKey'
});

//# sourceMappingURL=feature-flag.entity.js.map