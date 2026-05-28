"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpsertViewWidgetViewSortInput", {
    enumerable: true,
    get: function() {
        return UpsertViewWidgetViewSortInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
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
let UpsertViewWidgetViewSortInput = class UpsertViewWidgetViewSortInput {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetViewSortInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], UpsertViewWidgetViewSortInput.prototype, "fieldMetadataId", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewSortDirection),
    (0, _graphql.Field)(()=>_types.ViewSortDirection, {
        nullable: true,
        defaultValue: _types.ViewSortDirection.ASC
    }),
    _ts_metadata("design:type", typeof _types.ViewSortDirection === "undefined" ? Object : _types.ViewSortDirection)
], UpsertViewWidgetViewSortInput.prototype, "direction", void 0);
UpsertViewWidgetViewSortInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpsertViewWidgetViewSortInput);

//# sourceMappingURL=upsert-view-widget-view-sort.input.js.map