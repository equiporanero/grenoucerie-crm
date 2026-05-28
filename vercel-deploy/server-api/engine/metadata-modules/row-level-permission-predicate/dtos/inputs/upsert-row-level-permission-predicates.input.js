/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get RowLevelPermissionPredicateGroupInput () {
        return RowLevelPermissionPredicateGroupInput;
    },
    get RowLevelPermissionPredicateInput () {
        return RowLevelPermissionPredicateInput;
    },
    get UpsertRowLevelPermissionPredicatesInput () {
        return UpsertRowLevelPermissionPredicatesInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _types = require("twenty-shared/types");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
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
let RowLevelPermissionPredicateInput = class RowLevelPermissionPredicateInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateInput.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.RowLevelPermissionPredicateOperand),
    _ts_metadata("design:type", typeof _types.RowLevelPermissionPredicateOperand === "undefined" ? Object : _types.RowLevelPermissionPredicateOperand)
], RowLevelPermissionPredicateInput.prototype, "operand", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateInput.prototype, "value", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateInput.prototype, "subFieldName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateInput.prototype, "workspaceMemberFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateInput.prototype, "workspaceMemberSubFieldName", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateInput.prototype, "rowLevelPermissionPredicateGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateInput.prototype, "positionInRowLevelPermissionPredicateGroup", void 0);
RowLevelPermissionPredicateInput = _ts_decorate([
    (0, _graphql.InputType)()
], RowLevelPermissionPredicateInput);
let RowLevelPermissionPredicateGroupInput = class RowLevelPermissionPredicateGroupInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], RowLevelPermissionPredicateGroupInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupInput.prototype, "parentRowLevelPermissionPredicateGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.RowLevelPermissionPredicateGroupLogicalOperator),
    _ts_metadata("design:type", typeof _types.RowLevelPermissionPredicateGroupLogicalOperator === "undefined" ? Object : _types.RowLevelPermissionPredicateGroupLogicalOperator)
], RowLevelPermissionPredicateGroupInput.prototype, "logicalOperator", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], RowLevelPermissionPredicateGroupInput.prototype, "positionInRowLevelPermissionPredicateGroup", void 0);
RowLevelPermissionPredicateGroupInput = _ts_decorate([
    (0, _graphql.InputType)()
], RowLevelPermissionPredicateGroupInput);
let UpsertRowLevelPermissionPredicatesInput = class UpsertRowLevelPermissionPredicatesInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpsertRowLevelPermissionPredicatesInput.prototype, "roleId", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], UpsertRowLevelPermissionPredicatesInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>RowLevelPermissionPredicateInput),
    (0, _graphql.Field)(()=>[
            RowLevelPermissionPredicateInput
        ]),
    _ts_metadata("design:type", Array)
], UpsertRowLevelPermissionPredicatesInput.prototype, "predicates", void 0);
_ts_decorate([
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>RowLevelPermissionPredicateGroupInput),
    (0, _graphql.Field)(()=>[
            RowLevelPermissionPredicateGroupInput
        ]),
    _ts_metadata("design:type", Array)
], UpsertRowLevelPermissionPredicatesInput.prototype, "predicateGroups", void 0);
UpsertRowLevelPermissionPredicatesInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpsertRowLevelPermissionPredicatesInput);

//# sourceMappingURL=upsert-row-level-permission-predicates.input.js.map