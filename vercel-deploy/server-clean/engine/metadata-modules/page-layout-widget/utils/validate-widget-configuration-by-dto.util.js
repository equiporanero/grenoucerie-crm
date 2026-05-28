"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateWidgetConfigurationByDto", {
    enumerable: true,
    get: function() {
        return validateWidgetConfigurationByDto;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const validateWidgetConfigurationByDto = (DtoClass, configuration)=>{
    const instance = (0, _classtransformer.plainToInstance)(DtoClass, configuration);
    return (0, _classvalidator.validateSync)(instance, {
        whitelist: true,
        forbidUnknownValues: true
    });
};

//# sourceMappingURL=validate-widget-configuration-by-dto.util.js.map