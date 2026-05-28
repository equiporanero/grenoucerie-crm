"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePageLayoutWidgetInput", {
    enumerable: true,
    get: function() {
        return CreatePageLayoutWidgetInput;
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
let CreatePageLayoutWidgetInput = class CreatePageLayoutWidgetInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreatePageLayoutWidgetInput.prototype, "pageLayoutTabId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreatePageLayoutWidgetInput.prototype, "title", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_widgettypeenum.WidgetType, {
        nullable: false
    }),
    (0, _classvalidator.IsEnum)(_widgettypeenum.WidgetType),
    _ts_metadata("design:type", typeof _widgettypeenum.WidgetType === "undefined" ? Object : _widgettypeenum.WidgetType)
], CreatePageLayoutWidgetInput.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], CreatePageLayoutWidgetInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_gridpositioninput.GridPositionInput, {
        nullable: false,
        deprecationReason: 'Use `position` instead. Will be removed in a future release.'
    }),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>_gridpositioninput.GridPositionInput),
    _ts_metadata("design:type", typeof _gridpositioninput.GridPositionInput === "undefined" ? Object : _gridpositioninput.GridPositionInput)
], CreatePageLayoutWidgetInput.prototype, "gridPosition", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _types.PageLayoutWidgetPosition === "undefined" ? Object : _types.PageLayoutWidgetPosition)
], CreatePageLayoutWidgetInput.prototype, "position", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: false
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _allpagelayoutwidgetconfigurationtype.AllPageLayoutWidgetConfiguration === "undefined" ? Object : _allpagelayoutwidgetconfigurationtype.AllPageLayoutWidgetConfiguration)
], CreatePageLayoutWidgetInput.prototype, "configuration", void 0);
CreatePageLayoutWidgetInput = _ts_decorate([
    (0, _graphql.InputType)()
], CreatePageLayoutWidgetInput);

//# sourceMappingURL=create-page-layout-widget.input.js.map