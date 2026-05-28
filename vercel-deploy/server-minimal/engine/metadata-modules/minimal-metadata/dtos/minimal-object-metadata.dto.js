"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MinimalObjectMetadataDTO", {
    enumerable: true,
    get: function() {
        return MinimalObjectMetadataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
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
let MinimalObjectMetadataDTO = class MinimalObjectMetadataDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], MinimalObjectMetadataDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MinimalObjectMetadataDTO.prototype, "nameSingular", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MinimalObjectMetadataDTO.prototype, "namePlural", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MinimalObjectMetadataDTO.prototype, "labelSingular", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], MinimalObjectMetadataDTO.prototype, "labelPlural", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], MinimalObjectMetadataDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], MinimalObjectMetadataDTO.prototype, "color", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MinimalObjectMetadataDTO.prototype, "isCustom", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MinimalObjectMetadataDTO.prototype, "isActive", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MinimalObjectMetadataDTO.prototype, "isSystem", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", Boolean)
], MinimalObjectMetadataDTO.prototype, "isRemote", void 0);
MinimalObjectMetadataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('MinimalObjectMetadata')
], MinimalObjectMetadataDTO);

//# sourceMappingURL=minimal-object-metadata.dto.js.map