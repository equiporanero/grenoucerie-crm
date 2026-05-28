"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectPermissionDTO", {
    enumerable: true,
    get: function() {
        return ObjectPermissionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _rowlevelpermissionpredicategroupdto = require("../../row-level-permission-predicate/dtos/row-level-permission-predicate-group.dto");
const _rowlevelpermissionpredicatedto = require("../../row-level-permission-predicate/dtos/row-level-permission-predicate.dto");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectPermissionDTO = class ObjectPermissionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], ObjectPermissionDTO.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionDTO.prototype, "canReadObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionDTO.prototype, "canUpdateObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionDTO.prototype, "canSoftDeleteObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Boolean)
], ObjectPermissionDTO.prototype, "canDestroyObjectRecords", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.RestrictedFieldsPermissions === "undefined" ? Object : _types.RestrictedFieldsPermissions)
], ObjectPermissionDTO.prototype, "restrictedFields", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _rowlevelpermissionpredicatedto.RowLevelPermissionPredicateDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], ObjectPermissionDTO.prototype, "rowLevelPermissionPredicates", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _rowlevelpermissionpredicategroupdto.RowLevelPermissionPredicateGroupDTO
        ], {
        nullable: true
    }),
    _ts_metadata("design:type", Array)
], ObjectPermissionDTO.prototype, "rowLevelPermissionPredicateGroups", void 0);
ObjectPermissionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ObjectPermission')
], ObjectPermissionDTO);

//# sourceMappingURL=object-permission.dto.js.map