"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePageLayoutWithTabsInput", {
    enumerable: true,
    get: function() {
        return UpdatePageLayoutWithTabsInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _updatepagelayouttabwithwidgetsinput = require("../../../page-layout-tab/dtos/inputs/update-page-layout-tab-with-widgets.input");
const _pagelayouttypeenum = require("../../enums/page-layout-type.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdatePageLayoutWithTabsInput = class UpdatePageLayoutWithTabsInput {
};
_ts_decorate([
    (0, _graphql.Field)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], UpdatePageLayoutWithTabsInput.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_pagelayouttypeenum.PageLayoutType),
    (0, _classvalidator.IsEnum)(_pagelayouttypeenum.PageLayoutType),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _pagelayouttypeenum.PageLayoutType === "undefined" ? Object : _pagelayouttypeenum.PageLayoutType)
], UpdatePageLayoutWithTabsInput.prototype, "type", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Object)
], UpdatePageLayoutWithTabsInput.prototype, "objectMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _updatepagelayouttabwithwidgetsinput.UpdatePageLayoutTabWithWidgetsInput
        ]),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.ArrayMinSize)(1),
    (0, _classvalidator.ValidateNested)({
        each: true
    }),
    (0, _classtransformer.Type)(()=>_updatepagelayouttabwithwidgetsinput.UpdatePageLayoutTabWithWidgetsInput),
    _ts_metadata("design:type", Array)
], UpdatePageLayoutWithTabsInput.prototype, "tabs", void 0);
UpdatePageLayoutWithTabsInput = _ts_decorate([
    (0, _graphql.InputType)()
], UpdatePageLayoutWithTabsInput);

//# sourceMappingURL=update-page-layout-with-tabs.input.js.map