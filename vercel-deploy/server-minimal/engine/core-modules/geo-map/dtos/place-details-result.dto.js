"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get LocationDTO () {
        return LocationDTO;
    },
    get PlaceDetailsResultDTO () {
        return PlaceDetailsResultDTO;
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
let LocationDTO = class LocationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], LocationDTO.prototype, "lat", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], LocationDTO.prototype, "lng", void 0);
LocationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('Location')
], LocationDTO);
let PlaceDetailsResultDTO = class PlaceDetailsResultDTO {
};
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PlaceDetailsResultDTO.prototype, "street", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PlaceDetailsResultDTO.prototype, "state", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PlaceDetailsResultDTO.prototype, "postcode", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PlaceDetailsResultDTO.prototype, "city", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], PlaceDetailsResultDTO.prototype, "country", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>LocationDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof LocationDTO === "undefined" ? Object : LocationDTO)
], PlaceDetailsResultDTO.prototype, "location", void 0);
PlaceDetailsResultDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PlaceDetailsResult')
], PlaceDetailsResultDTO);

//# sourceMappingURL=place-details-result.dto.js.map