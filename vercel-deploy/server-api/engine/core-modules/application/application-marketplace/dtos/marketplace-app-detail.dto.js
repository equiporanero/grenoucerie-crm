"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceAppDetailDTO", {
    enumerable: true,
    get: function() {
        return MarketplaceAppDetailDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _applicationregistrationsourcetypeenum = require("../../application-registration/enums/application-registration-source-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MarketplaceAppDetailDTO = class MarketplaceAppDetailDTO {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MarketplaceAppDetailDTO.prototype, "universalIdentifier", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MarketplaceAppDetailDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MarketplaceAppDetailDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType),
    _ts_metadata("design:type", typeof _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType === "undefined" ? Object : _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType)
], MarketplaceAppDetailDTO.prototype, "sourceType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], MarketplaceAppDetailDTO.prototype, "sourcePackage", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], MarketplaceAppDetailDTO.prototype, "latestAvailableVersion", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], MarketplaceAppDetailDTO.prototype, "isListed", void 0);
_ts_decorate([
    (0, _classvalidator.IsBoolean)(),
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], MarketplaceAppDetailDTO.prototype, "isFeatured", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Manifest === "undefined" ? Object : Manifest)
], MarketplaceAppDetailDTO.prototype, "manifest", void 0);
MarketplaceAppDetailDTO = _ts_decorate([
    (0, _graphql.ObjectType)('MarketplaceAppDetail')
], MarketplaceAppDetailDTO);

//# sourceMappingURL=marketplace-app-detail.dto.js.map