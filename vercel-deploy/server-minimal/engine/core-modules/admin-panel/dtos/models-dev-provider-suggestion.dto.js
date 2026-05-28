"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModelsDevProviderSuggestionDTO", {
    enumerable: true,
    get: function() {
        return ModelsDevProviderSuggestionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ModelsDevProviderSuggestionDTO = class ModelsDevProviderSuggestionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ModelsDevProviderSuggestionDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], ModelsDevProviderSuggestionDTO.prototype, "modelCount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ModelsDevProviderSuggestionDTO.prototype, "npm", void 0);
ModelsDevProviderSuggestionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ModelsDevProviderSuggestion')
], ModelsDevProviderSuggestionDTO);

//# sourceMappingURL=models-dev-provider-suggestion.dto.js.map