"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApprovedAccessDomainEntity", {
    enumerable: true,
    get: function() {
        return ApprovedAccessDomainEntity;
    }
});
const _graphql = require("@nestjs/graphql");
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
let ApprovedAccessDomainEntity = class ApprovedAccessDomainEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], ApprovedAccessDomainEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApprovedAccessDomainEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], ApprovedAccessDomainEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ApprovedAccessDomainEntity.prototype, "domain", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'boolean',
        default: false,
        nullable: false
    }),
    _ts_metadata("design:type", Boolean)
], ApprovedAccessDomainEntity.prototype, "isValidated", void 0);
ApprovedAccessDomainEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'approvedAccessDomain',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('ApprovedAccessDomain'),
    (0, _typeorm.Unique)('IDX_APPROVED_ACCESS_DOMAIN_DOMAIN_WORKSPACE_ID_UNIQUE', [
        'domain',
        'workspaceId'
    ])
], ApprovedAccessDomainEntity);

//# sourceMappingURL=approved-access-domain.entity.js.map