"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectRecordFilterInput", {
    enumerable: true,
    get: function() {
        return ObjectRecordFilterInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
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
let ObjectRecordFilterInput = class ObjectRecordFilterInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            ObjectRecordFilterInput
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    _ts_metadata("design:type", Array)
], ObjectRecordFilterInput.prototype, "and", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>ObjectRecordFilterInput, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], ObjectRecordFilterInput.prototype, "not", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            ObjectRecordFilterInput
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsArray)(),
    _ts_metadata("design:type", Array)
], ObjectRecordFilterInput.prototype, "or", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>UUIDFilterType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], ObjectRecordFilterInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>DateTimeFilterType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectRecordFilterInput.prototype, "createdAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>DateTimeFilterType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectRecordFilterInput.prototype, "updatedAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>DateTimeFilterType, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ObjectRecordFilterInput.prototype, "deletedAt", void 0);
ObjectRecordFilterInput = _ts_decorate([
    (0, _graphql.InputType)()
], ObjectRecordFilterInput);
let UUIDFilterType = class UUIDFilterType {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UUIDFilterType.prototype, "eq", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UUIDFilterType.prototype, "gt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UUIDFilterType.prototype, "gte", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _scalars.UUIDScalarType
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], UUIDFilterType.prototype, "in", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UUIDFilterType.prototype, "lt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UUIDFilterType.prototype, "lte", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UUIDFilterType.prototype, "neq", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>FilterIs, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UUIDFilterType.prototype, "is", void 0);
UUIDFilterType = _ts_decorate([
    (0, _graphql.InputType)('UUIDFilter')
], UUIDFilterType);
let DateTimeFilterType = class DateTimeFilterType {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DateTimeFilterType.prototype, "eq", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DateTimeFilterType.prototype, "gt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DateTimeFilterType.prototype, "gte", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _graphql.GraphQLISODateTime
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], DateTimeFilterType.prototype, "in", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DateTimeFilterType.prototype, "lt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DateTimeFilterType.prototype, "lte", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.GraphQLISODateTime, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DateTimeFilterType.prototype, "neq", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>FilterIs, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], DateTimeFilterType.prototype, "is", void 0);
DateTimeFilterType = _ts_decorate([
    (0, _graphql.InputType)('DateTimeFilter')
], DateTimeFilterType);
var FilterIs = /*#__PURE__*/ function(FilterIs) {
    FilterIs["NotNull"] = "NOT_NULL";
    FilterIs["Null"] = "NULL";
    return FilterIs;
}(FilterIs || {});
(0, _graphql.registerEnumType)(FilterIs, {
    name: 'FilterIs'
});

//# sourceMappingURL=object-record-filter-input.js.map