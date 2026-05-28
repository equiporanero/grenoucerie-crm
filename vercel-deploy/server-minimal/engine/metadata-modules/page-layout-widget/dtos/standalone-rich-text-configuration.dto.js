"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StandaloneRichTextConfigurationDTO", {
    enumerable: true,
    get: function() {
        return StandaloneRichTextConfigurationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _richtextbodydto = require("./rich-text-body.dto");
const _widgetconfigurationtypetype = require("../enums/widget-configuration-type.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let StandaloneRichTextConfigurationDTO = class StandaloneRichTextConfigurationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_widgetconfigurationtypetype.WidgetConfigurationType),
    (0, _classvalidator.IsIn)([
        _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _widgetconfigurationtypetype.WidgetConfigurationType === "undefined" || typeof _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT === "undefined" ? Object : _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT)
], StandaloneRichTextConfigurationDTO.prototype, "configurationType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_richtextbodydto.RichTextBodyDTO),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>_richtextbodydto.RichTextBodyDTO),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _richtextbodydto.RichTextBodyDTO === "undefined" ? Object : _richtextbodydto.RichTextBodyDTO)
], StandaloneRichTextConfigurationDTO.prototype, "body", void 0);
StandaloneRichTextConfigurationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('StandaloneRichTextConfiguration')
], StandaloneRichTextConfigurationDTO);

//# sourceMappingURL=standalone-rich-text-configuration.dto.js.map