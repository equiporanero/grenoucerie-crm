"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainEntity", {
    enumerable: true,
    get: function() {
        return EmailingDomainEntity;
    }
});
const _graphql = require("@nestjs/graphql");
const _typeorm = require("typeorm");
const _emailingdomaindrivertype = require("./drivers/types/emailing-domain-driver.type");
const _emailingdomainstatustype = require("./drivers/types/emailing-domain-status.type");
const _emailingdomaintenantstatustype = require("./drivers/types/emailing-domain-tenant-status.type");
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
let EmailingDomainEntity = class EmailingDomainEntity extends _workspacerelatedentity.WorkspaceRelatedEntity {
};
_ts_decorate([
    (0, _typeorm.PrimaryGeneratedColumn)('uuid'),
    _ts_metadata("design:type", String)
], EmailingDomainEntity.prototype, "id", void 0);
_ts_decorate([
    (0, _typeorm.CreateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], EmailingDomainEntity.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _typeorm.UpdateDateColumn)({
        type: 'timestamptz'
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], EmailingDomainEntity.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'varchar',
        nullable: false
    }),
    _ts_metadata("design:type", String)
], EmailingDomainEntity.prototype, "domain", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_emailingdomaindrivertype.EmailingDomainDriver),
        nullable: false
    }),
    _ts_metadata("design:type", typeof _emailingdomaindrivertype.EmailingDomainDriver === "undefined" ? Object : _emailingdomaindrivertype.EmailingDomainDriver)
], EmailingDomainEntity.prototype, "driver", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_emailingdomainstatustype.EmailingDomainStatus),
        default: _emailingdomainstatustype.EmailingDomainStatus.PENDING,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _emailingdomainstatustype.EmailingDomainStatus === "undefined" ? Object : _emailingdomainstatustype.EmailingDomainStatus)
], EmailingDomainEntity.prototype, "status", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'jsonb',
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], EmailingDomainEntity.prototype, "verificationRecords", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'timestamptz',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EmailingDomainEntity.prototype, "verifiedAt", void 0);
_ts_decorate([
    (0, _typeorm.Column)({
        type: 'enum',
        enum: Object.values(_emailingdomaintenantstatustype.EmailingDomainTenantStatus),
        default: _emailingdomaintenantstatustype.EmailingDomainTenantStatus.ACTIVE,
        nullable: false
    }),
    _ts_metadata("design:type", typeof _emailingdomaintenantstatustype.EmailingDomainTenantStatus === "undefined" ? Object : _emailingdomaintenantstatustype.EmailingDomainTenantStatus)
], EmailingDomainEntity.prototype, "tenantStatus", void 0);
EmailingDomainEntity = _ts_decorate([
    (0, _typeorm.Entity)({
        name: 'emailingDomain',
        schema: 'core'
    }),
    (0, _graphql.ObjectType)('EmailingDomain'),
    (0, _typeorm.Unique)('IDX_EMAILING_DOMAIN_DOMAIN_UNIQUE', [
        'domain'
    ])
], EmailingDomainEntity);

//# sourceMappingURL=emailing-domain.entity.js.map