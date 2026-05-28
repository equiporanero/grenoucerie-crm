"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainDTO", {
    enumerable: true,
    get: function() {
        return EmailingDomainDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _emailingdomaindrivertype = require("../drivers/types/emailing-domain-driver.type");
const _emailingdomainstatustype = require("../drivers/types/emailing-domain-status.type");
const _verificationrecorddto = require("./verification-record.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_emailingdomaindrivertype.EmailingDomainDriver, {
    name: 'EmailingDomainDriver'
});
(0, _graphql.registerEnumType)(_emailingdomainstatustype.EmailingDomainStatus, {
    name: 'EmailingDomainStatus'
});
let EmailingDomainDTO = class EmailingDomainDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], EmailingDomainDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], EmailingDomainDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], EmailingDomainDTO.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], EmailingDomainDTO.prototype, "domain", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_emailingdomaindrivertype.EmailingDomainDriver),
    _ts_metadata("design:type", typeof _emailingdomaindrivertype.EmailingDomainDriver === "undefined" ? Object : _emailingdomaindrivertype.EmailingDomainDriver)
], EmailingDomainDTO.prototype, "driver", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_emailingdomainstatustype.EmailingDomainStatus),
    _ts_metadata("design:type", typeof _emailingdomainstatustype.EmailingDomainStatus === "undefined" ? Object : _emailingdomainstatustype.EmailingDomainStatus)
], EmailingDomainDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _verificationrecorddto.VerificationRecordDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EmailingDomainDTO.prototype, "verificationRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EmailingDomainDTO.prototype, "verifiedAt", void 0);
EmailingDomainDTO = _ts_decorate([
    (0, _graphql.ObjectType)('EmailingDomain')
], EmailingDomainDTO);

//# sourceMappingURL=emailing-domain.dto.js.map