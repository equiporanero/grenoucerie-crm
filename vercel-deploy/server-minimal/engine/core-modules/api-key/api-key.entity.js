"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiKeyEntity", {
    enumerable: true,
    get: function() {
        return ApiKeyEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _typeorm = require("typeorm");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
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
let ApiKeyEntity = class ApiKeyEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ApiKeyEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _typeorm.Column)(),
    _ts_metadata("design:type", String)
], ApiKeyEntity.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    (0, _typeorm.Column)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApiKeyEntity.prototype, "expiresAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApiKeyEntity.prototype, "revokedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApiKeyEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApiKeyEntity.prototype, "updatedAt", void 0);
ApiKeyEntity = _ts_decorate([
    (0, _typeorm.Index)('IDX_API_KEY_WORKSPACE_ID', [
        'workspaceId'
    ]),
    (0, _typeorm.Entity)({
        name: 'apiKey',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('ApiKey')
], ApiKeyEntity);

//# sourceMappingURL=api-key.entity.js.map