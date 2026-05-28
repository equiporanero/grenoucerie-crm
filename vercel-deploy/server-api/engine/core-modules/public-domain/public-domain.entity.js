"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PublicDomainEntity", {
    enumerable: true,
    get: function() {
        return PublicDomainEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _applicationentity = require("../application/application.entity");
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
let PublicDomainEntity = class PublicDomainEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], PublicDomainEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PublicDomainEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PublicDomainEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false,
        unique: true
    }),
    _ts_metadata("design:type", String)
], PublicDomainEntity.prototype, "domain", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        default: false,
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], PublicDomainEntity.prototype, "isValidated", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'uuid',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PublicDomainEntity.prototype, "applicationId", void 0);
_ts_decorate([
    (0, _typeorm.ManyToOne)(()=>_applicationentity.ApplicationEntity, {
        onDelete: 'CASCADE',
        nullable: true
    }),
    (0, _typeorm.JoinColumn)({
        name: 'applicationId'
    }),
    _ts_metadata("design:type", Object)
], PublicDomainEntity.prototype, "application", void 0);
PublicDomainEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'publicDomain',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('PublicDomain'),
    (0, _typeorm.Index)('IDX_PUBLIC_DOMAIN_APPLICATION_ID', [
        'applicationId'
    ])
], PublicDomainEntity);

//# sourceMappingURL=public-domain.entity.js.map