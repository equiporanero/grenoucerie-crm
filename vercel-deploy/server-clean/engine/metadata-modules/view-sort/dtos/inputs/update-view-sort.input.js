"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateViewSortInput", {
    enumerable: true,
    get: function() {
        return UpdateViewSortInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _classtransformer = require("class-transformer");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
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
let UpdateViewSortInputUpdates = class UpdateViewSortInputUpdates {
};
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsEnum)(_types.ViewSortDirection),
    (0, _graphql.Field)(()=>_types.ViewSortDirection, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof _types.ViewSortDirection === "undefined" ? Object : _types.ViewSortDirection)
], UpdateViewSortInputUpdates.prototype, "direction", void 0);
_ts_decorate([
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], UpdateViewSortInputUpdates.prototype, "subFieldName", void 0);
UpdateViewSortInputUpdates = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewSortInputUpdates);
let UpdateViewSortInput = class UpdateViewSortInput {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        description: 'The id of the view sort to update'
    }),
    _ts_metadata("design:type", String)
], UpdateViewSortInput.prototype, "id", void 0);
_ts_decorate([
    (0, _classtransformer.Type)(()=>UpdateViewSortInputUpdates),
    (0, _classvalidator.ValidateNested)(),
    (0, _graphql.Field)(()=>UpdateViewSortInputUpdates, {
        description: 'The view sort to update'
    }),
    _ts_metadata("design:type", typeof UpdateViewSortInputUpdates === "undefined" ? Object : UpdateViewSortInputUpdates)
], UpdateViewSortInput.prototype, "update", void 0);
UpdateViewSortInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdateViewSortInput);

//# sourceMappingURL=update-view-sort.input.js.map