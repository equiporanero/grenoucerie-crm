"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NativeToolBinderService", {
    enumerable: true,
    get: function() {
        return NativeToolBinderService;
    }
});
const _common = require("@nestjs/common");
const _aimodelconfigservice = require("../../../metadata-modules/ai/ai-models/services/ai-model-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NativeToolBinderService = class NativeToolBinderService {
    bind(model, options = {}) {
        return this.aiModelConfigService.getNativeModelTools(model, options);
    }
    constructor(aiModelConfigService){
        this.aiModelConfigService = aiModelConfigService;
    }
};
NativeToolBinderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _aimodelconfigservice.AiModelConfigService === "undefined" ? Object : _aimodelconfigservice.AiModelConfigService
    ])
], NativeToolBinderService);

//# sourceMappingURL=native-tool-binder.service.js.map