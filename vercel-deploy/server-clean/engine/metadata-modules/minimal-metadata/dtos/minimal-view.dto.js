"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MinimalViewDTO", {
    enumerable: true,
    get: function() {
        return MinimalViewDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MinimalViewDTO = class MinimalViewDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], MinimalViewDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewType),
    _ts_metadata("design:type", typeof _types.ViewType === "undefined" ? Object : _types.ViewType)
], MinimalViewDTO.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewKey, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], MinimalViewDTO.prototype, "key", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], MinimalViewDTO.prototype, "objectMetadataId", void 0);
MinimalViewDTO = _ts_decorate([
    (0, _graphql.ObjectType)('MinimalView')
], MinimalViewDTO);

//# sourceMappingURL=minimal-view.dto.js.map