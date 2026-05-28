/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionPredicateGroupDTO", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionPredicateGroupDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
(0, _graphql.registerEnumType)(_types.RowLevelPermissionPredicateGroupLogicalOperator, {
    name: 'RowLevelPermissionPredicateGroupLogicalOperator'
});
let RowLevelPermissionPredicateGroupDTO = class RowLevelPermissionPredicateGroupDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupDTO.prototype, "parentRowLevelPermissionPredicateGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.RowLevelPermissionPredicateGroupLogicalOperator),
    _ts_metadata("design:type", typeof _types.RowLevelPermissionPredicateGroupLogicalOperator === "undefined" ? Object : _types.RowLevelPermissionPredicateGroupLogicalOperator)
], RowLevelPermissionPredicateGroupDTO.prototype, "logicalOperator", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupDTO.prototype, "positionInRowLevelPermissionPredicateGroup", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupDTO.prototype, "roleId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupDTO.prototype, "objectMetadataId", void 0);
RowLevelPermissionPredicateGroupDTO = _ts_decorate([
    (0, _graphql.ObjectType)('RowLevelPermissionPredicateGroup')
], RowLevelPermissionPredicateGroupDTO);

//# sourceMappingURL=row-level-permission-predicate-group.dto.js.map