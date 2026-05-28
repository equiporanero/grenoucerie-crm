"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiModelsModule", {
    enumerable: true,
    get: function() {
        return AiModelsModule;
    }
});
const _common = require("@nestjs/common");
const _aimodelconfigservice = require("./services/ai-model-config.service");
const _aimodelpreferencesservice = require("./services/ai-model-preferences.service");
const _aimodelregistryservice = require("./services/ai-model-registry.service");
const _defaultaicatalogservice = require("./services/default-ai-catalog.service");
const _modelsdevcatalogservice = require("./services/models-dev-catalog.service");
const _providerconfigservice = require("./services/provider-config.service");
const _sdkproviderfactoryservice = require("./services/sdk-provider-factory.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiModelsModule = class AiModelsModule {
};
AiModelsModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        providers: [
            _defaultaicatalogservice.DefaultAiCatalogService,
            _providerconfigservice.ProviderConfigService,
            _sdkproviderfactoryservice.SdkProviderFactoryService,
            _modelsdevcatalogservice.ModelsDevCatalogService,
            _aimodelpreferencesservice.AiModelPreferencesService,
            _aimodelregistryservice.AiModelRegistryService,
            _aimodelconfigservice.AiModelConfigService
        ],
        exports: [
            _defaultaicatalogservice.DefaultAiCatalogService,
            _aimodelregistryservice.AiModelRegistryService,
            _aimodelpreferencesservice.AiModelPreferencesService,
            _aimodelconfigservice.AiModelConfigService,
            _sdkproviderfactoryservice.SdkProviderFactoryService,
            _modelsdevcatalogservice.ModelsDevCatalogService
        ]
    })
], AiModelsModule);

//# sourceMappingURL=ai-models.module.js.map