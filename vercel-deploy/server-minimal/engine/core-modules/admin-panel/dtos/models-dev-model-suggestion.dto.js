"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModelsDevModelSuggestionDTO", {
    enumerable: true,
    get: function() {
        return ModelsDevModelSuggestionDTO;
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
let ModelsDevModelSuggestionDTO = class ModelsDevModelSuggestionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ModelsDevModelSuggestionDTO.prototype, "modelId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], ModelsDevModelSuggestionDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], ModelsDevModelSuggestionDTO.prototype, "inputCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], ModelsDevModelSuggestionDTO.prototype, "outputCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ModelsDevModelSuggestionDTO.prototype, "cachedInputCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], ModelsDevModelSuggestionDTO.prototype, "cacheCreationCostPerMillionTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], ModelsDevModelSuggestionDTO.prototype, "contextWindowTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], ModelsDevModelSuggestionDTO.prototype, "maxOutputTokens", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ]),
    _ts_metadata("design:type", Array)
], ModelsDevModelSuggestionDTO.prototype, "modalities", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], ModelsDevModelSuggestionDTO.prototype, "supportsReasoning", void 0);
ModelsDevModelSuggestionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ModelsDevModelSuggestion')
], ModelsDevModelSuggestionDTO);

//# sourceMappingURL=models-dev-model-suggestion.dto.js.map