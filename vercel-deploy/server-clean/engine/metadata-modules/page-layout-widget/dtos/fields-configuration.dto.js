"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldsConfigurationDTO", {
    enumerable: true,
    get: function() {
        return FieldsConfigurationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
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
let FieldsConfigurationDTO = class FieldsConfigurationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_widgetconfigurationtypetype.WidgetConfigurationType),
    (0, _classvalidator.IsIn)([
        _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _widgetconfigurationtypetype.WidgetConfigurationType === "undefined" || typeof _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS === "undefined" ? Object : _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS)
], FieldsConfigurationDTO.prototype, "configurationType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", Object)
], FieldsConfigurationDTO.prototype, "viewId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Object)
], FieldsConfigurationDTO.prototype, "newFieldDefaultVisibility", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsBoolean)(),
    _ts_metadata("design:type", Boolean)
], FieldsConfigurationDTO.prototype, "shouldAllowUserToSeeHiddenFields", void 0);
FieldsConfigurationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('FieldsConfiguration')
], FieldsConfigurationDTO);

//# sourceMappingURL=fields-configuration.dto.js.map