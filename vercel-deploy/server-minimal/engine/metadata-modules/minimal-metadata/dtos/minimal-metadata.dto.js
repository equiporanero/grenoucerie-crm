"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MinimalMetadataDTO", {
    enumerable: true,
    get: function() {
        return MinimalMetadataDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _collectionhashdto = require("./collection-hash.dto");
const _minimalobjectmetadatadto = require("./minimal-object-metadata.dto");
const _minimalviewdto = require("./minimal-view.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MinimalMetadataDTO = class MinimalMetadataDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _minimalobjectmetadatadto.MinimalObjectMetadataDTO
        ]),
    _ts_metadata("design:type", Array)
], MinimalMetadataDTO.prototype, "objectMetadataItems", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _minimalviewdto.MinimalViewDTO
        ]),
    _ts_metadata("design:type", Array)
], MinimalMetadataDTO.prototype, "views", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _collectionhashdto.CollectionHashDTO
        ]),
    _ts_metadata("design:type", Array)
], MinimalMetadataDTO.prototype, "collectionHashes", void 0);
MinimalMetadataDTO = _ts_decorate([
    (0, _graphql.ObjectType)('MinimalMetadata')
], MinimalMetadataDTO);

//# sourceMappingURL=minimal-metadata.dto.js.map