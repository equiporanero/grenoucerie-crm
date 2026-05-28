/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnterpriseLicenseInfoDTO", {
    enumerable: true,
    get: function() {
        return EnterpriseLicenseInfoDTO;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EnterpriseLicenseInfoDTO = class EnterpriseLicenseInfoDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], EnterpriseLicenseInfoDTO.prototype, "isValid", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EnterpriseLicenseInfoDTO.prototype, "licensee", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EnterpriseLicenseInfoDTO.prototype, "expiresAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EnterpriseLicenseInfoDTO.prototype, "subscriptionId", void 0);
EnterpriseLicenseInfoDTO = _ts_decorate([
    (0, _graphql.ObjectType)()
], EnterpriseLicenseInfoDTO);

//# sourceMappingURL=enterprise-license-info.dto.js.map