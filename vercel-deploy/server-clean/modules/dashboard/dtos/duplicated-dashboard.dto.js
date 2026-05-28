"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DuplicatedDashboardDTO", {
    enumerable: true,
    get: function() {
        return DuplicatedDashboardDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../engine/api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DuplicatedDashboardDTO = class DuplicatedDashboardDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], DuplicatedDashboardDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], DuplicatedDashboardDTO.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], DuplicatedDashboardDTO.prototype, "pageLayoutId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], DuplicatedDashboardDTO.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], DuplicatedDashboardDTO.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], DuplicatedDashboardDTO.prototype, "updatedAt", void 0);
DuplicatedDashboardDTO = _ts_decorate([
    (0, _graphql.ObjectType)('DuplicatedDashboard')
], DuplicatedDashboardDTO);

//# sourceMappingURL=duplicated-dashboard.dto.js.map