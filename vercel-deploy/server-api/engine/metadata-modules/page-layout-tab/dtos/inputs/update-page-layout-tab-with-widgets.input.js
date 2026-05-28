"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePageLayoutTabWithWidgetsInput", {
    enumerable: true,
    get: function() {
        return UpdatePageLayoutTabWithWidgetsInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _updatepagelayoutwidgetwithidinput = require("../../../page-layout-widget/dtos/inputs/update-page-layout-widget-with-id.input");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdatePageLayoutTabWithWidgetsInput = class UpdatePageLayoutTabWithWidgetsInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], UpdatePageLayoutTabWithWidgetsInput.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], UpdatePageLayoutTabWithWidgetsInput.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], UpdatePageLayoutTabWithWidgetsInput.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], UpdatePageLayoutTabWithWidgetsInput.prototype, "icon", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.PageLayoutTabLayoutMode, {
        nullable: true,
        defaultValue: _types.PageLayoutTabLayoutMode.GRID
    }),
    (0, _classvalidator.IsEnum)(_types.PageLayoutTabLayoutMode),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _types.PageLayoutTabLayoutMode === "undefined" ? Object : _types.PageLayoutTabLayoutMode)
], UpdatePageLayoutTabWithWidgetsInput.prototype, "layoutMode", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _updatepagelayoutwidgetwithidinput.UpdatePageLayoutWidgetWithIdInput
        ]),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_updatepagelayoutwidgetwithidinput.UpdatePageLayoutWidgetWithIdInput),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Array)
], UpdatePageLayoutTabWithWidgetsInput.prototype, "widgets", void 0);
UpdatePageLayoutTabWithWidgetsInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdatePageLayoutTabWithWidgetsInput);

//# sourceMappingURL=update-page-layout-tab-with-widgets.input.js.map