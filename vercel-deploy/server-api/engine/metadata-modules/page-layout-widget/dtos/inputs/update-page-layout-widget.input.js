"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePageLayoutWidgetInput", {
    enumerable: true,
    get: function() {
        return UpdatePageLayoutWidgetInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _types = require("twenty-shared/types");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _gridpositioninput = require("./grid-position.input");
const _widgettypeenum = require("../../enums/widget-type.enum");
const _allpagelayoutwidgetconfigurationtype = require("../../types/all-page-layout-widget-configuration.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdatePageLayoutWidgetInput = class UpdatePageLayoutWidgetInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdatePageLayoutWidgetInput.prototype, "pageLayoutTabId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdatePageLayoutWidgetInput.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_widgettypeenum.WidgetType, {
        nullable: true
    }),
    (0, _classvalidator.IsEnum)(_widgettypeenum.WidgetType),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _widgettypeenum.WidgetType === "undefined" ? Object : _widgettypeenum.WidgetType)
], UpdatePageLayoutWidgetInput.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], UpdatePageLayoutWidgetInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_gridpositioninput.GridPositionInput, {
        nullable: true,
        deprecationReason: 'Use `position` instead. Will be removed in a future release.'
    }),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>_gridpositioninput.GridPositionInput),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _gridpositioninput.GridPositionInput === "undefined" ? Object : _gridpositioninput.GridPositionInput)
], UpdatePageLayoutWidgetInput.prototype, "gridPosition", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _types.PageLayoutWidgetPosition === "undefined" ? Object : _types.PageLayoutWidgetPosition)
], UpdatePageLayoutWidgetInput.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _allpagelayoutwidgetconfigurationtype.AllPageLayoutWidgetConfiguration === "undefined" ? Object : _allpagelayoutwidgetconfigurationtype.AllPageLayoutWidgetConfiguration)
], UpdatePageLayoutWidgetInput.prototype, "configuration", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], UpdatePageLayoutWidgetInput.prototype, "conditionalDisplay", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], UpdatePageLayoutWidgetInput.prototype, "conditionalAvailabilityExpression", void 0);
UpdatePageLayoutWidgetInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdatePageLayoutWidgetInput);

//# sourceMappingURL=update-page-layout-widget.input.js.map