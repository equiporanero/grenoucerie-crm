"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationSummaryDTO", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationSummaryDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _applicationregistrationsourcetypeenum = require("../enums/application-registration-source-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApplicationRegistrationSummaryDTO = class ApplicationRegistrationSummaryDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], ApplicationRegistrationSummaryDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ApplicationRegistrationSummaryDTO.prototype, "latestAvailableVersion", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType),
    _ts_metadata("design:type", typeof _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType === "undefined" ? Object : _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType)
], ApplicationRegistrationSummaryDTO.prototype, "sourceType", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ApplicationRegistrationSummaryDTO.prototype, "logoUrl", void 0);
ApplicationRegistrationSummaryDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ApplicationRegistrationSummary')
], ApplicationRegistrationSummaryDTO);

//# sourceMappingURL=application-registration-summary.dto.js.map