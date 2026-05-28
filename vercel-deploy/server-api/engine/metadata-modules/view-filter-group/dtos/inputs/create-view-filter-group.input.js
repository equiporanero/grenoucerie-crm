"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateViewFilterGroupInput", {
    enumerable: true,
    get: function() {
        return CreateViewFilterGroupInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateViewFilterGroupInput = class CreateViewFilterGroupInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateViewFilterGroupInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], CreateViewFilterGroupInput.prototype, "parentViewFilterGroupId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.ViewFilterGroupLogicalOperator, {
        nullable: true,
        defaultValue: _types.ViewFilterGroupLogicalOperator.AND
    }),
    _ts_metadata("design:type", typeof _types.ViewFilterGroupLogicalOperator === "undefined" ? Object : _types.ViewFilterGroupLogicalOperator)
], CreateViewFilterGroupInput.prototype, "logicalOperator", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], CreateViewFilterGroupInput.prototype, "positionInViewFilterGroup", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], CreateViewFilterGroupInput.prototype, "viewId", void 0);
CreateViewFilterGroupInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreateViewFilterGroupInput);

//# sourceMappingURL=create-view-filter-group.input.js.map