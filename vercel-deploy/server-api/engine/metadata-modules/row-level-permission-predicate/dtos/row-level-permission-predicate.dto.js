/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionPredicateDTO", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionPredicateDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
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
(0, _graphql.registerEnumType)(_types.RowLevelPermissionPredicateOperand, {
    name: 'RowLevelPermissionPredicateOperand'
});
let RowLevelPermissionPredicateDTO = class RowLevelPermissionPredicateDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateDTO.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateDTO.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.RowLevelPermissionPredicateOperand),
    _ts_metadata("design:type", typeof _types.RowLevelPermissionPredicateOperand === "undefined" ? Object : _types.RowLevelPermissionPredicateOperand)
], RowLevelPermissionPredicateDTO.prototype, "operand", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateDTO.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateDTO.prototype, "workspaceMemberFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateDTO.prototype, "workspaceMemberSubFieldName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateDTO.prototype, "rowLevelPermissionPredicateGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateDTO.prototype, "positionInRowLevelPermissionPredicateGroup", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateDTO.prototype, "roleId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateDTO.prototype, "value", void 0);
RowLevelPermissionPredicateDTO = _ts_decorate([
    (0, _graphql.ObjectType)('RowLevelPermissionPredicate')
], RowLevelPermissionPredicateDTO);

//# sourceMappingURL=row-level-permission-predicate.dto.js.map