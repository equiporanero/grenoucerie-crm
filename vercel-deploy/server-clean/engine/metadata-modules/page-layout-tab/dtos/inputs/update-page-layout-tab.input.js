"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePageLayoutTabInput", {
    enumerable: true,
    get: function() {
        return UpdatePageLayoutTabInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
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
let UpdatePageLayoutTabInput = class UpdatePageLayoutTabInput {
};
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdatePageLayoutTabInput.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], UpdatePageLayoutTabInput.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], UpdatePageLayoutTabInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.PageLayoutTabLayoutMode, {
        nullable: true
    }),
    (0, _classvalidator.IsEnum)(_types.PageLayoutTabLayoutMode),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _types.PageLayoutTabLayoutMode === "undefined" ? Object : _types.PageLayoutTabLayoutMode)
], UpdatePageLayoutTabInput.prototype, "layoutMode", void 0);
UpdatePageLayoutTabInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdatePageLayoutTabInput);

//# sourceMappingURL=update-page-layout-tab.input.js.map