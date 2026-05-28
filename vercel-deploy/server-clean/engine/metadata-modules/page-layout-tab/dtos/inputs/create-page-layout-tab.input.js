"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePageLayoutTabInput", {
    enumerable: true,
    get: function() {
        return CreatePageLayoutTabInput;
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
let CreatePageLayoutTabInput = class CreatePageLayoutTabInput {
};
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreatePageLayoutTabInput.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], CreatePageLayoutTabInput.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreatePageLayoutTabInput.prototype, "pageLayoutId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.PageLayoutTabLayoutMode, {
        nullable: true,
        defaultValue: _types.PageLayoutTabLayoutMode.GRID
    }),
    (0, _classvalidator.IsEnum)(_types.PageLayoutTabLayoutMode),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _types.PageLayoutTabLayoutMode === "undefined" ? Object : _types.PageLayoutTabLayoutMode)
], CreatePageLayoutTabInput.prototype, "layoutMode", void 0);
CreatePageLayoutTabInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreatePageLayoutTabInput);

//# sourceMappingURL=create-page-layout-tab.input.js.map