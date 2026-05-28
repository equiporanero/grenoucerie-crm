"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CollectionHashDTO", {
    enumerable: true,
    get: function() {
        return CollectionHashDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _metadata = require("twenty-shared/metadata");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CollectionHashDTO = class CollectionHashDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_metadata.ALL_METADATA_NAME),
    _ts_metadata("design:type", typeof AllMetadataName === "undefined" ? Object : AllMetadataName)
], CollectionHashDTO.prototype, "collectionName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], CollectionHashDTO.prototype, "hash", void 0);
CollectionHashDTO = _ts_decorate([
    (0, _graphql.ObjectType)('CollectionHash')
], CollectionHashDTO);

//# sourceMappingURL=collection-hash.dto.js.map